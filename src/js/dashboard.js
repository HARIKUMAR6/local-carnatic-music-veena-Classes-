import { initTheme } from "./core/theme.js";
import { initDirection } from "./core/direction.js";
import { initPasswordToggles, initPopovers } from "./components/widgets.js";
import { mountShell, initRouter } from "./app/shell.js";

// The Student Dashboard is its own application shell: no public header, footer or navigation is mounted here.
mountShell();
initTheme();
initDirection();
initPasswordToggles();
initPopovers();
initRouter();
