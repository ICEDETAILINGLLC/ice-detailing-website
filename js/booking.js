// booking.js — multi-service + add-ons submission to Formspree
// supports auto-prefill from services page buttons
// upgraded with flatpickr date/time + Google address autocomplete

document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('bookingForm');
  const submitBtn = document.getElementById('submitBooking') || document.getElementById('submitBookingBtn');
  const status = document.getElementById('bookingStatus');
  const addressInput = document.getElementById('address');

  // -------------------------------
  // 0) Enhanced date + time pickers
  // -------------------------------
  if (window.flatpickr) {
    flatpickr('#date', {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
      minDate: 'today',
      disableMobile: false
    });

    flatpickr('#time', {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      altInput: true,
      altFormat: 'h:i K',
      minuteIncrement: 15,
      time_24hr: false,
      disableMobile: false
    });
  }

  // -----------------------------------
  // 0.5) Google address autocomplete
  // -----------------------------------
  if (
    addressInput &&
    window.google &&
    google.maps &&
    google.maps.places
  ) {
    const autocomplete = new google.maps.places.Autocomplete(addressInput, {
      types: ['address'],
      componentRestrictions: { country: 'us' },
      fields: ['formatted_address']
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        addressInput.value = place.formatted_address;
      }
    });
  }

  // -------------------------------
  // 1) Service button prefill links
  // -------------------------------
  document.querySelectorAll('[data-prefill]').forEach(link => {
    link.addEventListener('click', (e) => {
      const service = link.getAttribute('data-prefill');
      if (!service) return;

      const href = link.getAttribute('href') || 'contact.html';

      // only modify contact page links
      if (!href.includes('contact.html')) return;

      e.preventDefault();

      const url = new URL(href, window.location.origin);
      url.searchParams.set('service', service);
      window.location.href = url.pathname + url.search;
    });
  });

  // ----------------------------------------
  // 2) Auto-check service if coming from URL
  // ----------------------------------------
  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get('service');

  if (requestedService && bookingForm) {
    const matchingService = bookingForm.querySelector(
      `input[name="services[]"][value="${cssEscape(requestedService)}"]`
    );

    if (matchingService) {
      matchingService.checked = true;
    }
  }

  // -------------------------------
  // 3) Form submission to Formspree
  // -------------------------------
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
    const address = bookingForm.querySelector('#address');
    const message = bookingForm.querySelector('#message');

    const serviceChecks = Array.from(
      bookingForm.querySelectorAll('input[name="services[]"]:checked')
    );
    const addonChecks = Array.from(
      bookingForm.querySelectorAll('input[name="addons[]"]:checked')
    );

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

    const fd = new FormData(bookingForm);

    // make multi-select fields readable in Formspree email
    fd.set('services', serviceChecks.map(x => x.value).join(', '));
    fd.set('addons', addonChecks.map(x => x.value).join(', '));

    // ensure nice readable values are submitted
    if (address) fd.set('address', address.value.trim());
    if (message) fd.set('message', message.value.trim());

    // remove raw checkbox arrays so email stays clean
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
        showStatus('Request sent — we will contact you shortly. Thank you!', false);
        bookingForm.reset();

        // optional: remove service param after successful submit
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
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

  function showStatus(msg, isError) {
    if (!status) return;
    status.textContent = msg;
    status.style.color = isError ? '#ffb3b3' : '#bfefff';
  }

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === 'function') {
      return window.CSS.escape(value);
    }
    return String(value).replace(/["\\]/g, '\\$&');
  }
});
