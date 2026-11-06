import { icons } from "./icons.js";

/** The theme and direction controls, defined once for the public header, the full-screen menu, the Login Portal and the Dashboard.
 *  The direction control shows ONLY the active direction as text ("LTR" or "RTL"); core/direction.js keeps the text, aria-pressed and
 *  aria-label in sync. No icon and no other wording. */
export const themeToggle = `<button type="button" class="icon-btn" data-theme-toggle aria-pressed="false" aria-label="Toggle colour theme">${icons.sun}${icons.moon}</button>`;
export const dirToggle = `<button type="button" class="dir-btn" data-dir-toggle aria-pressed="false" aria-label="LTR: switch to RTL layout">LTR</button>`;
