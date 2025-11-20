// animations.js - reveal on scroll, parallax hero, interactions
document.addEventListener('DOMContentLoaded', function() {
  // Inject year where present
  ['year','yearSvc','yearContact','yearReviews'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = new Date().getFullYear();
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => io.observe(r));

  // Parallax hero (only if data-parallax present)
  const hero = document.querySelector('.hero[data-parallax]');
  if (hero) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY * 0.25;
      hero.style.backgroundPosition = `center calc(50% + ${y}px)`;
    }, { passive: true });
  }

  // Service-card click sets service select on contact form and scrolls
  document.querySelectorAll('[data-service]').forEach(el => {
    el.addEventListener('click', (e) => {
      const svc = el.getAttribute('data-service') || el.dataset.service;
      // prefill select on contact form (if present)
      const sel = document.querySelector('#serviceSelect') || document.querySelector('#serviceSelectContact') || document.querySelector('select[name="service"]');
      if (sel && svc) {
        for (let i=0;i<sel.options.length;i++){
          if (sel.options[i].text.includes(svc.split(' — ')[0])){ sel.selectedIndex = i; break; }
        }
      }
    });
  });

  // keyboard support for service cards
  document.querySelectorAll('.service-card, .service-tile, .service-detail-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') card.click();
    });
  });
});
