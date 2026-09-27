// Shared EN/TR toggle for legal docs. Defaults to the browser's language,
// remembers the visitor's choice locally, and falls back to English.
(function () {
  function apply(lang) {
    document.querySelectorAll(".lang-block").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang") !== lang;
    });
    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
    document.documentElement.setAttribute("lang", lang);
    try {
      localStorage.setItem("cck-doc-lang", lang);
    } catch (e) {
      /* private browsing / blocked storage - just skip remembering it */
    }
  }

  function initialLang() {
    try {
      var saved = localStorage.getItem("cck-doc-lang");
      if (saved === "en" || saved === "tr") return saved;
    } catch (e) {
      /* ignore */
    }
    return navigator.language && navigator.language.toLowerCase().indexOf("tr") === 0 ? "tr" : "en";
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
