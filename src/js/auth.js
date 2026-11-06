import { initTheme } from "./core/theme.js";
import { initDirection } from "./core/direction.js";
import { initPasswordToggles } from "./components/widgets.js";
import { initAuth } from "./auth/auth-page.js";

// The Login Portal is its own application shell: no public header/footer is mounted here.
initPasswordToggles();
initAuth(); // mounts the toggle buttons, so it must run before the theme/direction state is applied to them
initTheme();
initDirection();
