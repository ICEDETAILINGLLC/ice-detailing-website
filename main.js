// main.js — reveal on scroll, prefill, parallax, sticky CTA
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

  // Prefill booking service when clicking book links (works across pages)
  document.querySelectorAll('[data-prefill]').forEach(el => {
    el.addEventListener('click', (e) => {
      const pref = el.dataset.prefill;
      try {
        // Save to session storage so contact page can pick it up
        if (pref) sessionStorage.setItem('prefillService', pref);
      } catch (err) { /* ignore storage errors */ }
    });
  });

  // When contact page loads, apply prefill if present
  const serviceSelect = document.querySelector('#serviceSelect') || document.querySelector('#service');
  if (serviceSelect && sessionStorage.getItem('prefillService')) {
    const pref = sessionStorage.getItem('prefillService');
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].text.toLowerCase().includes(pref.toLowerCase().split(' — ')[0])) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
    sessionStorage.removeItem('prefillService');
  }

  // Parallax hero (subtle)
  const hero = document.querySelector('.hero[data-parallax]');
  if (hero) {
    window.addEventListener('scroll', () => {
      const speed = 0.22;
      const y = window.scrollY * speed;
      hero.style.backgroundPosition = `center calc(50% + ${y}px)`;
    }, {passive:true});
  }

  // sticky Book button visibility
  const bookSticky = document.getElementById('bookSticky');
  if (bookSticky) {
    function updateBookVisible(){
      if (window.scrollY > 420) bookSticky.classList.add('visible');
      else bookSticky.classList.remove('visible');
    }
    updateBookVisible();
    window.addEventListener('scroll', updateBookVisible, {passive:true});
  }

  // Before/after placeholders: slider.js handles behavior
});
