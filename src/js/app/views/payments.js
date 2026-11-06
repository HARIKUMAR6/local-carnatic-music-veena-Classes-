import { appIcons } from "../app-icons.js";
import { esc, fmtDate, fmtLong, fmtINR, statusChip } from "../format.js";
import { store, asDate } from "../store.js";
import { payments } from "../../data/student.js";
import { contact, addressLines } from "../../config/contact.js";

const tone = { paid: ["success", "Paid"], due: ["warn", "Due"] };

export default {
  title: "Payments",
  render() {
    const rows = payments.map((p) => ({ ...p, when: asDate(p.date) }));
    const paid = rows.filter((r) => r.status === "paid");
    const due = rows.find((r) => r.status === "due");
    const paidTotal = paid.reduce((a, r) => a + r.amount, 0);

    return `
    <header class="view-head">
      <div><p class="eyebrow">Payments</p><h1 class="mt-2 text-h2" tabindex="-1">Fees and receipts</h1><p class="mt-1 text-muted">Your fee history and receipts for ${esc(store.getProfile().name)}.</p></div>
    </header>

    <section class="grid gap-4 md:grid-cols-3" aria-label="Payment summary">
      <div class="panel"><p class="stat-label">Total paid</p><p class="stat-big">${fmtINR(paidTotal)}</p><p class="text-small text-muted">${paid.length} payments</p></div>
      <div class="panel"><p class="stat-label">Outstanding</p><p class="stat-big">${fmtINR(due ? due.amount : 0)}</p><p class="text-small text-muted">${due ? esc(due.item) : "Nothing due"}</p></div>
      <div class="panel"><p class="stat-label">Next due date</p><p class="stat-big">${due ? fmtDate(due.when, { day: "numeric", month: "short" }) : "None"}</p><p class="text-small text-muted">${due ? fmtDate(due.when, { weekday: "long", year: "numeric" }) : "You are up to date"}</p></div>
    </section>

    <section class="panel mt-6" aria-labelledby="hist-title">
      <h2 id="hist-title" class="panel-title mb-4">Payment history</h2>
      <div class="table-wrap">
        <table class="data-table">
          <caption class="sr-only">Payment history</caption>
          <thead><tr><th scope="col">Description</th><th scope="col">Invoice</th><th scope="col">Date</th><th scope="col" class="num">Amount</th><th scope="col">Status</th><th scope="col"><span class="sr-only">Action</span></th></tr></thead>
          <tbody>
            ${rows.map((r) => `<tr>
              <td data-label="Description"><span class="font-bold">${esc(r.item)}</span></td>
              <td data-label="Invoice"><span class="text-muted">${esc(r.id)}</span></td>
              <td data-label="${r.status === "due" ? "Due date" : "Date"}">${fmtDate(r.when, { day: "numeric", month: "short", year: "numeric" })}</td>
              <td data-label="Amount" class="num font-bold">${fmtINR(r.amount)}</td>
              <td data-label="Status">${statusChip(...tone[r.status])}</td>
              <td data-label="Action"><button type="button" class="btn-tool" data-receipt="${esc(r.id)}">${appIcons.receipt}<span>${r.status === "paid" ? "Receipt" : "Invoice"}</span></button></td>
            </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </section>

    <dialog class="app-dialog" data-receipt-dialog aria-labelledby="rc-title">
      <div class="dialog-head"><h2 class="text-h4" id="rc-title" data-rc="heading">Receipt</h2><button type="button" class="icon-btn" data-close aria-label="Close">${appIcons.close}</button></div>
      <div class="dialog-body receipt" id="receipt-print">
        <div><p class="font-heading text-h4">${esc(contact.academyName)}</p><address class="text-small not-italic text-muted">${addressLines().map(esc).join(", ")}</address></div>
        <dl class="grid grid-cols-2 gap-4 border-t border-line pt-4 text-small">
          <div><dt class="stat-label">Number</dt><dd class="font-bold" data-rc="id"></dd></div>
          <div><dt class="stat-label">Date</dt><dd class="font-bold" data-rc="date"></dd></div>
          <div class="col-span-2"><dt class="stat-label">Billed to</dt><dd class="font-bold" data-rc="student"></dd></div>
          <div class="col-span-2"><dt class="stat-label">Description</dt><dd class="font-bold" data-rc="item"></dd></div>
        </dl>
        <div class="flex items-center justify-between border-t border-line pt-4"><span data-rc="status"></span><span class="font-heading text-h3" data-rc="amount"></span></div>
      </div>
      <div class="dialog-foot"><button type="button" class="btn btn-secondary" data-close>Close</button><button type="button" class="btn btn-primary" data-print>Print</button></div>
    </dialog>`;
  },

  mount(root) {
    const dlg = root.querySelector("[data-receipt-dialog]");
    const set = (k, v, html = false) => { const el = root.querySelector(`[data-rc="${k}"]`); html ? (el.innerHTML = v) : (el.textContent = v); };
    root.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) return dlg.close();
      if (e.target.closest("[data-print]")) return window.print();
      const b = e.target.closest("[data-receipt]");
      if (!b) return;
      const r = payments.find((p) => p.id === b.dataset.receipt);
      set("heading", r.status === "paid" ? "Receipt" : "Invoice");
      set("id", r.id); set("date", fmtLong(asDate(r.date))); set("student", store.getProfile().name); set("item", r.item);
      set("amount", fmtINR(r.amount)); set("status", statusChip(...tone[r.status]), true);
      dlg.showModal();
    });
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  },
};
