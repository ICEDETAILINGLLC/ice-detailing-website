// booking.js — FINAL FIX (only submission, nothing else touched)

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookingForm');
  const button = document.getElementById('submitBooking');
  const status = document.getElementById('bookingStatus');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // require at least one service
    const services = form.querySelectorAll('input[name="services[]"]:checked');
    if (services.length === 0) {
      showStatus('Please select at least one service.', true);
      return;
    }

    const formData = new FormData(form);

    // 🔥 THIS IS YOUR FORMSPREE ENDPOINT
    const URL = 'https://formspree.io/f/manaykpb';

    showStatus('Sending request...', false);
    if (button) button.disabled = true;

    try {
      const res = await fetch(URL, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        showStatus('Request sent — we will contact you shortly.', false);
        form.reset();
      } else {
        showStatus('Error sending. Call or text 617-777-7569.', true);
      }
    } catch (err) {
      showStatus('Network error. Please try again.', true);
    }

    if (button) button.disabled = false;
  });

  function showStatus(msg, isError) {
    if (!status) return;
    status.textContent = msg;
    status.style.color = isError ? '#ff4d4d' : '#00e0ff';
  }
});
