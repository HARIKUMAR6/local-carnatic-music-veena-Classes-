import { appIcons } from "../app-icons.js";
import { esc, fmtDate, statusChip, initials } from "../format.js";
import { store } from "../store.js";
import { courses, buildClasses, slot } from "../../data/student.js";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default {
  title: "My Classes",
  render() {
    const p = store.getProfile();
    const c = courses[p.course];
    const t = c.instructor;
    const { upcoming, completed } = buildClasses(p.course);

    return `
    <header class="view-head">
      <div><p class="eyebrow">My Classes</p><h1 class="mt-2 text-h2" tabindex="-1">Your lessons</h1><p class="mt-1 text-muted">Your enrolled course, weekly schedule and class history.</p></div>
    </header>

    <div class="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
      <div class="flex min-w-0 flex-col gap-6">

        <section class="panel" aria-labelledby="course-title">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div><p class="stat-label">Enrolled course</p><h2 id="course-title" class="mt-1 text-h3">${esc(c.label)}</h2><p class="text-muted">${esc(c.level)} · Currently: ${esc(c.focus)}</p></div>
            ${statusChip("success", "Active")}
          </div>
          <div class="progress mt-5" role="progressbar" aria-valuenow="${c.progress}" aria-valuemin="0" aria-valuemax="100" aria-label="Course progress"><span style="width:${c.progress}%"></span></div>
          <p class="mt-2 text-small text-muted">${c.progress}% of this level complete</p>

          <h3 class="mt-6 text-h5">Weekly schedule</h3>
          <div class="week-strip mt-3" role="list" aria-label="Weekly lesson day">
            ${DAYS.map((d, i) => `<div role="listitem" data-on="${i === slot.dow}" ${i === slot.dow ? 'aria-label="Lesson day: ' + d + '"' : ""}><span>${d}</span>${i === slot.dow ? `<strong>${slot.time}</strong>` : ""}</div>`).join("")}
          </div>
          <p class="mt-3 text-small text-muted">Weekly lesson · ${slot.length}. Your instructor confirms timings with you.</p>
        </section>

        <section class="panel" aria-labelledby="up-title">
          <h2 id="up-title" class="panel-title mb-4">Upcoming classes</h2>
          <ul class="class-list">
            ${upcoming.map((u) => `<li><div class="class-date" aria-hidden="true"><strong>${u.date.getDate()}</strong><span>${fmtDate(u.date, { month: "short" })}</span></div><div class="min-w-0 flex-1"><p class="font-bold">${esc(u.topic)}</p><p class="text-small text-muted">${fmtDate(u.date, { weekday: "long" })}, ${slot.time} · ${esc(t.name)}</p></div>${u.status === "next" ? statusChip("gold", "Next class") : statusChip("info", "Scheduled")}</li>`).join("")}
          </ul>
        </section>

        <section class="panel" aria-labelledby="done-title">
          <h2 id="done-title" class="panel-title mb-4">Completed classes</h2>
          <div class="table-wrap">
            <table class="data-table">
              <caption class="sr-only">Completed classes</caption>
              <thead><tr><th scope="col">Date</th><th scope="col">Lesson</th><th scope="col">Instructor</th><th scope="col">Status</th></tr></thead>
              <tbody>
                ${completed.map((u) => `<tr><td data-label="Date">${fmtDate(u.date, { weekday: "short", day: "numeric", month: "short", year: "numeric" })}</td><td data-label="Lesson">${esc(u.topic)}</td><td data-label="Instructor">${esc(t.name)}</td><td data-label="Status">${statusChip("success", "Completed")}</td></tr>`).join("")}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <aside class="panel" aria-labelledby="inst-title">
        <h2 id="inst-title" class="panel-title mb-4">Your instructor</h2>
        <div class="flex items-center gap-4"><span class="avatar-lg" aria-hidden="true">${esc(initials(t.name.replace(/^(Vidushi|Vidwan) /, "")))}</span><div class="min-w-0"><p class="font-heading text-h4">${esc(t.name)}</p><p class="text-small font-bold text-accent">${esc(t.role)}</p></div></div>
        <ul class="chip-list mt-4" aria-label="Specialisations">${t.specialization.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        <p class="mt-4 text-small text-muted">${esc(t.experience)}</p>
        <blockquote class="profile-quote mt-4 !text-base">${esc(t.approach)}</blockquote>
      </aside>
    </div>`;
  },
};
