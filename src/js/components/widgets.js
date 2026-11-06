import { appIcons } from "../app/app-icons.js";

/** Show/hide password: any [data-pw-toggle] button inside a .pw wrapper toggles the sibling input. Delegated, so it works for rendered views. */
export function initPasswordToggles() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-pw-toggle]");
    if (!btn) return;
    const input = btn.closest(".pw").querySelector("input");
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    btn.setAttribute("aria-pressed", String(show));
    btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
    btn.innerHTML = show ? appIcons.eyeOff : appIcons.eye;
  });
}

export const pwButton = `<button type="button" class="pw-btn" data-pw-toggle aria-pressed="false" aria-label="Show password">${appIcons.eye}</button>`;

/** Polite live-region toast. */
export function toast(message, tone = "success") {
  let region = document.getElementById("toast-region");
  if (!region) {
    region = document.createElement("div");
    region.id = "toast-region";
    region.className = "toast-region";
    region.setAttribute("role", "status");
    region.setAttribute("aria-live", "polite");
    document.body.append(region);
  }
  const t = document.createElement("div");
  t.className = "toast";
  t.dataset.tone = tone;
  t.textContent = message;
  region.append(t);
  setTimeout(() => t.remove(), 4200);
}

/**
 * Click-to-toggle popovers ([data-popover-btn] with aria-controls). One open at a time;
 * outside click and Escape close them (Escape returns focus to the button).
 */
export function initPopovers() {
  const btns = () => [...document.querySelectorAll("[data-popover-btn]")];
  const panel = (b) => document.getElementById(b.getAttribute("aria-controls"));
  const close = (b, refocus = false) => { b.setAttribute("aria-expanded", "false"); panel(b).hidden = true; if (refocus) b.focus(); };
  btns().forEach((b) => {
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = b.getAttribute("aria-expanded") === "true";
      btns().forEach((o) => close(o));
      if (!open) { b.setAttribute("aria-expanded", "true"); panel(b).hidden = false; }
    });
  });
  document.addEventListener("click", (e) => btns().forEach((b) => { if (b.getAttribute("aria-expanded") === "true" && !panel(b).contains(e.target)) close(b); }));
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    btns().forEach((b) => { if (b.getAttribute("aria-expanded") === "true") close(b, true); });
  });
}
