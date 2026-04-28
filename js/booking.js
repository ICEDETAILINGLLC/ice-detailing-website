// booking.js — FIXED Formspree submission + 30 min time

document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('bookingForm');
  const submitBtn = document.getElementById('submitBooking');
  const status = document.getElementById('bookingStatus');

  // -------------------------------
  // Date Picker
  // -------------------------------
  const dateInput = document.getElementById('date');
  if (window.flatpickr && dateInput) {
    flatpickr(dateInput, {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
      minDate: 'today'
    });
  }

  // -------------------------------
  // Time (30 min increments)
  // -------------------------------
  const timeInput = document.getElementById('time');
  if (timeInput) {
    timeInput.step = 1800; // 30 minutes
    timeInput.min = '07:00';
    timeInput.max = '20:00';
  }

  // -------------------------------
  // STOP if form missing
  // -------------------------------
  if (!bookingForm || !submitBtn) return;

  // ✅ YOUR REAL FORMSPREE LINK
  const FORMSPREE_URL = 'https://formspree.io/f/manaykpb';

  // -------------------------------
  // SUBMIT HANDLER
  // -------------------------------
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fd = new FormData(bookingForm);

    // collect services
    const services = Array.from(
      bookingForm.querySelectorAll('input[name="services[]"]:checked')
    ).map(x => x.value);

    const addons = Array.from(
      bookingForm.querySelectorAll('input[name="addons[]"]:checked')
    ).map(x => x.value);

    if (services.length === 0) {
      showStatus('Please select at least one service.', true);
      return;
    }

    fd.set('services', services.join(', '));
    fd.set('addons', addons.join(', '));

    fd.delete('services[]');
    fd.delete('addons[]');

    showStatus('Sending request...', false);
    submitBtn.disabled = true;

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        showStatus('Request sent — we will contact you shortly.', false);
        bookingForm.reset();
      } else {
        showStatus('Failed to send. Try again or call 617-777-7569.', true);
      }
    } catch (err) {
      showStatus('Network error — please try again.', true);
    }

    submitBtn.disabled = false;
  });

  function showStatus(msg, isError) {
    if (!status) return;
    status.textContent = msg;
    status.style.color = isError ? '#ff4d4d' : '#00e0ff';
  }
});
