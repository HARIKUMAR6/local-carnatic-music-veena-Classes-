import { site } from "../config/site.js";
import { storage } from "./storage.js";

const root = document.documentElement;
const KEY = site.storage.dir;

export const getDir = () => (root.getAttribute("dir") === "rtl" ? "rtl" : "ltr");

/* Direction is applied on <html dir>. All layout uses logical utilities
   (ms-/me-/ps-/pe-/start/end/text-start, rtl: variants), so the whole layout
   mirrors; text content is never translated. */
export function setDir(dir, persist = true) {
  root.setAttribute("dir", dir);
  if (persist) storage.set(KEY, dir);
  document.querySelectorAll("[data-dir-toggle]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(dir === "rtl"));
    btn.textContent = dir.toUpperCase(); // the visible label is only the active direction
    btn.setAttribute("aria-label", dir === "rtl" ? "RTL: switch to LTR layout" : "LTR: switch to RTL layout");
  });
}

export function initDirection() {
  setDir(getDir(), false);
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-dir-toggle]")) setDir(getDir() === "rtl" ? "ltr" : "rtl");
  });
}
