import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'iziToast/dist/css/iziToast.min.css';

const picker = document.querySelector('input#datetime-picker');
const button = document.querySelector('button');
const outputDays = document.querySelector('span[data-days]');
const outputHours = document.querySelector('span[data-hours]');
const outputMinutes = document.querySelector('span[data-minutes]');
const outputSeconds = document.querySelector('span[data-seconds]');

button.disabled = true;
let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() > selectedDates[0].getTime()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      button.disabled = true;
    } else {
      button.disabled = false;
      userSelectedDate = selectedDates[0].getTime();
    }
  },
};

flatpickr(picker, options);
const padded = value => value.toString().padStart(2, '0');
button.addEventListener('click', () => {
  button.disabled = true;
  picker.disabled = true;
  const interval = setInterval(() => {
    const remainingMs = userSelectedDate - Date.now();
    outputDays.textContent = padded(convertMs(remainingMs).days);
    outputHours.textContent = padded(convertMs(remainingMs).hours);
    outputMinutes.textContent = padded(convertMs(remainingMs).minutes);
    outputSeconds.textContent = padded(convertMs(remainingMs).seconds);
    if (remainingMs < 500) {
      clearInterval(interval);
      button.disabled = false;
      picker.disabled = false;
      console.log('Boom, times up!');
    }
  }, 500);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
