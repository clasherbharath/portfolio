/* =============================================
   BHARATH K — PORTFOLIO JS
   ============================================= */

'use strict';

// ---- Theme Toggle ----
const THEME_KEY = 'bk-theme';
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
  themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

const savedTheme = localStorage.getItem(THEME_KEY) ||
  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
setTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// ---- Navbar scroll effect ----
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ---- Mobile nav ----
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ---- Smooth active nav highlighting ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

function updateActiveNav() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    if (scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
      });
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// ---- Intersection Observer for animations ----
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .timeline-item, .stagger-children').forEach(el => {
  fadeObserver.observe(el);
});

// ---- Typed text effect for hero ----
const typedEl = document.getElementById('typed-role');
const roles = ['PCB Designer', 'Embedded Systems Enthusiast', 'Verilog Developer', 'ECE Engineer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => { isDeleting = true; }, 1800);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(typeEffect, speed);
}
setTimeout(typeEffect, 800);

// ---- Cursor blink for typed effect ----
// Handled via CSS on .cursor element

// ---- Certificate Modal ----
const modalOverlay = document.getElementById('certModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');

function openModal(src, title) {
  modalImg.src = src;
  modalTitle.textContent = title;
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    openModal(card.dataset.src, card.dataset.title);
  });
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ---- Contact form (mailto fallback) ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.open(`mailto:amkesaven525@gmail.com?subject=${subject}&body=${body}`);
  });
}

// ---- Parallax on hero aurora blobs ----
document.addEventListener('mousemove', (e) => {
  if (window.innerWidth < 768) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.setProperty('--mx', `${x}px`);
    hero.style.setProperty('--my', `${y}px`);
  }
});

// ---- Number counter animation ----
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target') || el.textContent);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => {
  counterObserver.observe(el);
});
