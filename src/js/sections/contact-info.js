import { contact, addressLines, mapEmbedUrl, directionsUrl } from "../config/contact.js";

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/** Fills every [data-contact="name|address|address-inline|email|phone|hours"] from config/contact.js (single source).
 *  <a> elements also receive the matching mailto:/tel: href. Address lines render as block rows. */
export function renderContact() {
  document.querySelectorAll("[data-contact]").forEach((el) => {
    switch (el.dataset.contact) {
      case "name": el.textContent = contact.academyName; break;
      case "address": el.innerHTML = addressLines().map((l) => `<span class="block">${esc(l)}</span>`).join(""); break;
      case "address-inline": el.textContent = addressLines().join(", "); break;
      case "email": el.dir = "ltr"; el.textContent = contact.email; if (el.tagName === "A") el.href = `mailto:${contact.email}`; break;
      case "phone": el.dir = "ltr"; el.textContent = contact.phone.display; if (el.tagName === "A") el.href = `tel:${contact.phone.tel}`; break;
      case "hours": el.textContent = contact.hoursNote; break;
    }
  });
  document.querySelectorAll("iframe[data-map]").forEach((f) => { f.src = mapEmbedUrl(); });
  document.querySelectorAll("a[data-directions]").forEach((a) => { a.href = directionsUrl(); });
  // Notices that only make sense while the details are sample content.
  document.querySelectorAll("[data-provisional-only]").forEach((el) => { el.hidden = !contact.provisional; });
}
