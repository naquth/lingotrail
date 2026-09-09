// Naquth portfolio — interaction layer (vanilla JS, no framework)

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* ---------- theme toggle (dark default) ---------- */
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const THEME_KEY = "naquth-theme";

  const SUN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`;
  const MOON_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;

  function applyTheme(theme) {
    if (theme === "light") {
      body.classList.add("theme-light");
      if (themeToggle) themeToggle.innerHTML = MOON_ICON;
    } else {
      body.classList.remove("theme-light");
      if (themeToggle) themeToggle.innerHTML = SUN_ICON;
    }
  }

  let saved = "dark";
  try { saved = localStorage.getItem(THEME_KEY) || "dark"; } catch (e) { /* ignore */ }
  applyTheme(saved);

  themeToggle?.addEventListener("click", () => {
    const next = body.classList.contains("theme-light") ? "dark" : "light";
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
  });

  /* ---------- mobile nav ---------- */
  const menuBtn = document.querySelector("[data-menu-toggle]");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const open = body.classList.toggle("nav-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll(".mobile-nav a").forEach((a) => {
      a.addEventListener("click", () => {
        body.classList.remove("nav-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- reveal on scroll (sections only, not per-row scatter) ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
});
