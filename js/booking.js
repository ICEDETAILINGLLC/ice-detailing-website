// booking.js — stay on page + request sent message

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookingForm');
  const status = document.getElementById('bookingStatus');
  const dateInput = document.getElementById('date');
  const timeSelect = document.getElementById('time');
  const submitButton = document.getElementById('submitBooking');

  if (!form) return;

  if (dateInput && window.flatpickr) {
    flatpickr(dateInput, {
      minDate: 'today',
      dateFormat: 'm/d/Y',
      disableMobile: true
    });
  }

  if (timeSelect) {
    buildTimeOptions(timeSelect, 7, 20);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const services = form.querySelectorAll('input[name="services[]"]:checked');
    if (services.length === 0) {
      showStatus('Please select at least one service.', true);
      return;
    }

    showStatus('Sending...', false);
    if (submitButton) submitButton.disabled = true;

    const formData = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/manaykpb', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        showStatus('Request sent.', false);
        form.reset();

        if (timeSelect) {
          buildTimeOptions(timeSelect, 7, 20);
        }
      } else {
        showStatus('Something went wrong. Call or text 617-777-7569.', true);
      }
    } catch (err) {
      showStatus('Network error. Please try again.', true);
    }

    if (submitButton) submitButton.disabled = false;
  });

  function buildTimeOptions(select, openHour, closeHour) {
    select.innerHTML = '';

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Select a time';
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    for (let hour = openHour; hour <= closeHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === closeHour && minute > 0) continue;

        const option = document.createElement('option');
        option.value = formatTime(hour, minute);
        option.textContent = formatTime(hour, minute);
        select.appendChild(option);
      }
    }
  }

  function formatTime(hour24, minute) {
    const period = hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = hour24 % 12 || 12;
    const mins = String(minute).padStart(2, '0');
    return `${hour12}:${mins} ${period}`;
  }

  function showStatus(msg, isError) {
    if (!status) return;
    status.textContent = msg;
    status.style.color = isError ? '#ff4d4d' : '#00e0ff';
  }
});
