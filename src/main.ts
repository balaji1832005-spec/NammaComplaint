import { applyTranslations, initI18n, onLangChange, t } from "./i18n";
import { forwardAuthCallback } from "./util";
import { CATEGORIES } from "../netlify/lib/constants";

forwardAuthCallback();

const form = document.querySelector<HTMLFormElement>("#complaint-form")!;
const select = document.querySelector<HTMLSelectElement>("#category-select")!;
const errorEl = document.querySelector<HTMLParagraphElement>("#form-error")!;
const submitBtn = document.querySelector<HTMLButtonElement>("#submit-btn")!;
const success = document.querySelector<HTMLDivElement>("#success")!;
const ticketEl = document.querySelector<HTMLParagraphElement>("#ticket-id")!;
const copyBtn = document.querySelector<HTMLButtonElement>("#copy-btn")!;
const trackLink = document.querySelector<HTMLAnchorElement>("#track-link")!;

function renderCategories() {
  const current = select.value;
  select.innerHTML = "";
  const placeholder = new Option(t("cat.choose"), "");
  placeholder.disabled = true;
  select.add(placeholder);
  for (const c of CATEGORIES) select.add(new Option(t(`cat.${c}`), c));
  select.value = current;
}

function showError(key: string) {
  errorEl.textContent = t(key);
  errorEl.hidden = false;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorEl.hidden = true;
  const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
  if (!data.name?.trim() || !data.phone?.trim() || !data.category || !data.area?.trim() || (data.description?.trim().length ?? 0) < 10) {
    return showError("error.missing_fields");
  }

  submitBtn.disabled = true;
  submitBtn.textContent = t("form.submitting");
  try {
    const res = await fetch("/api/complaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return showError(`error.${body.error ?? "generic"}`);

    ticketEl.textContent = body.trackingId;
    trackLink.href = `/track?id=${encodeURIComponent(body.trackingId)}`;
    form.hidden = true;
    success.hidden = false;
    form.reset();
  } catch {
    showError("error.generic");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = t("form.submit");
  }
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(ticketEl.textContent ?? "");
    copyBtn.textContent = t("success.copied");
    setTimeout(() => (copyBtn.textContent = t("success.copy")), 1800);
  } catch {
    /* clipboard unavailable; the ID is still visible */
  }
});

document.querySelector("#another-btn")!.addEventListener("click", () => {
  success.hidden = true;
  form.hidden = false;
  renderCategories();
});

initI18n();
renderCategories();
onLangChange(() => {
  renderCategories();
  applyTranslations();
});
