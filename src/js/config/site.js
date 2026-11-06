/** Central site configuration: edit navigation / brand / storage keys here only. */
export const site = {
  name: "Nada",
  nameAccent: "Veena",
  tagline: "Carnatic music and veena, taught in the guru–shishya tradition.",
  storage: { theme: "nv-theme", dir: "nv-dir" },
  nav: [
    {
      label: "Home",
      children: [
        { label: "Home 1", href: "index.html" },
        { label: "Home 2", href: "home-2.html" },
      ],
    },
    { label: "About", href: "about.html" },
    { label: "Courses", href: "courses.html" },
    { label: "Teachers", href: "teachers.html" },
    { label: "Contact", href: "contact.html" },
    { label: "Dashboard", href: "dashboard.html" },
  ],
  /** Footer social links. Set `url` to the academy's real profile. NO profile URLs have been supplied, so all four are
   *  intentionally empty: the icons render as inactive buttons (not links) until a destination is configured here. */
  social: [
    { id: "facebook", label: "Facebook", url: "" },
    { id: "instagram", label: "Instagram", url: "" },
    { id: "youtube", label: "YouTube", url: "" },
    { id: "whatsapp", label: "WhatsApp", url: "" },
  ],
  cta: { label: "Login", href: "login.html" },
  footerAcademy: [
    { label: "About", href: "about.html" },
    { label: "Teachers", href: "teachers.html" },
    { label: "Contact", href: "contact.html" },
  ],
  footerLearn: [
    { label: "Courses", href: "courses.html" },
    { label: "Book a Trial", href: "contact.html" },
  ],
};
