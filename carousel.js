// carousel.js — simple, responsive sliding carousel for reviews
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  const cards = document.querySelectorAll('.carousel-track .review-card');
  if(!track || cards.length === 0) return;

  let index = 0;
  const total = cards.length;

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  const next = document.querySelector('.next');
  const prev = document.querySelector('.prev');

  if(next) next.addEventListener('click', () => { index = (index + 1) % total; updateCarousel(); });
  if(prev) prev.addEventListener('click', () => { index = (index - 1 + total) % total; updateCarousel(); });

  // swipe support for mobile
  let startX = 0;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
  track.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 40) { index = (index + 1) % total; updateCarousel(); }
    if (endX - startX > 40) { index = (index - 1 + total) % total; updateCarousel(); }
  });
});
