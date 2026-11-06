/** Inline SVG icons (stroke = currentColor). */
const s = (body, extra = "") =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${body}</svg>`;

export const icons = {
  sun: s('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>', 'class="icon-sun"'),
  moon: s('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>', 'class="icon-moon"'),
  pin: s('<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
  phone: s('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
  mail: s('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  chevron: s('<path d="m6 9 6 6 6-6"/>', 'class="chev"'),
  chevL: s('<path d="m15 6-6 6 6 6"/>', 'class="flip-rtl"'),
  chevR: s('<path d="m9 6 6 6-6 6"/>', 'class="flip-rtl"'),
  menu: s('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: s('<path d="M6 6l12 12M18 6 6 18"/>'),
  arrowUp: s('<path d="M12 19V5M5 12l7-7 7 7"/>'),
  arrow: s('<path d="M5 12h14M13 6l6 6-6 6"/>', 'class="flip-rtl"'),
  /* Social platforms (simple, recognisable glyphs; stroke/fill = currentColor) */
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8h2.7l.5-3.2h-3.2V7.9c0-.9.4-1.6 1.7-1.6h1.6V3.4c-.3 0-1.3-.2-2.4-.2-2.5 0-4 1.5-4 4.2v2.4H7.6V13h2.8v8z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9.2 5 2.8-5 2.8z" fill="currentColor"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.9 7L4 20l1.5-4A8 8 0 1 1 20 11.5z"/><path d="M9.2 8.4c-.2.9.3 2.3 1.6 3.6 1.3 1.3 2.7 1.8 3.6 1.6l.9-1-1.8-1-.7.6c-.7-.3-1.6-1.2-1.9-1.9l.6-.7-1-1.8z" fill="currentColor" stroke="none"/></svg>',
  /* Brand mark: stylised veena (gourd, neck, scroll) */
  logo: `<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="13" cy="28" r="8"/><circle cx="13" cy="28" r="2.5" fill="currentColor" stroke="none"/><path d="M18.5 22.5 33 8"/><path d="M33 8c2-2 4-1 4 1s-3 3-4 1"/><circle cx="31" cy="12" r="1.2" fill="currentColor" stroke="none"/></svg>`,
};
