// booking.js — upgraded time dropdown + reliable Formspree submit

document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('bookingForm');
  const status = document.getElementById('bookingStatus');
  const timeSelect = document.getElementById('time');

  if (!bookingForm) return;

  // Build clean 30-minute dropdown times
  if (timeSelect && timeSelect.tagName === 'SELECT') {
    timeSelect.innerHTML = '<option value="" selected disabled>Select a time</option>';

    for (let hour = 7; hour <= 20; hour++) {
      for (let minute of [0, 30]) {
        if (hour === 20 && minute === 30) continue;

        const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        const displayHour = hour > 12 ? hour - 12 : hour;
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const label = `${displayHour}:${String(minute).padStart(2, '0')} ${ampm}`;

        const option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        timeSelect.appendChild(option);
      }
    }
  }

  // Date picker
  const dateInput = document.getElementById('date');
  if (window.flatpickr && dateInput) {
    flatpickr(dateInput, {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
      minDate: 'today',
      disableMobile: true,
      allowInput: false
    });
  }

  // Let the HTML form submit normally to Formspree
  bookingForm.addEventListener('submit', (e) => {
    const services = bookingForm.querySelectorAll('input[name="services[]"]:checked');

    if (!services.length) {
      e.preventDefault();
      showStatus('Please select at least one service.', true);
      return;
    }

    if (!bookingForm.checkValidity()) {
      return;
    }

    showStatus('Sending request...', false);
  });

  function showStatus(message, isError) {
    if (!status) return;
    status.textContent = message;
    status.style.color = isError ? '#ff4d4d' : '#00e0ff';
  }
});
