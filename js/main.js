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

  // Save prefill when clicking any element with data-prefill
  document.querySelectorAll('[data-prefill]').forEach(el => {
    el.addEventListener('click', () => {
      const pref = (el.dataset.prefill || '').trim();
      if (!pref) return;
      try { sessionStorage.setItem('prefillService', pref); } catch (err) {}
    });
  });

  // Apply prefill on contact page
  const serviceSelect = document.querySelector('#serviceSelect') || document.querySelector('#service');
  if (serviceSelect) {
    const url = new URL(window.location.href);
    const fromUrl = (url.searchParams.get('service') || '').trim();
    const fromStorage = (() => {
      try { return (sessionStorage.getItem('prefillService') || '').trim(); } catch { return ''; }
    })();

    const pref = fromUrl || fromStorage;

    if (pref) {
      // 1) match option value exactly
      let matched = false;
      for (let i = 0; i < serviceSelect.options.length; i++) {
        const opt = serviceSelect.options[i];
        if ((opt.value || '').toLowerCase() === pref.toLowerCase()) {
          serviceSelect.selectedIndex = i;
          matched = true;
          break;
        }
      }

      // 2) fallback: match visible text
      if (!matched) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          const txt = (serviceSelect.options[i].text || '').toLowerCase();
          if (txt.includes(pref.toLowerCase())) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }

      try { sessionStorage.removeItem('prefillService'); } catch (err) {}

      // Optional: show selected service in heading
      const titleEl = document.querySelector('[data-selected-service]');
      if (titleEl && serviceSelect.value) {
        titleEl.textContent = `— ${serviceSelect.value}`;
      }
    }
  }

  // Parallax hero (subtle)
  const hero = document.querySelector('.hero[data-parallax]');
  if (hero) {
    window.addEventListener('scroll', () => {
      const speed = 0.22;
      const y = window.scrollY * speed;
      hero.style.backgroundPosition = `center calc(50% + ${y}px)`;
    }, { passive:true });
  }

  // Sticky Book button visibility
  const bookSticky = document.getElementById('bookSticky');
  if (bookSticky) {
    function updateBookVisible(){
      if (window.scrollY > 420) bookSticky.classList.add('visible');
      else bookSticky.classList.remove('visible');
    }
    updateBookVisible();
    window.addEventListener('scroll', updateBookVisible, { passive:true });
  }
});
