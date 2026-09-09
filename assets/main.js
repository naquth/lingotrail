// Naquth portfolio — interaction layer (vanilla JS, no framework)

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* ---------- theme toggle (light default, dark optional) ---------- */
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const THEME_KEY = "naquth-theme";

  function applyTheme(theme) {
    if (theme === "dark") {
      body.classList.add("theme-dark");
      themeToggle?.setAttribute("aria-pressed", "false");
      if (themeToggle) themeToggle.innerHTML = MOON_ICON;
    } else {
      body.classList.remove("theme-dark");
      themeToggle?.setAttribute("aria-pressed", "true");
      if (themeToggle) themeToggle.innerHTML = SUN_ICON;
    }
  }

  const SUN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`;
  const MOON_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;

  let savedTheme = "light";
  try { savedTheme = localStorage.getItem(THEME_KEY) || "light"; } catch (e) { /* storage unavailable */ }
  applyTheme(savedTheme);

  themeToggle?.addEventListener("click", () => {
    const next = body.classList.contains("theme-dark") ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
  });

  /* ---------- mobile nav toggle ---------- */
  const menuBtn = document.querySelector("[data-menu-toggle]");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });
    document.querySelectorAll(".navbar-mobile-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        body.classList.remove("nav-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- floating navbar on scroll ---------- */
  const navbarShell = document.querySelector("[data-navbar-shell]");
  function updateNavbarFloat() {
    if (!navbarShell) return;
    if (window.scrollY > 24) {
      navbarShell.classList.add("is-floating");
    } else {
      navbarShell.classList.remove("is-floating");
    }
  }
  updateNavbarFloat();
  window.addEventListener("scroll", updateNavbarFloat, { passive: true });

  /* ---------- hero char split animation ---------- */
  document.querySelectorAll("[data-split-chars]").forEach((el) => {
    const text = el.textContent;
    el.textContent = "";
    [...text].forEach((ch, i) => {
      const span = document.createElement("span");
      span.className = "hero-char";
      span.style.animationDelay = `${i * 42}ms`;
      span.textContent = ch === " " ? "\u00A0" : ch;
      el.appendChild(span);
    });
  });

  /* ---------- hero background cells (decorative grid squares) ---------- */
  const cellsContainer = document.querySelector("[data-hero-cells]");
  if (cellsContainer) {
    const cols = Math.ceil(window.innerWidth / 64) + 2;
    const rows = Math.ceil(window.innerHeight / 64) + 2;
    const count = 24;
    const usedCells = new Set();
    const palette = [
      "rgba(153, 148, 255, 0.14)",
      "rgba(228, 227, 255, 0.24)",
      "rgba(153, 148, 255, 0.16)",
      "rgba(58, 57, 82, 0.045)",
      "rgba(228, 227, 255, 0.2)",
    ];
    for (let i = 0; i < count; i++) {
      let col, row, key;
      let attempts = 0;
      do {
        col = 1 + Math.floor(Math.random() * cols);
        row = 1 + Math.floor(Math.random() * rows);
        key = `${row}-${col}`;
        attempts++;
      } while (usedCells.has(key) && attempts < 30);
      usedCells.add(key);
      const span = document.createElement("span");
      span.className = "hero-cell";
      span.style.gridArea = `${row} / ${col}`;
      span.style.background = palette[i % palette.length];
      span.style.animationDelay = `${i * 58}ms`;
      cellsContainer.appendChild(span);
    }
  }

  /* ---------- reveal-on-scroll ---------- */
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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
});
