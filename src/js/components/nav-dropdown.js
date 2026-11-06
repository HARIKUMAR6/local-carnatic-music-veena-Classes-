/**
 * Click-only disclosure dropdowns ([data-dropdown-toggle] + aria-controls panel).
 * Closed by default. No hover behaviour anywhere. Used by desktop nav and the mobile submenu.
 */
export function initDropdowns() {
  const toggles = [...document.querySelectorAll("[data-dropdown-toggle]")];
  const panelOf = (t) => document.getElementById(t.getAttribute("aria-controls"));
  const wrapOf = (t) => t.closest(".nav-dropdown");
  const isOpen = (t) => t.getAttribute("aria-expanded") === "true";

  const close = (t, refocus = false) => {
    t.setAttribute("aria-expanded", "false");
    panelOf(t).hidden = true;
    if (refocus) t.focus();
  };
  const open = (t) => {
    toggles.forEach((o) => o !== t && wrapOf(o).parentElement === wrapOf(t).parentElement && close(o));
    t.setAttribute("aria-expanded", "true");
    panelOf(t).hidden = false;
  };

  toggles.forEach((t) => {
    t.addEventListener("click", (e) => {
      e.stopPropagation();
      isOpen(t) ? close(t) : open(t);
    });
    t.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        open(t);
        panelOf(t).querySelector("a")?.focus();
      }
    });
    panelOf(t).addEventListener("keydown", (e) => {
      const items = [...panelOf(t).querySelectorAll("a")];
      const i = items.indexOf(document.activeElement);
      if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    });
  });

  // Outside click
  document.addEventListener("click", (e) => {
    toggles.forEach((t) => isOpen(t) && !wrapOf(t).contains(e.target) && close(t));
  });
  // Escape (returns focus to the trigger when focus was inside)
  // The first Escape closes only an open dropdown and marks the event handled (preventDefault),
  // so the mobile menu (mobile-nav.js) stays open until a second Escape.
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    let handled = false;
    toggles.forEach((t) => {
      if (!isOpen(t)) return;
      handled = true;
      close(t, wrapOf(t).contains(document.activeElement));
    });
    if (handled) e.preventDefault();
  });
  // Tabbing away
  document.addEventListener("focusin", (e) => {
    toggles.forEach((t) => isOpen(t) && !wrapOf(t).contains(e.target) && close(t));
  });
}

/** Collapse every dropdown inside a container (used when the mobile menu closes). */
export function closeDropdownsIn(container) {
  container.querySelectorAll("[data-dropdown-toggle]").forEach((t) => {
    t.setAttribute("aria-expanded", "false");
    const p = document.getElementById(t.getAttribute("aria-controls"));
    if (p) p.hidden = true;
  });
}
