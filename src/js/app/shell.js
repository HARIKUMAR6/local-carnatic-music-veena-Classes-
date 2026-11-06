import { site } from "../config/site.js";
import { icons } from "../components/icons.js";
import { themeToggle, dirToggle } from "../components/toggles.js";
import { appIcons } from "./app-icons.js";
import { esc, initials } from "./format.js";
import { store } from "./store.js";
import { notifications, courses } from "../data/student.js";
import overview from "./views/overview.js";
import classes from "./views/classes.js";
import notes from "./views/notes.js";
import payments from "./views/payments.js";
import profile from "./views/profile.js";

const SIGN_OUT = "login.html#signin";
const routes = {
  overview: { ...overview, icon: "home", label: "Overview" },
  classes: { ...classes, icon: "classes", label: "My Classes" },
  notes: { ...notes, icon: "notes", label: "Practice Notes" },
  payments: { ...payments, icon: "payments", label: "Payments" },
  profile: { ...profile, icon: "profile", label: "My Profile" },
};
const $ = (s) => document.querySelector(s);
const brand = (cls = "") => `<div class="brand-link ${cls}">${icons.logo}<span>${site.name}<em>${site.nameAccent}</em></span></div>`;

function sidebarHtml() {
  const p = store.getProfile();
  return `
    <div class="side-brand">${brand("!text-on-brand")}</div>
    <nav class="side-nav" aria-label="Dashboard sections">
      ${Object.entries(routes).map(([k, r]) => `<a class="side-link" href="#${k}" data-route="${k}">${appIcons[r.icon]}<span>${r.label}</span></a>`).join("")}
    </nav>
    <div class="side-foot">
      <div class="flex items-center gap-3"><span class="avatar" aria-hidden="true" data-side-avatar>${esc(initials(p.name))}</span><div class="min-w-0"><p class="truncate text-small font-bold text-on-brand" data-side-name>${esc(p.name)}</p><p class="truncate text-small text-on-brand/70" data-side-course>${esc(courses[p.course].label)} student</p></div></div>
      <a class="side-link" href="${SIGN_OUT}">${appIcons.logout}<span>Sign Out</span></a>
      <button type="button" class="side-link lg:hidden" data-sidebar-close>${appIcons.close}<span>Close menu</span></button>
    </div>`;
}

function topbarHtml() {
  const p = store.getProfile();
  const unread = !store.notificationsRead();
  return `
    <div class="flex min-w-0 items-center gap-3">
      <button type="button" class="icon-btn lg:hidden" data-sidebar-open aria-controls="sidebar" aria-expanded="false" aria-label="Open menu">${appIcons.menu}</button>
      <div class="hidden sm:block lg:hidden">${brand("!text-2xl")}</div>
      <p class="app-crumb hidden lg:flex"><span class="text-muted">Student portal</span><span aria-hidden="true">/</span><strong data-page-title></strong></p>
    </div>
    <div class="flex items-center gap-2">
      ${themeToggle}
      ${dirToggle}

      <div class="relative">
        <button type="button" class="icon-btn relative" data-popover-btn aria-expanded="false" aria-controls="notif-menu" aria-label="Notifications">${appIcons.bell}<span class="notif-dot" data-notif-dot ${unread ? "" : "hidden"}></span></button>
        <div class="menu-panel" id="notif-menu" hidden>
          <div class="menu-head"><h2 class="text-h5 !font-body">Notifications</h2><button type="button" class="text-small font-bold text-accent hover:underline" data-mark-read>Mark all as read</button></div>
          <ul>${notifications.map((n) => `<li class="notif"><p class="font-bold">${esc(n.title)}</p><p class="text-small text-muted">${esc(n.text)}</p><p class="text-small text-muted">${esc(n.time)}</p></li>`).join("")}</ul>
        </div>
      </div>

      <div class="relative">
        <button type="button" class="profile-btn" data-popover-btn aria-expanded="false" aria-controls="profile-menu" aria-label="Account menu"><span class="avatar" aria-hidden="true" data-top-avatar>${esc(initials(p.name))}</span><span class="hidden max-w-[9rem] truncate text-small font-bold md:block" data-top-name>${esc(p.name)}</span>${appIcons.chevron.replace("<svg", '<svg class="hidden h-4 w-4 md:block"')}</button>
        <div class="menu-panel !w-60" id="profile-menu" hidden>
          <div class="menu-head block"><p class="truncate font-bold" data-menu-name>${esc(p.name)}</p><p class="truncate text-small text-muted" data-menu-email>${esc(p.email)}</p></div>
          <a class="menu-item" href="#profile">${appIcons.profile}<span>My Profile</span></a>
          <a class="menu-item" href="${SIGN_OUT}">${appIcons.logout}<span>Sign Out</span></a>
        </div>
      </div>
    </div>`;
}

/** Sidebar becomes an off-canvas drawer below 1024px. Closed drawers are inert so they cannot take keyboard focus. */
function initDrawer() {
  const side = $("[data-sidebar]"), overlay = $("[data-overlay]"), openBtn = $("[data-sidebar-open]");
  const wide = matchMedia("(min-width: 1024px)");
  const set = (open) => {
    side.dataset.open = String(open);
    overlay.hidden = !open;
    openBtn.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("overflow-hidden", open && !wide.matches);
    side.inert = !wide.matches && !open;
    if (open) side.querySelector("a")?.focus();
  };
  openBtn.addEventListener("click", () => set(true));
  overlay.addEventListener("click", () => set(false));
  $("[data-sidebar-close]").addEventListener("click", () => { set(false); openBtn.focus(); });
  side.addEventListener("click", (e) => { if (e.target.closest("a[data-route]") && !wide.matches) setTimeout(() => set(false), 0); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && side.dataset.open === "true" && !wide.matches) { set(false); openBtn.focus(); } });
  wide.addEventListener("change", () => set(false));
  set(false);
}

export function mountShell() {
  $("[data-sidebar]").innerHTML = sidebarHtml();
  $("[data-topbar]").innerHTML = topbarHtml();
  initDrawer();
  $("[data-mark-read]").addEventListener("click", () => { store.markNotificationsRead(); $("[data-notif-dot]").hidden = true; });
  // Keep names in the chrome in sync after the profile is saved.
  document.addEventListener("profile:changed", () => {
    const p = store.getProfile();
    $("[data-side-name]").textContent = p.name; $("[data-top-name]").textContent = p.name; $("[data-menu-name]").textContent = p.name; $("[data-menu-email]").textContent = p.email;
    $("[data-side-avatar]").textContent = initials(p.name); $("[data-top-avatar]").textContent = initials(p.name);
    $("[data-side-course]").textContent = `${courses[p.course].label} student`;
  });
}

/** Hash routing: #overview, #classes, #notes, #payments, #profile. */
export function initRouter() {
  const main = $("#app-main");
  const show = () => {
    const key = routes[location.hash.slice(1)] ? location.hash.slice(1) : "overview";
    const r = routes[key];
    // A fresh container per view, so listeners from the previous view are discarded with it.
    const view = document.createElement("div");
    view.innerHTML = r.render();
    main.replaceChildren(view);
    r.mount?.(view);
    document.querySelectorAll("[data-route]").forEach((a) => (a.dataset.route === key ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
    document.querySelector("[data-page-title]").textContent = r.label;
    document.title = `${r.label} | NadaVeena Student Portal`;
    document.querySelectorAll("[data-popover-btn][aria-expanded=true]").forEach((b) => b.click());
    scrollTo({ top: 0, behavior: "instant" });
    main.querySelector("h1")?.focus({ preventScroll: true });
  };
  addEventListener("hashchange", show);
  show();
}
