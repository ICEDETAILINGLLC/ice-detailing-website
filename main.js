// main.js — small, safe interactions: reveal on scroll, prefill service, parallax, sticky CTA
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
      // wait a tiny moment then set select value if present on page
      setTimeout(() => {
        const sel = document.querySelector('#service') || document.querySelector('#serviceSelect') || document.querySelector('#cf-service');
        if (!sel || !pref) return;
        for (let i = 0; i < sel.options.length; i++) {
          if (sel.options[i].text.toLowerCase().includes(pref.toLowerCase().split(' — ')[0])) {
            sel.selectedIndex = i;
            break;
          }
        }
        // smooth scroll to contact
        const contact = document.getElementById('contact');
        if (contact) contact.scrollIntoView({behavior:'smooth', block:'start'});
      }, 120);
    });
  });

  // simple parallax for hero background
  const hero = document.querySelector('.hero[data-parallax]');
  if (hero) {
    window.addEventListener('scroll', () => {
      const speed = 0.25;
      const y = window.scrollY * speed;
      hero.style.backgroundPosition = `center calc(50% + ${y}px)`;
    }, {passive:true});
  }

  // sticky Book button visibility
  const bookSticky = document.getElementById('bookSticky');
  if (bookSticky) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) bookSticky.classList.add('visible');
      else bookSticky.classList.remove('visible');
    }, {passive:true});
  }
});
