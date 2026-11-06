export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
export const initials = (name) => name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "S";
export const firstName = (name) => name.trim().split(/\s+/)[0];
export const fmtDate = (d, o = { weekday: "short", day: "numeric", month: "short" }) => new Intl.DateTimeFormat("en-IN", o).format(d);
export const fmtLong = (d) => fmtDate(d, { day: "numeric", month: "long", year: "numeric" });
export const fmtINR = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
export const greeting = (h = new Date().getHours()) => (h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
export const statusChip = (tone, label) => `<span class="status" data-tone="${tone}">${label}</span>`;
