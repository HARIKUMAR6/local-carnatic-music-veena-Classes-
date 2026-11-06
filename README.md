# NadaVeena – Carnatic Music & Veena Academy (frontend)

HTML5 + Tailwind CSS 3 + vanilla ES modules. No framework, no backend.

## Workflow
- `npm install` (installs Tailwind only, as a dev dependency)
- `npm run build:css` / `npm run watch:css` → writes `dist/css/styles.css`
- Serve the folder over HTTP (ES modules do not load from `file://`): `npm run serve` → http://localhost:5173/styleguide.html

## Structure
- `tailwind.config.js` – scale tokens (type, spacing, radius, shadow, widths, breakpoints, button heights)
- `src/css/tokens.css` – colour tokens, light + dark
- `src/css/input.css` – base styles + reusable component classes
- `src/js/preinit.js` – sets theme/direction before paint
- `src/js/config/site.js` – brand, nav, footer links, storage keys (edit here)
- `src/js/core/` – theme, direction, storage
- `src/js/components/` – header/footer mounting, mobile nav, scroll-to-top, icons
- `assets/` – images, icons, fonts
- `styleguide.html` – developer reference page (remove before launch)
- `_prototype-v0/` – earlier throwaway prototype, not part of this build

## Page template
Copy the `<head>` and the `data-component="header"` / `data-component="footer"` placeholders from `styleguide.html`.

## Photography and containers (global rules)
- Section images are **real photographs only** (`assets/images/photos/`). SVG is allowed only for the logo, favicon, small UI icons and CSS ornaments (`assets/icons/`).
- Every photograph must be recorded in `ATTRIBUTION.md` (internal licence record; there is no public credits section). Instructor frames currently hold temporary instrument photographs, not portraits of the named teachers.
- One public content width: `.container-page` (80rem max, fluid gutter, 16px minimum). Do not invent per-section widths. `.container-wide` is an alias of it; `.container-narrow` is for long-form text only.
- Login and Dashboard use `.auth-shell` / `.app-shell` (see `input.css`), never the public header/footer.

## Header navigation
- Nav items live in `src/js/config/site.js`. An item with `children` renders as a click-only dropdown (`nav-dropdown.js`; desktop menu and mobile submenu share it). Never open dropdowns on hover.
- `[hidden]` always wins over utility display classes (global rule in `input.css`).

## Pages
- `index.html` (Home 1) and `home-2.html` (Home 2) share the header, footer, teacher data (`src/js/data/teachers.js`) and design tokens but use different compositions. Do not copy layouts between them.

## Provisional sample content (replace before launch)
Nothing below is verified academy information.
- **Instructors**: `src/js/data/teachers.js`. Three sample profiles (names, roles, biographies, teaching years). Home 1, Home 2 and the Teachers page all render from this one file. The photographs are instrument photos, not portraits.
- **Contact details**: `src/js/config/contact.js`. Invented Chennai address (Nada Illam, 12/4 Sundaram Street, Mylapore, Chennai, Tamil Nadu 600004, India), phone +91 98765 00000 (cannot belong to a subscriber), email hello@nadaveena.example (reserved domain). Used by the Contact page and the footer. Set `provisional: false` to hide the "sample details" notices. No map or directions link is provided on purpose.
- **Enquiry form** (`contact.html`, `src/js/components/enquiry-form.js`) is UI only: it validates in the browser and shows a confirmation. Nothing is sent or stored; there is no backend.
- Courses copy is deliberately enquiry-based: no fees, timings, durations, age limits or batch availability are stated as policy.

## Login Portal and Student Dashboard (Phase 5)
Independent application shells: neither mounts the public header or footer, and neither links back to the public site.
- `login.html` + `src/js/auth.js` + `src/js/auth/auth-page.js`: Sign In, Create Account and Forgot Password views (URL hash: `#signin`, `#signup`, `#forgot`).
- `dashboard.html` + `src/js/dashboard.js` + `src/js/app/`: shell (`shell.js`: sidebar, topbar, hash router), views (`views/overview|classes|notes|payments|profile.js`), `store.js` (localStorage state), `format.js`, `app-icons.js`.
- Shared: `core/validate.js` (form validation), `components/widgets.js` (password toggle, toast, popovers), `css/app.css` (portal components).
- **No real authentication.** Any well-formed email and a non-empty password open the dashboard; nothing is verified, sent or stored except the non-secret profile name, email and phone (`nv-student`) and practice notes (`nv-notes`) in this browser's localStorage. Passwords are never stored. Social buttons start no OAuth flow. There is no payment gateway and no card, UPI or bank field anywhere.
- **Placeholder content** (replace when a backend exists): `src/js/data/student.js` holds the student, lessons, notes, payments, announcements and notifications. Lesson dates are generated relative to today from one weekly slot. Instructors come from `data/teachers.js`.
- The Login Portal uses its own photographs (`login-signin.jpg`, `login-signup.jpg`). See ATTRIBUTION.md.

## Inner pages (Phase 4)
`about.html`, `courses.html`, `teachers.html`, `contact.html`. Each has its own hero composition built on the shared `.page-hero` / `.page-hero-inner` frame. Headings are never right-aligned, including in RTL (rule in `input.css`, base layer).

## Rules
Use logical utilities (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `text-start`) and `rtl:` variants, never `ml-`/`mr-`/`text-left`/`text-right`, so RTL works.

## Rules added in the global corrections pass
- **No photograph may appear twice anywhere on the site** (the same picture under another filename counts). Home 1 and Home 2 instructor frames use `imageHome1` / `imageHome2` in `data/teachers.js`; the Teachers page uses `image`. Re-run a duplicate audit whenever an image is added.
- **Header**: `site.js` nav includes **Dashboard**; the header CTA is **Login** (`login.html`). Both are also in the mobile menu.
- **Final CTAs** (Home 1, About, Contact) are a floating `.cta-card` on a light band; the footer is a deeper maroon with a gold top rule.
- **Contact map**: `contact.html#map`. The embed and Get Directions are both built from `addressQuery()` in `config/contact.js`, the same string shown in Contact Information. The current address is invented, so the map service matches it to its best guess, not to a verified building. Replace the address with a real one and the map follows automatically.

## Final QA pass: shared controls
- **Direction control**: one definition, `src/js/components/toggles.js` (`dirToggle`), used by the public header, the full-screen menu, the Login Portal and the Dashboard. Its visible label is always "Direction"; never show "RTL" or "LTR" as button text.
- **Full-screen menu** (< 1024px): `#mobile-nav` is fixed to the viewport (outside `<header>`), scrolls internally, locks page scroll (`html.menu-open`), closes on Escape / link / close button, and returns focus to the opener. Theme and Direction controls live inside it on small screens.
- **Footer social icons**: `site.social` in `config/site.js` (Facebook, Instagram, YouTube, WhatsApp). **No profile URLs have been supplied, so all four are empty** and render as inactive buttons. Add a `url` to turn an icon into a real link.
- **Login Portal**: the logo and brand name together are one link to `index.html` (Home 1).
- **CTA groups** (`.btn-group`): equal width and height inside each group; stacked, centred and capped at 24rem below 640px.
