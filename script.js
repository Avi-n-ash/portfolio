/* ===================================================
   PORTFOLIO SCRIPT – AVINASH KUMAR TRIPATHY
   Features:
   - Typing effect in hero
   - Navbar scroll + active link highlight
   - Scroll reveal (Intersection Observer)
   - Smooth scroll
   - Back to top button
   - Hamburger menu
   - Contact form feedback
   =================================================== */

'use strict';

/* ---- Typing Effect ---- */
(function initTyping() {
  const phrases = [
    'Full-Stack Developer',
    'Java & Spring Boot Expert',
    'React JS Enthusiast',
    'Microservices Architect',
    'Gen AI Practitioner',
  ];
  const el = document.getElementById('typing-text');
  if (!el) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 800);
})();


/* ---- Navbar: scroll class + active link ---- */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // Scrolled class
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


/* ---- Hamburger Menu ---- */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
})();


/* ---- Smooth Scroll ---- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 70; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ---- Scroll Reveal (Intersection Observer) ---- */
(function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Stagger children of the same parent
          const siblings = entry.target.parentElement.querySelectorAll('.reveal');
          let delay = 0;
          siblings.forEach((sib, i) => {
            if (sib === entry.target) delay = i * 80;
          });
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => observer.observe(el));
})();


/* ---- Back To Top Button ---- */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ---- Contact Form ---- */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      showFormMessage('Please fill in all required fields.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate send (no backend)
    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    setTimeout(() => {
      showFormMessage(`Thanks ${name}! Your message has been received. I'll get back to you soon.`, 'success');
      form.reset();
      btn.innerHTML = originalHTML;
      btn.disabled = false;
    }, 1500);
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFormMessage(text, type) {
    const existing = form.querySelector('.form-msg');
    if (existing) existing.remove();

    const msg = document.createElement('div');
    msg.className = 'form-msg';
    msg.textContent = text;
    msg.style.cssText = `
      padding: 0.85rem 1.1rem;
      border-radius: 10px;
      font-size: 0.88rem;
      font-weight: 500;
      margin-top: 0.5rem;
      background: ${type === 'success' ? 'rgba(0,184,148,0.12)' : 'rgba(214,63,49,0.1)'};
      color: ${type === 'success' ? '#00b894' : '#d63031'};
      border: 1px solid ${type === 'success' ? 'rgba(0,184,148,0.3)' : 'rgba(214,63,49,0.25)'};
    `;
    form.appendChild(msg);

    setTimeout(() => {
      if (msg.parentNode) msg.remove();
    }, 5000);
  }
})();


/* ---- Skill tag hover ripple effect ---- */
(function initTagRipple() {
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = tag.getBoundingClientRect();
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.4);
        pointer-events: none;
        width: 10px; height: 10px;
        top: ${e.clientY - rect.top - 5}px;
        left: ${e.clientX - rect.left - 5}px;
        animation: rippleAnim 0.5s ease-out forwards;
      `;
      tag.style.position = 'relative';
      tag.style.overflow = 'hidden';
      tag.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  // Inject ripple keyframe once
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes rippleAnim {
        to { transform: scale(20); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
})();


/* ---- Parallax on hero blobs (subtle) ---- */
(function initParallax() {
  const blobs = document.querySelectorAll('.blob');
  if (!blobs.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        blobs[0] && (blobs[0].style.transform = `translate(0, ${y * 0.15}px)`);
        blobs[1] && (blobs[1].style.transform = `translate(0, ${-y * 0.1}px)`);
        blobs[2] && (blobs[2].style.transform = `translate(0, ${y * 0.05}px)`);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ---- Animated Counters ---- */
(function initCounters() {
  const stats = document.querySelectorAll('.stat[data-count]');
  if (!stats.length) return;

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix !== undefined ? el.dataset.suffix : '+';
    const countEl = el.querySelector('.count-up');
    if (!countEl) return;

    const duration = 1600;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      countEl.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  stats.forEach(stat => observer.observe(stat));
})();


/* ---- Proficiency Bar Fill ---- */
(function initProficiencyBars() {
  const bars = document.querySelectorAll('.proficiency-fill[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const w = entry.target.dataset.width;
        setTimeout(() => {
          entry.target.style.width = w + '%';
        }, 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();
