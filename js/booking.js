// booking.js — CLEAN VERSION (no Formspree blocking)

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookingForm');
  const status = document.getElementById('bookingStatus');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    // ✅ DO NOT prevent default — let Formspree handle submission

    // require at least one service
    const services = form.querySelectorAll('input[name="services[]"]:checked');
    if (services.length === 0) {
      e.preventDefault();
      showStatus('Please select at least one service.', true);
      return;
    }

    // optional: show sending message (purely visual)
    showStatus('Sending request...', false);
  });

  function showStatus(msg, isError) {
    if (!status) return;
    status.textContent = msg;
    status.style.color = isError ? '#ff4d4d' : '#00e0ff';
  }
});
