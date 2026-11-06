/**
 * Enquiry form: FRONTEND ONLY. Validates in the browser and shows feedback.
 * Nothing is sent, stored or emailed; there is no backend. Wire a real endpoint into the submit handler when one exists.
 * Markup contract: <form data-enquiry-form novalidate> inside [data-form-wrap]; .field wrappers with [data-error];
 * a [data-form-status] live region; a [data-form-success] panel with [data-success-course] and [data-form-reset].
 */
const rules = {
  name: (v) => (v.trim().length < 2 ? "Please enter your full name." : ""),
  email: (v) => (!v.trim() ? "Please enter your email address." : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter a valid email address, such as name@example.com."),
  phone: (v) => {
    const d = v.replace(/[\s\-()]/g, "").replace(/^(\+91|0091|91|0)/, "");
    return !v.trim() ? "Please enter a contact number." : /^[6-9]\d{9}$/.test(d) ? "" : "Enter a 10-digit Indian mobile number, with or without +91.";
  },
  course: (v) => (v ? "" : "Please choose a course."),
  message: (v) => (v.trim().length < 10 ? "Please write at least a short sentence (10 characters)." : ""),
};

function setState(field, msg) {
  const wrap = field.closest(".field");
  const err = wrap.querySelector("[data-error]");
  field.setAttribute("aria-invalid", msg ? "true" : "false");
  wrap.dataset.state = msg ? "invalid" : field.value ? "valid" : "";
  err.textContent = msg;
  err.hidden = !msg;
}
const check = (field) => { const m = rules[field.name]?.(field.value) ?? ""; setState(field, m); return !m; };

export function initEnquiryForm() {
  const form = document.querySelector("[data-enquiry-form]");
  if (!form) return;
  const wrap = form.closest("[data-form-wrap]");
  const fields = [...form.querySelectorAll("[name]")].filter((f) => rules[f.name]);
  const status = form.querySelector("[data-form-status]");
  const success = wrap.querySelector("[data-form-success]");
  const sel = form.elements.course;

  // Preselect the course from ?course=vocal|veena (used by the Courses page CTAs).
  const want = new URLSearchParams(location.search).get("course");
  if (want) { const o = [...sel.options].find((x) => x.value === want.toLowerCase()); if (o) sel.value = o.value; }

  fields.forEach((f) => {
    f.addEventListener("blur", () => { if (f.value !== "" || f.dataset.touched) { f.dataset.touched = "1"; check(f); } });
    f.addEventListener("input", () => { if (f.dataset.touched || f.getAttribute("aria-invalid") === "true") check(f); });
    f.addEventListener("change", () => { f.dataset.touched = "1"; check(f); });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const bad = fields.filter((f) => { f.dataset.touched = "1"; return !check(f); });
    if (bad.length) {
      status.textContent = `Please fix ${bad.length} ${bad.length === 1 ? "field" : "fields"} before sending.`;
      status.hidden = false;
      bad[0].focus();
      return;
    }
    status.textContent = "";
    status.hidden = true;
    success.querySelector("[data-success-course]").textContent = sel.options[sel.selectedIndex].text;
    form.hidden = true;
    success.hidden = false;
    success.focus();
  });

  wrap.querySelector("[data-form-reset]")?.addEventListener("click", () => {
    form.reset();
    fields.forEach((f) => { delete f.dataset.touched; setState(f, ""); });
    success.hidden = true;
    form.hidden = false;
    form.elements.name.focus();
  });
}
