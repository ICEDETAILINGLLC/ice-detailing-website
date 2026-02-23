// booking.js — handles booking submission to Formspree and local validation
document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('bookingForm');
  const submitBtn = document.getElementById('submitBooking') || document.getElementById('submitBookingBtn');
  const status = document.getElementById('bookingStatus');

  // If page has a native form element (index version or contact version)
  if (bookingForm && submitBtn) {
    submitBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      // basic validation
      const form = bookingForm;
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const phone = form.querySelector('#phone');
      const service = form.querySelector('#serviceSelect') || form.querySelector('#service');
      const date = form.querySelector('#date') || null;
      const time = form.querySelector('#time') || null;

      if (!name.value.trim() || !email.value.trim() || !phone.value.trim() || !service.value.trim()) {
        showStatus('Please complete required fields (name, email, phone, service).', true);
        return;
      }

      // prepare payload for Formspree
      const payload = {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        service: service.value.trim(),
        vehicle: (form.querySelector('#vehicle') ? form.querySelector('#vehicle').value : ''),
        date: date ? date.value : '',
        time: time ? time.value : '',
        message: form.querySelector('#message') ? form.querySelector('#message').value.trim() : ''
      };

      // Replace with your Formspree endpoint
      const FORMSPREE_URL = 'https://formspree.io/f/manaykpb';

      showStatus('Sending request...', false);
      submitBtn.disabled = true;
      try {
        const res = await fetch(FORMSPREE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          showStatus('Request sent — we will contact you shortly. Thank you!', false);
          form.reset();
        } else {
          const data = await res.json().catch(()=>({}));
          showStatus(data.error || 'Failed to send. Please try again or call us.', true);
        }
      } catch (err) {
        showStatus('Network error — please try again or call (617) 970-2329.', true);
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  function showStatus(msg, isError){
    if (!status) return;
    status.textContent = msg;
    status.style.color = isError ? '#ffb3b3' : '#bfefff';
  }
});
