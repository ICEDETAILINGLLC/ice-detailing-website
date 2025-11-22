// main.js — reveal on scroll, prefill service, parallax, sticky CTA, small accessible helpers
document.addEventListener('DOMContentLoaded', () => {
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

  // Prefill service selection when clicking book links
  document.querySelectorAll('[data-prefill]').forEach(el => {
    el.addEventListener('click', (e) => {
      const pref = el.dataset.prefill || el.getAttribute('data-prefill');
      // store pref in session so contact page can pick it up
      if (pref) sessionStorage.setItem('iced_prefill', pref);
    });
  });

  // When on contact page or a page with a select, set pref selection from sessionStorage
  const prefillTargets = ['#service', '#serviceSelect', '#cf-service', '#cf-service', '#cf-service', '#cf-service', '#serviceSelect'];
  const setPrefIfPresent = () => {
    const pref = sessionStorage.getItem('iced_prefill');
    if (!pref) return;
    const sel = document.querySelector('#service') || document.querySelector('#serviceSelect') || document.querySelector('#cf-service') || document.querySelector('#serviceSelect') || document.querySelector('#cf-service');
    if (!sel) return;
    for (let i = 0; i < sel.options.length; i++) {
      if (sel.options[i].text.toLowerCase().includes(pref.toLowerCase().split(' — ')[0])) {
        sel.selectedIndex = i;
        break;
      }
    }
    // clear stored value so accidental double-prefill doesn't occur
    sessionStorage.removeItem('iced_prefill');
  };
  setPrefIfPresent();

  // simple parallax for hero background (if present)
  const hero = document.querySelector('.hero[data-parallax]');
  if (hero) {
    window.addEventListener('scroll', () => {
      const speed = 0.25;
      const y = Math.round(window.scrollY * speed);
      hero.style.backgroundPosition = `center calc(50% + ${y}px)`;
    }, {passive:true});
  }

  // sticky Book button visibility (makes it subtle but visible)
  const bookSticky = document.getElementById('bookSticky');
  if (bookSticky) {
    const toggle = () => {
      if (window.scrollY > 300) bookSticky.classList.add('visible');
      else bookSticky.classList.remove('visible');
    };
    toggle();
    window.addEventListener('scroll', toggle, {passive:true});
  }

  // Smooth link scrolling for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Tiny accessibility: focus outlines for keyboard users only
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
});
