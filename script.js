// ── Nav scroll effect ──────────────────────────
const navbar = document.querySelector('nav');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── Set active nav link ────────────────────────
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── Mobile menu ────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ── Scroll reveal ──────────────────────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// ── Project image hover reveal ─────────────────
const imgReveal = document.getElementById('projectImgReveal');
if (imgReveal) {
  const imgEl = imgReveal.querySelector('img');
  document.querySelectorAll('.project-link[data-img]').forEach(link => {
    link.addEventListener('mouseenter', () => {
      if (window.innerWidth > 900) {
        imgEl.src = link.dataset.img;
        imgReveal.style.opacity = '1';
      }
    });
    link.addEventListener('mousemove', e => {
      if (window.innerWidth > 900) {
        imgReveal.style.left = (e.clientX + 24) + 'px';
        imgReveal.style.top  = (e.clientY - 100) + 'px';
      }
    });
    link.addEventListener('mouseleave', () => {
      imgReveal.style.opacity = '0';
    });
  });
}

// ── Page-exit transition for internal links ────
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('http')) return;
  link.addEventListener('click', e => {
    e.preventDefault();
    const wrapper = document.querySelector('.page-wrapper');
    if (wrapper) {
      wrapper.style.transition = 'opacity 0.3s ease';
      wrapper.style.opacity = '0';
      setTimeout(() => { window.location.href = href; }, 300);
    } else {
      window.location.href = href;
    }
  });
});
