import { appIcons } from "../app-icons.js";
import { esc, fmtDate, statusChip } from "../format.js";
import { store } from "../store.js";
import { bindForm } from "../../core/validate.js";
import { toast } from "../../components/widgets.js";

const TOPICS = ["Foundations", "Geetham", "Varnam", "Kriti", "Rhythm", "Other"];
const field = (id, label, control, rule) => `<div class="field"><label for="${id}">${label}</label>${control}<p class="field-error" data-error hidden></p></div>`;

const noteCard = (n) => `
  <li class="note" data-id="${n.id}" data-status="${n.status}">
    <div class="note-top">
      <div class="min-w-0"><h3 class="text-h4">${esc(n.title)}</h3><p class="mt-1 text-small text-muted">${esc(n.topic)} · ${fmtDate(new Date(n.date), { day: "numeric", month: "short", year: "numeric" })}</p></div>
      ${statusChip(n.status === "completed" ? "success" : "warn", n.status === "completed" ? "Completed" : "Pending")}
    </div>
    <div class="note-body">
      <div><h4 class="stat-label">Practice instructions</h4><p>${esc(n.instructions)}</p></div>
      ${n.notes ? `<div><h4 class="stat-label">My notes</h4><p class="text-muted">${esc(n.notes)}</p></div>` : ""}
    </div>
    <div class="note-actions">
      <button type="button" class="btn-tool" data-act="toggle" aria-pressed="${n.status === "completed"}">${appIcons.check}<span>${n.status === "completed" ? "Mark as pending" : "Mark as completed"}</span></button>
      <button type="button" class="btn-tool" data-act="edit" aria-label="Edit ${esc(n.title)}">${appIcons.edit}<span>Edit</span></button>
      <button type="button" class="btn-tool" data-act="delete" data-danger aria-label="Delete ${esc(n.title)}">${appIcons.trash}<span>Delete</span></button>
    </div>
  </li>`;

export default {
  title: "Practice Notes",
  render() {
    return `
    <header class="view-head">
      <div><p class="eyebrow">Practice Notes</p><h1 class="mt-2 text-h2" tabindex="-1">Your practice notes</h1><p class="mt-1 text-muted">Keep what your instructor asks you to practise, and your own notes, in one place.</p></div>
      <button type="button" class="btn btn-primary" data-act="add">${appIcons.plus}<span>Add Note</span></button>
    </header>

    <div class="seg" role="group" aria-label="Filter notes" data-filter>
      <button type="button" data-f="all" aria-pressed="true">All <span data-count="all"></span></button>
      <button type="button" data-f="pending" aria-pressed="false">Pending <span data-count="pending"></span></button>
      <button type="button" data-f="completed" aria-pressed="false">Completed <span data-count="completed"></span></button>
    </div>

    <ul class="mt-6 flex flex-col gap-4" data-notes aria-live="polite"></ul>
    <div class="empty" data-empty hidden>${appIcons.notes}<p class="font-heading text-h4">No notes here yet</p><p class="text-muted">Add a note to start tracking your practice.</p></div>

    <dialog class="app-dialog" data-note-dialog aria-labelledby="note-dialog-title">
      <form data-note-form novalidate method="dialog">
        <div class="dialog-head"><h2 class="text-h4" id="note-dialog-title" data-dialog-title>Add practice note</h2><button type="button" class="icon-btn" data-close aria-label="Close">${appIcons.close}</button></div>
        <div class="dialog-body">
          <input type="hidden" name="id">
          ${field("nf-title", "Title", `<input class="input" id="nf-title" name="title" type="text" placeholder="e.g. Mohanam varnam, second speed" data-rule="title" aria-invalid="false">`)}
          <div class="grid gap-4 sm:grid-cols-2">
            ${field("nf-topic", "Topic", `<select class="input" id="nf-topic" name="topic" data-rule="select" aria-invalid="false"><option value="">Choose a topic</option>${TOPICS.map((t) => `<option>${t}</option>`).join("")}</select>`)}
            ${field("nf-date", "Date", `<input class="input" id="nf-date" name="date" type="date" data-rule="required" aria-invalid="false">`)}
          </div>
          ${field("nf-instr", "Practice instructions", `<textarea class="input" id="nf-instr" name="instructions" rows="3" placeholder="What should be practised, and how?" data-rule="text" aria-invalid="false"></textarea>`)}
          ${field("nf-notes", "My notes (optional)", `<textarea class="input" id="nf-notes" name="notes" rows="3" placeholder="What went well, and what needs work?" aria-invalid="false"></textarea>`)}
          <label class="check"><input type="checkbox" name="completed"><span>Mark as completed</span></label>
          <p class="form-status" data-form-status role="alert" hidden></p>
        </div>
        <div class="dialog-foot"><button type="button" class="btn btn-secondary" data-close>Cancel</button><button type="submit" class="btn btn-primary">Save Note</button></div>
      </form>
    </dialog>

    <dialog class="app-dialog" data-delete-dialog aria-labelledby="del-title">
      <div class="dialog-head"><h2 class="text-h4" id="del-title">Delete this note?</h2></div>
      <div class="dialog-body"><p class="text-muted">“<span data-del-name></span>” will be removed from your practice notes. This cannot be undone.</p></div>
      <div class="dialog-foot"><button type="button" class="btn btn-secondary" data-close>Keep Note</button><button type="button" class="btn btn-danger" data-confirm-delete>Delete Note</button></div>
    </dialog>`;
  },

  mount(root) {
    let notes = store.getNotes();
    let filter = "all";
    let pendingDelete = null;
    const list = root.querySelector("[data-notes]");
    const empty = root.querySelector("[data-empty]");
    const dlg = root.querySelector("[data-note-dialog]");
    const form = root.querySelector("[data-note-form]");
    const delDlg = root.querySelector("[data-delete-dialog]");
    const save = () => store.saveNotes(notes);

    const draw = () => {
      ["all", "pending", "completed"].forEach((k) => { root.querySelector(`[data-count="${k}"]`).textContent = k === "all" ? notes.length : notes.filter((n) => n.status === k).length; });
      const shown = notes.filter((n) => filter === "all" || n.status === filter).sort((a, b) => new Date(b.date) - new Date(a.date));
      list.innerHTML = shown.map(noteCard).join("");
      empty.hidden = shown.length > 0;
    };

    const ctl = bindForm(form, (f) => {
      const data = { title: f.elements.title.value.trim(), topic: f.elements.topic.value, date: new Date(f.elements.date.value + "T12:00:00").toISOString(), instructions: f.elements.instructions.value.trim(), notes: f.elements.notes.value.trim(), status: f.elements.completed.checked ? "completed" : "pending" };
      const id = f.elements.id.value;
      if (id) { notes = notes.map((n) => (n.id === id ? { ...n, ...data } : n)); toast("Practice note updated."); }
      else { notes = [{ id: "n" + Date.now(), ...data }, ...notes]; toast("Practice note added."); }
      save(); dlg.close(); draw();
    });

    const openForm = (n) => {
      ctl.reset();
      root.querySelector("[data-dialog-title]").textContent = n ? "Edit practice note" : "Add practice note";
      form.elements.id.value = n?.id || "";
      form.elements.title.value = n?.title || "";
      form.elements.topic.value = n?.topic || "";
      form.elements.date.value = (n ? new Date(n.date) : new Date()).toISOString().slice(0, 10);
      form.elements.instructions.value = n?.instructions || "";
      form.elements.notes.value = n?.notes || "";
      form.elements.completed.checked = n?.status === "completed";
      dlg.showModal();
      form.elements.title.focus();
    };

    root.addEventListener("click", (e) => {
      const act = e.target.closest("[data-act]");
      const f = e.target.closest("[data-f]");
      if (f) { filter = f.dataset.f; root.querySelectorAll("[data-f]").forEach((b) => b.setAttribute("aria-pressed", String(b === f))); draw(); return; }
      if (e.target.closest("[data-close]")) { e.target.closest("dialog").close(); return; }
      if (e.target.closest("[data-confirm-delete]")) {
        notes = notes.filter((n) => n.id !== pendingDelete); save(); delDlg.close(); draw(); toast("Practice note deleted."); return;
      }
      if (!act) return;
      const id = act.closest("[data-id]")?.dataset.id;
      const n = notes.find((x) => x.id === id);
      if (act.dataset.act === "add") openForm(null);
      if (act.dataset.act === "edit") openForm(n);
      if (act.dataset.act === "toggle") { n.status = n.status === "completed" ? "pending" : "completed"; save(); draw(); toast(n.status === "completed" ? "Marked as completed." : "Marked as pending."); }
      if (act.dataset.act === "delete") { pendingDelete = id; root.querySelector("[data-del-name]").textContent = n.title; delDlg.showModal(); }
    });
    // Light-dismiss: clicking the backdrop closes a dialog.
    root.querySelectorAll("dialog").forEach((d) => d.addEventListener("click", (e) => { if (e.target === d) d.close(); }));
    draw();
  },
};
