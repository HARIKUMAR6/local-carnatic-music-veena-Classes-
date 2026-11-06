export function initScrollTop() {
  const btn = document.querySelector("[data-scroll-top]");
  if (!btn) return;
  const update = () => btn.setAttribute("data-visible", String(window.scrollY > 600));
  addEventListener("scroll", update, { passive: true });
  update();
  btn.addEventListener("click", () =>
    scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
  );
}
