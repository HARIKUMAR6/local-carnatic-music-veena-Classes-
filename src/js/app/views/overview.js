import { appIcons } from "../app-icons.js";
import { esc, initials, firstName, fmtDate, greeting, statusChip } from "../format.js";
import { store, asDate } from "../store.js";
import { courses, buildClasses, slot, practiceWeek, practiceGoal, announcements, activity } from "../../data/student.js";

export default {
  title: "Overview",
  render() {
    const p = store.getProfile();
    const c = courses[p.course];
    const { upcoming } = buildClasses(p.course);
    const next = upcoming[0];
    const notes = store.getNotes();
    const done = notes.filter((n) => n.status === "completed").length;
    const total = practiceWeek.reduce((a, d) => a + d.minutes, 0);
    const days = practiceWeek.filter((d) => d.minutes > 0).length;
    const max = Math.max(practiceGoal, ...practiceWeek.map((d) => d.minutes));

    return `
    <header class="view-head">
      <div>
        <p class="eyebrow">${fmtDate(new Date(), { weekday: "long", day: "numeric", month: "long" })}</p>
        <h1 class="mt-2 text-h2" tabindex="-1">${greeting()}, ${esc(firstName(p.name))}</h1>
        <p class="mt-1 text-muted">Here is where your ${esc(c.label)} lessons stand this week.</p>
      </div>
    </header>

    <div class="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
      <div class="flex min-w-0 flex-col gap-6">

        <section class="next-class" aria-labelledby="next-title">
          <div class="next-date" aria-hidden="true"><span>${fmtDate(next.date, { month: "short" })}</span><strong>${next.date.getDate()}</strong><span>${fmtDate(next.date, { weekday: "short" })}</span></div>
          <div class="min-w-0 flex-1">
            <p class="eyebrow">Upcoming class</p>
            <h2 id="next-title" class="mt-2 text-h3">${esc(next.topic)}</h2>
            <ul class="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-small text-on-brand/85">
              <li class="flex items-center gap-2">${appIcons.clock}<span>${fmtDate(next.date, { weekday: "long", day: "numeric", month: "long" })}, ${slot.time}</span></li>
              <li class="flex items-center gap-2">${appIcons.profile}<span>${esc(c.instructor.name)}</span></li>
            </ul>
          </div>
          <div class="flex items-center gap-3">${statusChip("gold", "Scheduled")}<a class="btn btn-on-dark btn-sm" href="#classes">View Classes</a></div>
        </section>

        <section class="panel" aria-labelledby="progress-title">
          <div class="panel-head"><h2 id="progress-title" class="panel-title">Learning progress</h2><span class="text-small text-muted">${esc(c.label)} · ${esc(c.level)}</span></div>
          <div class="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
            <div class="progress-ring" style="--p:${c.progress}" role="img" aria-label="${c.progress} percent of the current level complete"><div><strong>${c.progress}%</strong><span>of Level 2</span></div></div>
            <ol class="milestones">
              ${c.milestones.map((m) => `<li data-state="${m.state}"><span class="dot" aria-hidden="true">${m.state === "done" ? appIcons.check : ""}</span><div><p class="font-bold">${esc(m.title)} ${m.state === "current" ? statusChip("gold", "In progress") : ""}</p><p class="text-small text-muted">${esc(m.detail)}</p></div></li>`).join("")}
            </ol>
          </div>
        </section>

        <section class="panel" aria-labelledby="practice-title">
          <div class="panel-head"><h2 id="practice-title" class="panel-title">Practice this week</h2><span class="text-small text-muted">Daily goal: ${practiceGoal} minutes</span></div>
          <div class="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div class="bars" role="img" aria-label="Minutes practised each day: ${practiceWeek.map((d) => `${d.day} ${d.minutes}`).join(", ")}">
              <span class="goal-line" style="bottom:${(practiceGoal / max) * 100}%" aria-hidden="true"></span>
              ${practiceWeek.map((d) => `<div class="bar-col"><span class="bar" style="height:${Math.max((d.minutes / max) * 100, 2)}%" data-hit="${d.minutes >= practiceGoal}" data-zero="${d.minutes === 0}"></span><span class="bar-label">${d.day}</span></div>`).join("")}
            </div>
            <dl class="grid grid-cols-3 gap-4 md:grid-cols-1">
              <div><dt class="stat-label">Total</dt><dd class="stat-value">${total} min</dd></div>
              <div><dt class="stat-label">Active days</dt><dd class="stat-value">${days} of 7</dd></div>
              <div><dt class="stat-label">Notes done</dt><dd class="stat-value">${done} of ${notes.length}</dd></div>
            </dl>
          </div>
        </section>
      </div>

      <div class="flex min-w-0 flex-col gap-6">
        <section class="panel" aria-labelledby="sum-title">
          <h2 id="sum-title" class="sr-only">Student profile summary</h2>
          <div class="flex items-center gap-4"><span class="avatar-lg" aria-hidden="true">${esc(initials(p.name))}</span><div class="min-w-0"><p class="truncate font-heading text-h4">${esc(p.name)}</p><p class="truncate text-small text-muted">${esc(p.email)}</p></div></div>
          <dl class="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-5 text-small">
            <div><dt class="stat-label">Course</dt><dd class="font-bold">${esc(c.label)}</dd></div>
            <div><dt class="stat-label">Level</dt><dd class="font-bold">Level 2</dd></div>
            <div><dt class="stat-label">Instructor</dt><dd class="font-bold">${esc(c.instructor.name.replace(/^(Vidushi|Vidwan) /, ""))}</dd></div>
            <div><dt class="stat-label">Joined</dt><dd class="font-bold">${esc(p.joined)}</dd></div>
          </dl>
          <a class="link-arrow mt-5" href="#profile">View profile ${appIcons.arrow}</a>
        </section>

        <section class="panel" aria-labelledby="ann-title">
          <h2 id="ann-title" class="panel-title mb-4">Announcements</h2>
          <ul class="flex flex-col gap-4">
            ${announcements.map((a) => `<li class="announce" data-tone="${a.tone}"><p class="font-bold">${esc(a.title)}</p><p class="text-small text-muted">${esc(a.text)}</p></li>`).join("")}
          </ul>
        </section>

        <section class="panel" aria-labelledby="act-title">
          <h2 id="act-title" class="panel-title mb-4">Recent activity</h2>
          <ul class="timeline">
            ${activity.map((a) => `<li><span class="timeline-icon" aria-hidden="true">${appIcons[a.icon]}</span><div><p class="text-small">${esc(a.text)}</p><p class="text-small text-muted">${fmtDate(asDate(a.when), { day: "numeric", month: "short" })}</p></div></li>`).join("")}
          </ul>
        </section>
      </div>
    </div>`;
  },
};
