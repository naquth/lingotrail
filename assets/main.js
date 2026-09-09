(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('.mobile-nav');
  const saved = localStorage.getItem('naquth-theme');
  if (saved === 'light') root.classList.remove('dark'), root.classList.add('light');
  themeButton?.addEventListener('click', () => {
    const light = root.classList.toggle('light');
    root.classList.toggle('dark', !light);
    localStorage.setItem('naquth-theme', light ? 'light' : 'dark');
  });
  menuButton?.addEventListener('click', () => {
    const open = mobileNav?.classList.toggle('open');
    document.body.classList.toggle('menu-open', !!open);
    menuButton.setAttribute('aria-expanded', String(!!open));
  });
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileNav.classList.remove('open'); document.body.classList.remove('menu-open'); menuButton?.setAttribute('aria-expanded','false');
  }));
  const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
