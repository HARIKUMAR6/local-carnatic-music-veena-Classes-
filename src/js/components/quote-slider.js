/** Testimonial slider: [data-quotes] with [data-quote] items, [data-quote-prev|next] buttons, [data-quote-count]. No autoplay. */
export function initQuoteSliders() {
  document.querySelectorAll("[data-quotes]").forEach((root) => {
    const items = [...root.querySelectorAll("[data-quote]")];
    const count = root.querySelector("[data-quote-count]");
    let i = 0;
    const show = (n) => {
      i = (n + items.length) % items.length;
      items.forEach((el, k) => (el.hidden = k !== i));
      if (count) count.textContent = `${i + 1} / ${items.length}`;
    };
    root.querySelector("[data-quote-prev]")?.addEventListener("click", () => show(i - 1));
    root.querySelector("[data-quote-next]")?.addEventListener("click", () => show(i + 1));
    show(0);
  });
}
