/**
 * Reusable form validation (used by the Login Portal and the Dashboard).
 * Markup contract: each control has data-rule="<ruleName>" and sits in a .field wrapper that contains a [data-error] element.
 * Optional data-match="<fieldName>" for the "confirm" rule. Nothing here sends or stores values.
 */
export const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const phoneOk = (v) => /^[6-9]\d{9}$/.test(v.replace(/[\s\-()]/g, "").replace(/^(\+91|0091|91|0)/, ""));

export const rules = {
  name: (v) => (v.trim().length < 2 ? "Please enter your full name." : ""),
  email: (v) => (!v.trim() ? "Please enter your email address." : emailOk(v) ? "" : "Enter a valid email address, such as name@example.com."),
  phone: (v) => (!v.trim() ? "Please enter your phone number." : phoneOk(v) ? "" : "Enter a 10-digit Indian mobile number, with or without +91."),
  password: (v) => (v ? "" : "Please enter your password."),
  newPassword: (v) => (v.length < 8 ? "Use at least 8 characters." : !/[A-Za-z]/.test(v) || !/\d/.test(v) ? "Include at least one letter and one number." : ""),
  confirm: (v, form, el) => (!v ? "Please confirm your password." : v !== form.elements[el.dataset.match].value ? "Passwords do not match." : ""),
  terms: (v, form, el) => (el.checked ? "" : "Please accept the terms to continue."),
  required: (v) => (v.trim() ? "" : "This field is required."),
  title: (v) => (v.trim().length < 3 ? "Give the note a title (at least 3 characters)." : ""),
  text: (v) => (v.trim().length < 5 ? "Please add a little more detail (at least 5 characters)." : ""),
  select: (v) => (v ? "" : "Please choose an option."),
};

/** Show or clear a field's error and mark its state. */
export function setFieldState(el, msg) {
  const wrap = el.closest(".field");
  const err = wrap.querySelector("[data-error]");
  if (!err.id) err.id = `err-${el.name || el.id}`;
  el.setAttribute("aria-describedby", [...new Set([...(el.getAttribute("aria-describedby") || "").split(" "), err.id])].filter(Boolean).join(" "));
  el.setAttribute("aria-invalid", msg ? "true" : "false");
  wrap.dataset.state = msg ? "invalid" : (el.type === "checkbox" ? el.checked : el.value) ? "valid" : "";
  err.textContent = msg;
  err.hidden = !msg;
}

const check = (form, el) => {
  const m = rules[el.dataset.rule]?.(el.value, form, el) ?? "";
  setFieldState(el, m);
  return !m;
};

/**
 * Wire validation to a form. onValid(form) runs only when every [data-rule] control passes.
 * Returns { validate(), reset() }.
 */
export function bindForm(form, onValid) {
  const controls = () => [...form.querySelectorAll("[data-rule]")];
  const status = form.querySelector("[data-form-status]");
  const touch = (el) => { el.dataset.touched = "1"; };

  controls().forEach((el) => {
    const live = () => { if (el.dataset.touched || el.getAttribute("aria-invalid") === "true") check(form, el); };
    el.addEventListener("blur", () => { if (el.type === "checkbox" || el.value !== "" || el.dataset.touched) { touch(el); check(form, el); } });
    el.addEventListener("input", () => {
      live();
      // Re-check dependants (e.g. confirm password) when the field they match changes.
      controls().filter((d) => d.dataset.match === el.name && d.dataset.touched).forEach((d) => check(form, d));
    });
    el.addEventListener("change", () => { touch(el); check(form, el); });
  });

  const validate = () => {
    const bad = controls().filter((el) => { touch(el); return !check(form, el); });
    if (status) {
      status.hidden = !bad.length;
      status.textContent = bad.length ? `Please fix ${bad.length} ${bad.length === 1 ? "field" : "fields"} to continue.` : "";
    }
    bad[0]?.focus();
    return !bad.length;
  };

  form.addEventListener("submit", (e) => { e.preventDefault(); if (validate()) onValid(form); });

  return {
    validate,
    reset() {
      form.reset();
      controls().forEach((el) => { delete el.dataset.touched; setFieldState(el, ""); });
      if (status) status.hidden = true;
    },
  };
}

/** Put a button into / out of a loading state. */
export function setLoading(btn, on, label) {
  if (on) { btn.dataset.label = btn.innerHTML; btn.innerHTML = `<span class="spinner" aria-hidden="true"></span><span>${label}</span>`; }
  else if (btn.dataset.label) btn.innerHTML = btn.dataset.label;
  btn.disabled = on;
  btn.setAttribute("aria-busy", String(on));
}
