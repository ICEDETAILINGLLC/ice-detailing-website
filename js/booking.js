// booking.js — multi-service + add-ons submission to Formspree
document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('bookingForm');
  const submitBtn = document.getElementById('submitBooking') || document.getElementById('submitBookingBtn');
  const status = document.getElementById('bookingStatus');

  if (!bookingForm || !submitBtn) return;

  const FORMSPREE_URL = 'https://formspree.io/f/manaykpb';

  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = bookingForm.querySelector('#name');
    const email = bookingForm.querySelector('#email');
    const phone = bookingForm.querySelector('#phone');
    const vehicle = bookingForm.querySelector('#vehicle');
    const zip = bookingForm.querySelector('#zip');
    const date = bookingForm.querySelector('#date');
    const time = bookingForm.querySelector('#time');

    const serviceChecks = Array.from(bookingForm.querySelectorAll('input[name="services[]"]:checked'));
    const addonChecks = Array.from(bookingForm.querySelectorAll('input[name="addons[]"]:checked'));

    if (!name?.value.trim() || !email?.value.trim() || !phone?.value.trim()) {
      showStatus('Please complete required fields (name, email, phone).', true);
      return;
    }
    if (serviceChecks.length === 0) {
      showStatus('Please select at least one service.', true);
      return;
    }
    if (!vehicle?.value.trim()) {
      showStatus('Please select your vehicle type.', true);
      return;
    }
    if (!zip?.value.trim()) {
      showStatus('Please enter your ZIP code.', true);
      return;
    }
    if (!date?.value || !time?.value) {
      showStatus('Please choose a preferred date and time.', true);
      return;
    }

    // Build payload
    const fd = new FormData(bookingForm);

    // Normalize multi-selects into readable fields for Formspree
    fd.set('services', serviceChecks.map(x => x.value).join(', '));
    fd.set('addons', addonChecks.map(x => x.value).join(', '));

    // Remove the raw array keys so your email isn’t messy (optional)
    fd.delete('services[]');
    fd.delete('addons[]');

    showStatus('Sending request...', false);
    submitBtn.disabled = true;

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: fd,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        showStatus('Request sent — we will contact you shortly. Thank you!', false);
        bookingForm.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        showStatus(data.error || 'Failed to send. Please try again or call us.', true);
      }
    } catch (err) {
      showStatus('Network error — please try again or call (617) 970-2329.', true);
    } finally {
      submitBtn.disabled = false;
    }
  });

  function showStatus(msg, isError){
    if (!status) return;
    status.textContent = msg;
    status.style.color = isError ? '#ffb3b3' : '#bfefff';
  }
});
