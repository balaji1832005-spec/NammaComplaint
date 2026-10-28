import { formatDate, initI18n, onLangChange, t } from "./i18n";
import { escapeHtml, forwardAuthCallback } from "./util";

forwardAuthCallback();

type Complaint = {
  trackingId: string;
  category: string;
  area: string;
  description: string;
  status: string;
  adminNote: string;
  createdAt: string;
  updatedAt: string;
};

const form = document.querySelector<HTMLFormElement>("#track-form")!;
const input = document.querySelector<HTMLInputElement>("#track-input")!;
const errorEl = document.querySelector<HTMLParagraphElement>("#track-error")!;
const resultEl = document.querySelector<HTMLElement>("#track-result")!;
let current: Complaint | null = null;

function render() {
  if (!current) return;
  const c = current;
  const rejected = c.status === "rejected";
  const stages = rejected ? ["submitted", "in_progress", "rejected"] : ["submitted", "in_progress", "resolved"];
  const reached = c.status === "submitted" ? 1 : c.status === "in_progress" ? 2 : 3;
  // A rejection can happen straight from "submitted", so only mark the final stage.
  const done = (i: number) => (rejected ? i === 0 || i === 2 : i < reached);

  resultEl.innerHTML = `
    <div class="result-head">
      <h2>${escapeHtml(c.trackingId)}</h2>
      <span class="pill ${escapeHtml(c.status)}">${escapeHtml(t(`status.${c.status}`))}</span>
    </div>
    <ol class="progress ${rejected ? "rejected" : ""}">
      ${stages.map((s, i) => `<li class="${done(i) ? "done" : ""}">${escapeHtml(t(`status.${s}`))}</li>`).join("")}
    </ol>
    <dl class="meta">
      <div><dt>${t("form.category")}</dt><dd>${escapeHtml(t(`cat.${c.category}`))}</dd></div>
      <div><dt>${t("form.area")}</dt><dd>${escapeHtml(c.area)}</dd></div>
      <div><dt>${t("track.filed")}</dt><dd>${formatDate(c.createdAt)}</dd></div>
      <div><dt>${t("track.updated")}</dt><dd>${formatDate(c.updatedAt)}</dd></div>
    </dl>
    <p class="desc">${escapeHtml(c.description)}</p>
    ${c.adminNote ? `<div class="note"><strong>${t("track.note")}</strong><p>${escapeHtml(c.adminNote)}</p></div>` : ""}
  `;
  resultEl.hidden = false;
}

async function lookup(id: string) {
  errorEl.hidden = true;
  resultEl.hidden = true;
  current = null;
  try {
    const res = await fetch(`/api/complaints?id=${encodeURIComponent(id)}`);
    if (res.status === 404) {
      errorEl.textContent = t("track.notFound");
      errorEl.hidden = false;
      return;
    }
    if (!res.ok) throw new Error();
    current = await res.json();
    render();
    history.replaceState(null, "", `/track?id=${encodeURIComponent(current!.trackingId)}`);
  } catch {
    errorEl.textContent = t("error.generic");
    errorEl.hidden = false;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = input.value.trim().toUpperCase();
  if (id) lookup(id);
});

initI18n();
onLangChange(render);

const initial = new URLSearchParams(location.search).get("id");
if (initial) {
  input.value = initial.toUpperCase();
  lookup(initial.toUpperCase());
}
