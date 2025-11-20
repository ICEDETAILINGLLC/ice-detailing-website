// animations.js - reveal on scroll, parallax, prefill interactions, sticky book CTA
document.addEventListener('DOMContentLoaded', () => {
  // Inject year
  ['year','yearSvc','yearContact','yearReviews'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = new Date().getFullYear();
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => io.observe(r));

  // Parallax hero
  const hero = document.querySelector('.hero[data-parallax]');
  if (hero) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY * 0.25;
      hero.style.backgroundPosition = `center calc(50% + ${y}px)`;
    }, { passive: true });
  }

  // Prefill service when clicking Book links or service cards
  document.querySelectorAll('[data-prefill]').forEach(el => {
    el.addEventListener('click', (e) => {
      const pref = el.getAttribute('data-prefill') || el.dataset.prefill;
      const sel = document.querySelector('#service') || document.querySelector('#serviceSelect') || document.querySelector('select[name="service"]');
      if (sel && pref) {
        for (let i = 0; i < sel.options.length; i++) {
          if (sel.options[i].text.includes(pref.split(' — ')[0])) {
            sel.selectedIndex = i;
            break;
          }
        }
      }
    });
  });

  // Card keyboard support
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') card.click();
    });
  });

  // Sticky Book button show/hide when scrolling
  const bookSticky = document.getElementById('bookSticky');
  if (bookSticky) {
    const heroBottom = document.querySelector('#home').getBoundingClientRect().bottom;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 250) bookSticky.classList.add('visible'); else bookSticky.classList.remove('visible');
    }, { passive: true });
  }
});
