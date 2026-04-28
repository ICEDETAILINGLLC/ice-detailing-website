// booking.js — CLEAN WORKING VERSION (Formspree + no redirect)

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookingForm');
  const button = document.getElementById('submitBooking');
  const status = document.getElementById('bookingStatus');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // check at least one service
    const services = form.querySelectorAll('input[name="services[]"]:checked');
    if (services.length === 0) {
      showStatus('Please select at least one service.', true);
      return;
    }

    const formData = new FormData(form);

    showStatus('Sending request...', false);
    if (button) button.disabled = true;

    try {
      const response = await fetch('https://formspree.io/f/manaykpb', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        showStatus('Request sent — we will contact you shortly.', false);
        form.reset();
      } else {
        showStatus('Error sending. Please call or text 617-777-7569.', true);
      }
    } catch (error) {
      showStatus('Network error. Please try again.', true);
    }

    if (button) button.disabled = false;
  });

  function showStatus(message, isError) {
    if (!status) return;
    status.textContent = message;
    status.style.color = isError ? '#ff4d4d' : '#00e0ff';
  }
});
