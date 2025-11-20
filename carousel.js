const track = document.querySelector('.carousel-track');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;
const cards = document.querySelectorAll('.review-card');
const total = cards.length;

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener('click', () => {
  index = (index + 1) % total;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + total) % total;
  updateCarousel();
});
