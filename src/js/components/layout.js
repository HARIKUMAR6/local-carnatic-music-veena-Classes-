import { site } from "../config/site.js";
import { icons } from "./icons.js";
import { contact, addressLines } from "../config/contact.js";
import { themeToggle, dirToggle } from "./toggles.js";

const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
const isHere = (href) => href.toLowerCase() === here;
const link = (item, cls = "nav-link") =>
  `<a class="${cls}" href="${item.href}"${isHere(item.href) ? ' aria-current="page"' : ""}>${item.label}</a>`;

/** One nav entry: plain link, or a click-to-open dropdown (never hover) when it has children. */
const navItem = (item, key) => {
  if (!item.children) return link(item);
  const id = `${key}-menu-${item.label.toLowerCase().replace(/\W+/g, "-")}`;
  const active = item.children.some((c) => isHere(c.href));
  return `<div class="nav-dropdown">
    <button type="button" class="nav-link nav-trigger" data-dropdown-toggle aria-expanded="false" aria-controls="${id}"${active ? ' data-active="true"' : ""}>${item.label}${icons.chevron}</button>
    <ul class="nav-menu" id="${id}" hidden>${item.children.map((c) => `<li>${link(c, "nav-menu-link")}</li>`).join("")}</ul>
  </div>`;
};

const toggles = `${themeToggle}${dirToggle}`;

export function mountHeader() {
  const host = document.querySelector('[data-component="header"]');
  if (!host) return;
  host.outerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="site-header-bar">
      <a class="brand-link" href="index.html" aria-label="${site.name}${site.nameAccent} home">${icons.logo}<span>${site.name}<em>${site.nameAccent}</em></span></a>
      <nav class="nav-desktop" aria-label="Primary">${site.nav.map((n) => navItem(n, "d")).join("")}</nav>
      <div class="header-tools">
        <div class="header-toggles">${toggles}</div>
        <a class="btn btn-primary btn-sm header-cta" href="${site.cta.href}">${site.cta.label}</a>
        <button type="button" class="icon-btn menu-btn" data-menu-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">${icons.menu}</button>
      </div>
    </div>
  </header>
  <nav class="nav-mobile" id="mobile-nav" aria-label="Mobile" aria-modal="true" role="dialog" hidden>
    <div class="nav-mobile-bar">
      <a class="brand-link" href="index.html" aria-label="${site.name}${site.nameAccent} home">${icons.logo}<span>${site.name}<em>${site.nameAccent}</em></span></a>
      <button type="button" class="icon-btn" data-menu-close aria-label="Close menu">${icons.close}</button>
    </div>
    <div class="nav-mobile-body container-page">
      ${site.nav.map((n) => navItem(n, "m")).join("")}
      <div class="nav-mobile-tools">${toggles}</div>
      <a class="btn btn-primary btn-lg w-full" href="${site.cta.href}">${site.cta.label}</a>
    </div>
  </nav>`;
}

export function mountFooter() {
  const host = document.querySelector('[data-component="footer"]');
  if (!host) return;
  const col = (title, items) => `<div><h2 class="footer-heading">${title}</h2>${items.map((i) => link(i, "footer-link")).join("")}</div>`;
  host.outerHTML = `
  <footer class="site-footer">
    <div class="footer-grid">
      <div class="flex max-w-sm flex-col gap-4">
        <a class="brand-link !text-on-brand" href="index.html">${icons.logo}<span>${site.name}<em class="!text-accent-fill">${site.nameAccent}</em></span></a>
        <p class="text-small text-on-brand/80">${site.tagline}</p>
        <ul class="social-list" aria-label="Social media">${site.social.map((x) => `<li>${x.url
          ? `<a class="social-link" href="${x.url}" target="_blank" rel="noopener noreferrer" aria-label="${x.label}">${icons[x.id]}</a>`
          : `<button type="button" class="social-link" aria-disabled="true" aria-label="${x.label}" title="${x.label}: link not configured yet">${icons[x.id]}</button>`}</li>`).join("")}</ul>
      </div>
      ${col("Academy", site.footerAcademy)}
      ${col("Learn", site.footerLearn)}
      <div><h2 class="footer-heading">Visit and contact</h2>
        <address class="footer-address">
          <p class="mb-3 font-bold">${contact.academyName}</p>
          <div class="footer-row">${icons.pin}<span>${addressLines().map((x) => `<span class="block">${x}</span>`).join("")}</span></div>
          <div class="footer-row">${icons.phone}<a class="footer-link !py-0" dir="ltr" href="tel:${contact.phone.tel}">${contact.phone.display}</a></div>
          <div class="footer-row">${icons.mail}<a class="footer-link !py-0 break-all" dir="ltr" href="mailto:${contact.email}">${contact.email}</a></div>
        </address>
      </div>
    </div>
    <div class="footer-base"><div class="container-page">&copy; ${new Date().getFullYear()} ${site.name}${site.nameAccent}. All rights reserved.</div></div>
  </footer>
  <button type="button" class="scroll-top" data-scroll-top aria-label="Back to top">${icons.arrowUp}</button>`;
}
