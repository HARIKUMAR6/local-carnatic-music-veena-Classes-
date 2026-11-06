import { teachers } from "../data/teachers.js";

const arch = (t) => `
      <article class="teacher">
        <div class="arch-ring"><div class="arch" style="aspect-ratio:4/5"><img src="${t.imageHome1}" alt="${t.altHome1}" width="800" height="1000" loading="lazy" decoding="async"></div></div>
        <div class="mt-6 flex flex-col gap-1">
          <p class="eyebrow !tracking-[0.16em]">${t.discipline}</p>
          <h3 class="text-h4">${t.name}</h3>
          <p class="text-small font-bold text-accent">${t.role}</p>
          <p class="mt-1 text-muted">${t.bio}</p>
          <p class="text-small text-muted">${t.experience}</p>
        </div>
      </article>`;

const roster = (t) => `
      <article class="roster-row">
        <div class="roster-thumb"><img src="${t.imageHome2}" alt="${t.altHome2}" width="800" height="1000" loading="lazy" decoding="async"></div>
        <div class="flex flex-col gap-1">
          <p class="eyebrow !tracking-[0.16em]">${t.discipline}</p>
          <h3 class="text-h4">${t.name}</h3>
          <p class="text-small font-bold text-accent">${t.role}</p>
        </div>
        <p class="col-span-2 text-muted md:col-span-1">${t.bio}</p>
        <p class="col-span-2 text-small font-bold text-muted md:col-span-1">${t.experience}</p>
      </article>`;

/** Full profile for the Teachers page: alternating photo / biography rows. */
const profile = (t, i) => `
      <article class="profile" id="${t.id}" data-flip="${i % 2}">
        <div class="profile-media"><img src="${t.image}" alt="${t.alt}" width="800" height="1000" loading="lazy" decoding="async" style="object-position:${t.imageFit || "50% 50%"}"></div>
        <div class="profile-body">
          <p class="eyebrow">${t.discipline}</p>
          <h3 class="text-h2">${t.name}</h3>
          <p class="profile-role">${t.role} · ${t.experience}</p>
          <ul class="chip-list" aria-label="Specialisations">${t.specialization.map((x) => `<li>${x}</li>`).join("")}</ul>
          ${t.profile.map((p) => `<p class="text-muted">${p}</p>`).join("")}
          <blockquote class="profile-quote">${t.approach}</blockquote>
          <p class="text-small"><strong>Teaches:</strong> <span class="text-muted">${t.teaches}</span></p>
        </div>
      </article>`;

/** Renders teacher profiles into every [data-teachers]. data-variant="roster" = list, "profile" = Teachers page, default = arch portraits. */
export function renderTeachers() {
  document.querySelectorAll("[data-teachers]").forEach((host) => {
    const limit = Number(host.dataset.limit) || teachers.length;
    const tpl = { roster, profile }[host.dataset.variant] || arch;
    host.innerHTML = teachers.slice(0, limit).map(tpl).join("");
  });
}

/** Compact faculty index (thumbnail + name + role) for [data-faculty-strip]; links to #id on the Teachers page. */
export function renderFacultyStrip() {
  document.querySelectorAll("[data-faculty-strip]").forEach((host) => {
    host.innerHTML = teachers.map((t) => `
      <a href="#${t.id}"><b class="faculty-initial" aria-hidden="true">${t.name.replace(/^(Vidushi|Vidwan) /, "").split(" ").map((w) => w[0]).join("").slice(0, 2)}</b><span><strong>${t.name}</strong><span>${t.role}</span></span></a>`).join("");
  });
}
