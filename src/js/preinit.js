/* Classic (non-module) script loaded in <head> BEFORE paint.
   Applies stored theme + direction to <html> to avoid a flash.
   Keep keys in sync with src/js/config/site.js. */
(function () {
  var root = document.documentElement;
  var get = function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } };
  var theme = get("nv-theme");
  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  var dir = get("nv-dir") === "rtl" ? "rtl" : "ltr";
  root.setAttribute("data-theme", theme);
  root.setAttribute("dir", dir);
})();
