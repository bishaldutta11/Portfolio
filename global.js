(function () {
  const THEME_KEY = "theme";
  const root = document.documentElement;
  const savedTheme = localStorage.getItem(THEME_KEY);
  const initialTheme = savedTheme === "dark" ? "dark" : "light";

  root.setAttribute("data-theme", initialTheme);

  function syncTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (document.body) {
      document.body.setAttribute("data-theme", theme);
    }
  }

  syncTheme(initialTheme);

  document.addEventListener("DOMContentLoaded", () => {
    syncTheme(initialTheme);

    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const currentTheme =
          document.body?.getAttribute("data-theme") === "dark" ? "dark" : "light";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";

        syncTheme(nextTheme);
        localStorage.setItem(THEME_KEY, nextTheme);
      });
    }

    /* SMOOTH SCROLL FOR BOTTOM NAVIGATION ITEMS */
    document.querySelectorAll(".bottom-nav a").forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 60,
              behavior: "smooth",
            });
          }
        }
      });
    });
  });
})();
