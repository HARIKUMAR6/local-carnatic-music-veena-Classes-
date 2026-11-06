import { site } from "../config/site.js";
import { storage } from "./storage.js";

const root = document.documentElement;
const KEY = site.storage.theme;

export const getTheme = () => (root.getAttribute("data-theme") === "dark" ? "dark" : "light");

export function setTheme(theme, persist = true) {
  root.setAttribute("data-theme", theme);
  if (persist) storage.set(KEY, theme);
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(theme === "dark"));
    btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  });
}

export function initTheme() {
  setTheme(getTheme(), false); // preinit.js already resolved the initial theme
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-theme-toggle]")) setTheme(getTheme() === "dark" ? "light" : "dark");
  });
  // Follow OS changes only while the user has no saved preference.
  matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", (e) => {
    if (!storage.get(KEY)) setTheme(e.matches ? "dark" : "light", false);
  });
}
