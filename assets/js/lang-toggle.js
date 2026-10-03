// Shared EN/TR toggle for the home page and legal docs. Priority: a `?lang=` param (set by the app's own
// in-app link, so it opens in whatever language the app is currently running in) beats a
// previously-remembered manual choice, which beats the browser language (Turkish or English).
(function () {
  function apply(lang) {
    document.querySelectorAll(".lang-block").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang") !== lang;
    });
    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
    document.documentElement.setAttribute("lang", lang);
    // Pages that set data-title-en / data-title-tr on <html> get a matching <title> per language.
    var title = document.documentElement.getAttribute("data-title-" + lang);
    if (title) document.title = title;
    try {
      localStorage.setItem("cck-doc-lang", lang);
    } catch (e) {
      /* private browsing / blocked storage - just skip remembering it */
    }
  }

  function initialLang() {
    try {
      var fromUrl = new URLSearchParams(window.location.search).get("lang");
      if (fromUrl === "en" || fromUrl === "tr") return fromUrl;
    } catch (e) {
      /* ignore */
    }
    try {
      var saved = localStorage.getItem("cck-doc-lang");
      if (saved === "en" || saved === "tr") return saved;
    } catch (e) {
      /* ignore */
    }
    // First visit with nothing chosen: follow the browser language (Turkish -> tr, else en).
    return /^tr/i.test(navigator.language || "") ? "tr" : "en";
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        apply(btn.getAttribute("data-lang"));
      });
    });
    apply(initialLang());
  });
})();
