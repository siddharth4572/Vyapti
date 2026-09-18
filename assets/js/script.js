/*
Theme Name: FORMA - Architecture & Design Studio HTML Template
Description: Main JavaScript file
Author: K29 Solutions / FORMA - Architecture
Version: 1.0.0
*/

"use strict";

/* =====================
   PRELOADER
===================== */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('fade-out');
    }, 2000);
});

/* =====================
   CUSTOM CURSOR
===================== */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0,
    mouseY = 0,
    ringX = 0,
    ringY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .service-card, .portfolio-item, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* =====================
   NAVBAR SCROLL
===================== */
const nav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    // Active link
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 200) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });

    // Scroll to top
    const btn = document.getElementById('scrollTop');
    if (window.scrollY > 500) btn.classList.add('show');
    else btn.classList.remove('show');
});

/* =====================
   AOS INIT
===================== */
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80
});

/* =====================
   SWIPER (FIXED OVERLAP)
===================== */
new Swiper('.testimonialSwiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    speed: 800,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    }, // ensures smooth fade without overlap
    autoHeight: true, // dynamically adjust container height to prevent stacking
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
});

/* =====================
   COUNTER ANIMATION
===================== */
function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            animateCounter(e.target);
            counterObserver.unobserve(e.target);
        }
    });
}, {
    threshold: 0.5
});
document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

/* =====================
   PORTFOLIO FILTER
===================== */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        document.querySelectorAll('.portfolio-item').forEach(item => {
            if (filter === 'all' || item.dataset.cat === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeIn 0.4s ease';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

/* =====================
   LIGHTBOX
===================== */
function openLightbox(src) {
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) closeLightbox();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });
});
/* =====================
   FORM VALIDATION
===================== */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return; // prevents error

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!this.checkValidity()) {
            this.classList.add('was-validated');
            return;
        }

        const btn = this.querySelector('button[type=submit]');
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>Sending…</span>';

        setTimeout(() => {
            btn.innerHTML = orig;
            document.getElementById('formSuccess').style.display = 'block';
            this.reset();
            this.classList.remove('was-validated');
            setTimeout(() =>
                document.getElementById('formSuccess').style.display = 'none',
                5000
            );
        }, 1500);
    });
});

/* =====================
   SMOOTH NAV CLICKS
===================== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu
            const menu = document.getElementById('navMenu');
            if (menu.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
        }
    });
});

/* =====================
   ACCORDION TOGGLE FUNCTION
===================== */
function toggleAccordion(button) {
    const item = button.closest('.accordion-item-custom'); // find the container
    if (!item) return;
    const content = item.querySelector('.accordion-collapse-custom'); // find the content
    const expanded = button.getAttribute('aria-expanded') === 'true' ? false : true;
    button.setAttribute('aria-expanded', expanded);
    content.style.display = expanded ? 'block' : 'none';
}