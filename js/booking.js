// booking.js — date picker + 30-minute time picker + clean Formspree submit

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookingForm');
  const status = document.getElementById('bookingStatus');
  const dateInput = document.getElementById('date');
  const timeSelect = document.getElementById('time');

  if (!form) return;

  // Nice calendar
  if (dateInput && window.flatpickr) {
    flatpickr(dateInput, {
      minDate: 'today',
      dateFormat: 'm/d/Y',
      disableMobile: true
    });
  }

  // 30-minute times from 7:00 AM to 8:00 PM
  if (timeSelect) {
    buildTimeOptions(timeSelect, 7, 20);
  }

  form.addEventListener('submit', (e) => {
    const services = form.querySelectorAll('input[name="services[]"]:checked');

    if (services.length === 0) {
      e.preventDefault();
      showStatus('Please select at least one service.', true);
      return;
    }

    showStatus('Sending request...', false);
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
