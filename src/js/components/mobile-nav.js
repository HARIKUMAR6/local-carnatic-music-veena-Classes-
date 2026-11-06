import { closeDropdownsIn } from "./nav-dropdown.js";

/**
 * Full-screen navigation for viewports below 1024px. The panel (#mobile-nav) is fixed to the whole viewport, scrolls
 * internally, locks page scroll while open, closes on Escape / link choice / the close button, and returns focus to the opener.
 */
export function initMobileNav() {
  const btn = document.querySelector("[data-menu-toggle]");
  const panel = document.getElementById("mobile-nav");
  if (!btn || !panel) return;
  const root = document.documentElement;
  const closeBtn = panel.querySelector("[data-menu-close]");
  const set = (open, refocus = true) => {
    panel.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    root.classList.toggle("menu-open", open);
    if (!open) closeDropdownsIn(panel);
    if (open) closeBtn.focus();
    else if (refocus) btn.focus();
  };
  btn.addEventListener("click", () => set(panel.hidden));
  closeBtn.addEventListener("click", () => set(false));
  // Choosing any destination closes the menu (the Home trigger is a button, so it only expands its submenu).
  panel.addEventListener("click", (e) => { if (e.target.closest("a[href]")) set(false, false); });
  document.addEventListener("keydown", (e) => {
    // If a submenu just consumed this Escape (defaultPrevented), keep the menu open.
    if (e.key === "Escape" && !panel.hidden && !e.defaultPrevented) set(false);
  });
  // Keep Tab inside the open menu.
  panel.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const items = [...panel.querySelectorAll("a[href], button:not([disabled])")].filter((x) => x.offsetParent !== null);
    const first = items[0], last = items.at(-1);
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  matchMedia("(min-width: 1024px)").addEventListener?.("change", (e) => e.matches && set(false, false));
}
