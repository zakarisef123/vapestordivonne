// Header scroll state + back-to-top visibility
const header = document.getElementById('header');
const totop = document.getElementById('totop');
const onScroll = () => {
  const y = window.scrollY;
  if (header) header.classList.toggle('scrolled', y > 20);
  if (totop) totop.classList.toggle('show', y > 500);
};
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();

// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('mobileMenu');
if (burger && menu) {
  const toggleMenu = (open) => {
    burger.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => toggleMenu(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
}

// Back to top
if (totop) totop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Highlight today's hours (index page only)
const hours = document.getElementById('hours');
if (hours) {
  const today = new Date().getDay(); // 0 = dimanche
  const li = hours.querySelector('li[data-day="'+today+'"]');
  if (li) {
    li.classList.add('today');
    const b = document.createElement('span');
    b.className = 'badge-today';
    b.textContent = "Aujourd'hui";
    li.querySelector('.day').appendChild(b);
  }
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach((el,i) => {
  el.style.transitionDelay = (i % 4 * 60) + 'ms';
  io.observe(el);
});

// ---- Scroll progress bar ----
const progress = document.getElementById('progress');
if (progress) {
  const setProgress = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    progress.style.width = (scrolled * 100) + '%';
  };
  window.addEventListener('scroll', setProgress, {passive:true});
  setProgress();
}

// ---- 3D tilt on hover (pointer) ----
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced && window.matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('.tilt').forEach(el => {
    const strength = 10;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - .5;
      const py = (e.clientY - r.top) / r.height - .5;
      el.style.transform = 'rotateX(' + (-py*strength) + 'deg) rotateY(' + (px*strength) + 'deg)';
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}
