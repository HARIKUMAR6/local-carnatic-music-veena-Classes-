import { mountHeader, mountFooter } from "./components/layout.js";
import { initTheme } from "./core/theme.js";
import { initDirection } from "./core/direction.js";
import { initDropdowns } from "./components/nav-dropdown.js";
import { initMobileNav } from "./components/mobile-nav.js";
import { initScrollTop } from "./components/scroll-top.js";
import { initTabs } from "./components/tabs.js";
import { initQuoteSliders } from "./components/quote-slider.js";
import { renderTeachers, renderFacultyStrip } from "./sections/teachers.js";
import { renderContact } from "./sections/contact-info.js";
import { initEnquiryForm } from "./components/enquiry-form.js";

// Order matters: mount shared components first, then wire behaviour to them.
mountHeader();
mountFooter();
initTheme();
initDirection();
initDropdowns();
initMobileNav();
initScrollTop();
renderTeachers();
renderFacultyStrip();
renderContact();
initEnquiryForm();
initTabs();
initQuoteSliders();
