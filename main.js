// main.js — reveal on scroll, prefill service, parallax, sticky CTA
document.addEventListener('DOMContentLoaded', () => {
  // 1) reveal on scroll
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

  // 2) prefill service selection when clicking book links
  document.querySelectorAll('[data-prefill]').forEach(el => {
    el.addEventListener('click', (e) => {
      const pref = el.dataset.prefill || el.getAttribute('data-prefill') || '';
      setTimeout(() => {
        const sel = document.querySelector('#service') || document.querySelector('#serviceSelect') || document.querySelector('#cf-service') || document.querySelector('#serviceSelect');
        if (!sel || !pref) {
          // try to scroll to contact anyway
          const contact = document.getElementById('contact'); if (contact) contact.scrollIntoView({behavior:'smooth', block:'start'});
          return;
        }
        // match by first word(s)
        const key = pref.toLowerCase().split(' — ')[0].trim();
        for (let i = 0; i < sel.options.length; i++) {
          if (sel.options[i].text.toLowerCase().includes(key)) {
            sel.selectedIndex = i;
            break;
          }
        }
        const contact = document.getElementById('contact');
        if (contact) contact.scrollIntoView({behavior:'smooth', block:'start'});
      }, 120);
    });
  });

  // 3) parallax for hero background
  const hero = document.querySelector('.hero[data-parallax]');
  if (hero) {
    window.addEventListener('scroll', () => {
      const speed = 0.25;
      const y = window.scrollY * speed;
      hero.style.backgroundPosition = `center calc(50% + ${y}px)`;
    }, {passive:true});
  }

  // 4) sticky Book button visibility
  const bookSticky = document.getElementById('bookSticky');
  if (bookSticky) {
    const toggle = () => {
      if (window.scrollY > 320) bookSticky.classList.add('visible');
      else bookSticky.classList.remove('visible');
    };
    window.addEventListener('scroll', toggle, {passive:true});
    toggle();
  }

  // 5) small accessibility: focus outline on keyboard only
  function handleFirstTab(e) {
    if (e.key === 'Tab') document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
  }
  window.addEventListener('keydown', handleFirstTab);
});
