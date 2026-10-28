import {
  AuthError,
  MissingIdentityError,
  acceptInvite,
  getUser,
  handleAuthCallback,
  login,
  logout,
  requestPasswordRecovery,
  updateUser,
  type User,
} from "@netlify/identity";
import { formatDate, initI18n, onLangChange, t } from "./i18n";
import { escapeHtml } from "./util";
import { CATEGORIES, STATUSES } from "../netlify/lib/constants";

type Complaint = {
  id: number;
  trackingId: string;
  name: string;
  phone: string;
  category: string;
  area: string;
  description: string;
  status: string;
  adminNote: string;
  createdAt: string;
  updatedAt: string;
};

const $ = <T extends HTMLElement>(sel: string) => document.querySelector<T>(sel)!;
const loginView = $("#login-view");
const passwordView = $("#password-view");
const dashView = $("#dash-view");
const loginForm = $<HTMLFormElement>("#login-form");
const loginError = $("#login-error");
const passwordForm = $<HTMLFormElement>("#password-form");
const passwordError = $("#password-error");
const statusFilter = $<HTMLSelectElement>("#filter-status");
const categoryFilter = $<HTMLSelectElement>("#filter-category");
const listEl = $("#list");
const statsEl = $("#stats");
const dashError = $("#dash-error");

let complaints: Complaint[] = [];
let inviteToken: string | null = null;

function show(view: HTMLElement) {
  for (const v of [loginView, passwordView, dashView]) v.hidden = v !== view;
}

function showMessage(el: HTMLElement, text: string) {
  el.textContent = text;
  el.hidden = false;
}

function isAdmin(user: User | null) {
  return !!user?.roles?.includes("admin");
}

async function enterDashboard(user: User) {
  if (!isAdmin(user)) {
    show(loginView);
    showMessage(loginError, t("admin.notAdmin"));
    return;
  }
  $("#who").textContent = user.email ?? "";
  show(dashView);
  await load();
}

function renderFilters() {
  const s = statusFilter.value;
  const c = categoryFilter.value;
  statusFilter.innerHTML = "";
  statusFilter.add(new Option(t("admin.allStatus"), ""));
  for (const st of STATUSES) statusFilter.add(new Option(t(`status.${st}`), st));
  categoryFilter.innerHTML = "";
  categoryFilter.add(new Option(t("admin.allCategories"), ""));
  for (const cat of CATEGORIES) categoryFilter.add(new Option(t(`cat.${cat}`), cat));
  statusFilter.value = s;
  categoryFilter.value = c;
}

function renderStats() {
  const counts: Record<string, number> = {};
  for (const c of complaints) counts[c.status] = (counts[c.status] ?? 0) + 1;
  statsEl.innerHTML =
    `<div class="stat total"><b>${complaints.length}</b><span>${t("admin.total")}</span></div>` +
    STATUSES.map((s) => `<div class="stat ${s}"><b>${counts[s] ?? 0}</b><span>${t(`status.${s}`)}</span></div>`).join("");
}

function renderList() {
  renderStats();
  if (!complaints.length) {
    listEl.innerHTML = `<p class="empty">${t("admin.empty")}</p>`;
    return;
  }
  listEl.innerHTML = complaints
    .map(
      (c) => `
    <article class="item" data-id="${c.id}">
      <div class="item-main">
        <div class="item-top">
          <code>${escapeHtml(c.trackingId)}</code>
          <span class="pill ${escapeHtml(c.status)}">${escapeHtml(t(`status.${c.status}`))}</span>
          <span class="cat">${escapeHtml(t(`cat.${c.category}`))}</span>
          <span class="muted">${formatDate(c.createdAt)}</span>
        </div>
        <div class="area">${escapeHtml(c.area)}</div>
        <p class="desc">${escapeHtml(c.description)}</p>
        <div class="contact">${t("admin.contact")}: ${escapeHtml(c.name)} · <a href="tel:${escapeHtml(c.phone)}">${escapeHtml(c.phone)}</a></div>
      </div>
      <form class="item-side">
        <select name="status">
          ${STATUSES.map((s) => `<option value="${s}" ${s === c.status ? "selected" : ""}>${t(`status.${s}`)}</option>`).join("")}
        </select>
        <textarea name="adminNote" maxlength="1000" placeholder="${escapeHtml(t("admin.notePlaceholder"))}">${escapeHtml(c.adminNote)}</textarea>
        <div class="save-row">
          <button class="btn primary small" type="submit">${t("admin.save")}</button>
          <span class="saved" hidden>${t("admin.saved")}</span>
        </div>
      </form>
    </article>`,
    )
    .join("");
}

async function api(path: string, init?: RequestInit) {
  const res = await fetch(path, { credentials: "same-origin", ...init });
  if (res.status === 401) {
    show(loginView);
    throw new Error("unauthorized");
  }
  if (res.status === 403) {
    show(loginView);
    showMessage(loginError, t("admin.notAdmin"));
    throw new Error("forbidden");
  }
  if (!res.ok) throw new Error("request_failed");
  return res.json();
}

async function load() {
  dashError.hidden = true;
  const params = new URLSearchParams();
  if (statusFilter.value) params.set("status", statusFilter.value);
  if (categoryFilter.value) params.set("category", categoryFilter.value);
  try {
    complaints = await api(`/api/admin/complaints?${params}`);
    renderList();
  } catch (err) {
    if ((err as Error).message === "request_failed") showMessage(dashError, t("error.generic"));
  }
}

listEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formEl = e.target as HTMLFormElement;
  const id = Number(formEl.closest<HTMLElement>(".item")!.dataset.id);
  const data = Object.fromEntries(new FormData(formEl));
  const button = formEl.querySelector("button")!;
  button.disabled = true;
  try {
    const updated: Complaint = await api(`/api/admin/complaints/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    complaints = complaints.map((c) => (c.id === id ? updated : c));
    renderList();
    const saved = listEl.querySelector<HTMLElement>(`.item[data-id="${id}"] .saved`);
    if (saved) {
      saved.hidden = false;
      setTimeout(() => (saved.hidden = true), 2000);
    }
  } catch (err) {
    if ((err as Error).message === "request_failed") showMessage(dashError, t("error.generic"));
    button.disabled = false;
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginError.hidden = true;
  const { email, password } = Object.fromEntries(new FormData(loginForm)) as Record<string, string>;
  try {
    const user = await login(email, password);
    loginForm.reset();
    await enterDashboard(user);
  } catch (err) {
    if (err instanceof MissingIdentityError) showMessage(loginError, t("admin.noIdentity"));
    else if (err instanceof AuthError && (err.status === 400 || err.status === 401)) showMessage(loginError, t("admin.badLogin"));
    else showMessage(loginError, err instanceof Error ? err.message : t("error.generic"));
  }
});

$("#forgot-btn").addEventListener("click", async () => {
  const email = (loginForm.elements.namedItem("email") as HTMLInputElement).value.trim();
  $("#forgot-msg").hidden = false;
  if (!email) return;
  try {
    await requestPasswordRecovery(email);
  } catch {
    /* don't reveal whether the account exists */
  }
});

passwordForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  passwordError.hidden = true;
  const password = (passwordForm.elements.namedItem("password") as HTMLInputElement).value;
  try {
    const user = inviteToken ? await acceptInvite(inviteToken, password) : await updateUser({ password });
    inviteToken = null;
    passwordForm.reset();
    await enterDashboard(user);
  } catch (err) {
    showMessage(passwordError, err instanceof Error ? err.message : t("error.generic"));
  }
});

$("#logout-btn").addEventListener("click", async () => {
  try {
    await logout();
  } finally {
    complaints = [];
    show(loginView);
  }
});

$("#refresh-btn").addEventListener("click", load);
statusFilter.addEventListener("change", load);
categoryFilter.addEventListener("change", load);

async function init() {
  initI18n();
  renderFilters();
  onLangChange(() => {
    renderFilters();
    if (!dashView.hidden) renderList();
  });

  try {
    const result = await handleAuthCallback();
    if (result?.type === "invite") {
      inviteToken = result.token ?? null;
      show(passwordView);
      return;
    }
    if (result?.type === "recovery") {
      show(passwordView);
      return;
    }
  } catch (err) {
    show(loginView);
    showMessage(loginError, err instanceof Error ? err.message : t("error.generic"));
    return;
  }

  const user = await getUser();
  if (user) await enterDashboard(user);
  else show(loginView);
}

init();
