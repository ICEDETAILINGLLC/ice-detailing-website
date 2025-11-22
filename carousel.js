// carousel.js — simple responsive reviews slider
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  const cards = track.querySelectorAll('.review-card');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let index = 0;
  const total = cards.length;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { index = (index + 1) % total; update(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { index = (index - 1 + total) % total; update(); });

  // swipe support (touch)
  let startX = 0;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, {passive:true});
  track.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 40) { index = (index + 1) % total; update(); }
    if (endX - startX > 40) { index = (index - 1 + total) % total; update(); }
  });
});
