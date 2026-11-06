import { site } from "../config/site.js";
import { icons } from "../components/icons.js";
import { appIcons } from "../app/app-icons.js";
import { themeToggle, dirToggle } from "../components/toggles.js";
import { bindForm, setLoading } from "../core/validate.js";
import { storage } from "../core/storage.js";

const DASHBOARD = "dashboard.html";
const PROFILE_KEY = "nv-student";
const VIEW_TITLES = { signin: "Sign In", signup: "Create Account", forgot: "Forgot Password" };
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/** Chrome shared by every view: brand mark, theme/direction toggles, icons, social buttons. */
function mountChrome() {
  $("[data-brand]").innerHTML = `<a class="brand-link !text-on-brand brand-home" href="index.html" aria-label="${site.name}${site.nameAccent} home">${icons.logo}<span>${site.name}<em class="!text-gold-light">${site.nameAccent}</em></span></a>`;
  $("[data-auth-tools]").innerHTML = `
    ${themeToggle}
    ${dirToggle}`;
  $$("[data-icon]").forEach((el) => { el.innerHTML = appIcons[el.dataset.icon]; });
  $$("[data-social]").forEach((host) => {
    host.innerHTML = `
      <button type="button" class="btn-social" data-social-btn="Google">${appIcons.google}<span>Google</span></button>
      <button type="button" class="btn-social" data-social-btn="Apple">${appIcons.apple}<span>Apple</span></button>`;
  });
}

/** Views are addressed by the URL hash so Back/Forward and links like login.html#signup work. */
function initViews() {
  let first = true;
  const show = () => {
    const name = VIEW_TITLES[location.hash.slice(1)] ? location.hash.slice(1) : "signin";
    $$("[data-view]").forEach((v) => { v.hidden = v.dataset.view !== name; });
    $$("[data-media]").forEach((m) => m.setAttribute("data-active", String(m.dataset.media === (name === "signin" ? "signin" : "signup"))));
    document.title = `${VIEW_TITLES[name]} | NadaVeena Student Portal`;
    // Always return a view to its form state when it is opened.
    $("[data-signup-form]").hidden = false; $("[data-signup-success]").hidden = true;
    $("[data-forgot-form]").hidden = false; $("[data-forgot-success]").hidden = true;
    if (!first) { $(`[data-view="${name}"] h1`).focus({ preventScroll: true }); scrollTo(0, 0); }
    first = false;
  };
  addEventListener("hashchange", show);
  show();
}

/** Social buttons give press + loading feedback only. No OAuth flow is started and nothing leaves the page. */
function initSocial() {
  $$("[data-social-btn]").forEach((btn) => btn.addEventListener("click", () => {
    $$("[data-social-btn]").forEach((b) => { b.disabled = true; });
    setLoading(btn, true, `Continuing with ${btn.dataset.socialBtn}…`);
    setTimeout(() => { location.href = DASHBOARD; }, 900);
  }));
}

/** Password strength: 4 segments. Purely visual guidance. */
function initStrength() {
  const input = $("#su-password"), meter = $("[data-strength]");
  const score = (v) => [v.length >= 8, /[a-z]/.test(v) && /[A-Z]/.test(v), /\d/.test(v), /[^A-Za-z0-9]/.test(v) || v.length >= 12].filter(Boolean).length;
  const words = ["", "Weak", "Fair", "Good", "Strong"];
  input.addEventListener("input", () => {
    const n = input.value ? score(input.value) : 0;
    meter.dataset.level = String(n);
    meter.querySelector("em").textContent = n ? `Password strength: ${words[n]}` : "Password strength";
  });
}

function initForms() {
  const delay = (fn) => setTimeout(fn, 900);

  const signin = $('[data-form="signin"]');
  const signinBtn = $('button[type="submit"]', signin);
  bindForm(signin, () => {
    setLoading(signinBtn, true, "Signing in…");
    delay(() => { location.href = DASHBOARD; });
  });

  const signup = $('[data-form="signup"]');
  const signupBtn = $('button[type="submit"]', signup);
  const signupCtl = bindForm(signup, (f) => {
    setLoading(signupBtn, true, "Creating account…");
    delay(() => {
      // Only the non-secret profile details are kept, so the dashboard can greet the student by name. Passwords are never read or stored.
      storage.set(PROFILE_KEY, JSON.stringify({ name: f.elements.name.value.trim(), email: f.elements.email.value.trim(), phone: f.elements.phone.value.trim() }));
      $("[data-success-name]").textContent = f.elements.name.value.trim().split(/\s+/)[0];
      setLoading(signupBtn, false);
      signupCtl.reset();
      $("[data-strength]").dataset.level = "0";
      $("[data-signup-form]").hidden = true;
      const ok = $("[data-signup-success]"); ok.hidden = false; ok.focus();
    });
  });

  const forgot = $('[data-form="forgot"]');
  const forgotBtn = $('button[type="submit"]', forgot);
  const forgotCtl = bindForm(forgot, (f) => {
    setLoading(forgotBtn, true, "Sending…");
    delay(() => {
      $("[data-success-email]").textContent = f.elements.email.value.trim();
      setLoading(forgotBtn, false);
      forgotCtl.reset();
      $("[data-forgot-form]").hidden = true;
      const ok = $("[data-forgot-success]"); ok.hidden = false; ok.focus();
    });
  });
}

export function initAuth() {
  mountChrome();
  initViews();
  initSocial();
  initStrength();
  initForms();
}
