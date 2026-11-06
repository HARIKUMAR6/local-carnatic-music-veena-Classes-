import { appIcons } from "../app-icons.js";
import { esc, initials } from "../format.js";
import { store } from "../store.js";
import { bindForm } from "../../core/validate.js";
import { toast, pwButton } from "../../components/widgets.js";
import { courses } from "../../data/student.js";

const err = `<p class="field-error" data-error hidden></p>`;

export default {
  title: "My Profile",
  render() {
    const p = store.getProfile();
    return `
    <header class="view-head">
      <div><p class="eyebrow">My Profile</p><h1 class="mt-2 text-h2" tabindex="-1">Your details</h1><p class="mt-1 text-muted">Keep your contact details and course up to date.</p></div>
    </header>

    <div class="grid items-start gap-6 xl:grid-cols-[19rem_minmax(0,1fr)]">
      <section class="panel text-center" aria-labelledby="photo-title">
        <h2 id="photo-title" class="sr-only">Profile photo</h2>
        <div class="photo-area" data-photo><span class="avatar-xl" data-avatar aria-hidden="true">${esc(initials(p.name))}</span></div>
        <p class="mt-4 font-heading text-h4" data-name-out>${esc(p.name)}</p>
        <p class="text-small text-muted">${esc(courses[p.course].label)} student</p>
        <div class="mt-5 flex flex-wrap justify-center gap-2">
          <label class="btn-tool cursor-pointer" for="photo-input">${appIcons.upload}<span>Change photo</span></label>
          <input id="photo-input" class="sr-only" type="file" accept="image/*" data-photo-input>
          <button type="button" class="btn-tool" data-photo-remove hidden>${appIcons.trash}<span>Remove</span></button>
        </div>
      </section>

      <div class="flex min-w-0 flex-col gap-6">
        <section class="panel" aria-labelledby="det-title">
          <h2 id="det-title" class="panel-title mb-5">Student details</h2>
          <form class="grid gap-5 md:grid-cols-2" data-profile-form novalidate>
            <div class="field"><label for="pf-name">Full name</label><input class="input" id="pf-name" name="name" type="text" autocomplete="name" value="${esc(p.name)}" data-rule="name" aria-invalid="false">${err}</div>
            <div class="field"><label for="pf-email">Email address</label><input class="input" id="pf-email" name="email" type="email" dir="ltr" autocomplete="email" value="${esc(p.email)}" data-rule="email" aria-invalid="false">${err}</div>
            <div class="field"><label for="pf-phone">Phone number</label><input class="input" id="pf-phone" name="phone" type="tel" dir="ltr" autocomplete="tel" value="${esc(p.phone)}" data-rule="phone" aria-invalid="false">${err}</div>
            <div class="field"><label for="pf-course">Enrolled course</label>
              <select class="input" id="pf-course" name="course" data-rule="select" aria-invalid="false">${Object.entries(courses).map(([k, c]) => `<option value="${k}" ${k === p.course ? "selected" : ""}>${esc(c.label)}</option>`).join("")}</select>${err}</div>
            <p class="form-status md:col-span-2" data-form-status role="alert" hidden></p>
            <div class="btn-group md:col-span-2"><button class="btn btn-primary" type="submit">Save Changes</button><button class="btn btn-secondary" type="button" data-reset>Discard</button></div>
          </form>
        </section>

        <section class="panel" aria-labelledby="pw-title">
          <h2 id="pw-title" class="panel-title mb-5">Change password</h2>
          <form class="grid gap-5 md:grid-cols-2" data-password-form novalidate>
            <div class="field md:col-span-2"><label for="pw-current">Current password</label><div class="pw"><input class="input" id="pw-current" name="current" type="password" dir="ltr" autocomplete="current-password" data-rule="password" aria-invalid="false">${pwButton}</div>${err}</div>
            <div class="field"><label for="pw-new">New password</label><div class="pw"><input class="input" id="pw-new" name="password" type="password" dir="ltr" autocomplete="new-password" data-rule="newPassword" aria-invalid="false">${pwButton}</div>${err}</div>
            <div class="field"><label for="pw-confirm">Confirm new password</label><div class="pw"><input class="input" id="pw-confirm" name="confirm" type="password" dir="ltr" autocomplete="new-password" data-rule="confirm" data-match="password" aria-invalid="false">${pwButton}</div>${err}</div>
            <p class="form-status md:col-span-2" data-form-status role="alert" hidden></p>
            <div class="md:col-span-2"><button class="btn btn-secondary" type="submit">Update Password</button></div>
          </form>
        </section>
      </div>
    </div>`;
  },

  mount(root) {
    const form = root.querySelector("[data-profile-form]");
    const out = root.querySelector("[data-name-out]");
    const photoArea = root.querySelector("[data-photo]");
    const remove = root.querySelector("[data-photo-remove]");
    const saveBtn = form.querySelector('button[type="submit"]');
    let photoUrl = null;

    const ctl = bindForm(form, (f) => {
      saveBtn.disabled = true; saveBtn.textContent = "Saving…";
      setTimeout(() => {
        const e = f.elements;
        store.saveProfile({ ...store.getProfile(), name: e.name.value.trim(), email: e.email.value.trim(), phone: e.phone.value.trim(), course: e.course.value });
        out.textContent = e.name.value.trim();
        if (!photoUrl) root.querySelector("[data-avatar]").textContent = initials(e.name.value);
        document.dispatchEvent(new CustomEvent("profile:changed"));
        saveBtn.disabled = false; saveBtn.textContent = "Save Changes";
        toast("Your profile has been updated.");
      }, 600);
    });
    root.querySelector("[data-reset]").addEventListener("click", () => {
      ctl.reset();
      const p = store.getProfile();
      ["name", "email", "phone", "course"].forEach((k) => { form.elements[k].value = p[k]; });
    });

    // Photo preview only (kept in memory; never uploaded).
    root.querySelector("[data-photo-input]").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) { toast("Please choose an image file.", "error"); return; }
      if (photoUrl) URL.revokeObjectURL(photoUrl);
      photoUrl = URL.createObjectURL(file);
      photoArea.innerHTML = `<img class="avatar-xl" src="${photoUrl}" alt="Your profile photo">`;
      remove.hidden = false;
    });
    remove.addEventListener("click", () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
      photoUrl = null;
      photoArea.innerHTML = `<span class="avatar-xl" data-avatar aria-hidden="true">${esc(initials(form.elements.name.value))}</span>`;
      remove.hidden = true;
    });

    const pwForm = root.querySelector("[data-password-form]");
    const pwCtl = bindForm(pwForm, () => {
      // The values are validated and then discarded; they are never stored or transmitted.
      pwCtl.reset();
      toast("Your password has been updated.");
    });
  },
};
