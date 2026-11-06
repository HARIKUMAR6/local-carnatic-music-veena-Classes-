/** Accessible tabs: [data-tabs] > [role=tablist] button[role=tab] + [role=tabpanel]. Arrow/Home/End keys supported. */
export function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const select = (tab, focus = false) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", (e) => {
        const rtl = document.documentElement.dir === "rtl";
        const next = (rtl ? ["ArrowLeft"] : ["ArrowRight"]).includes(e.key) ? 1 : (rtl ? ["ArrowRight"] : ["ArrowLeft"]).includes(e.key) ? -1 : 0;
        if (next) { e.preventDefault(); select(tabs[(i + next + tabs.length) % tabs.length], true); }
        else if (e.key === "Home") { e.preventDefault(); select(tabs[0], true); }
        else if (e.key === "End") { e.preventDefault(); select(tabs[tabs.length - 1], true); }
      });
    });
  });
}
