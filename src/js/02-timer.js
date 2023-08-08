import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('input[type="text"]');
const btnEl = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

btnEl.disabled = true;

let timerId = null;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0]
      if (selectedDate < Date.now()) {
      btnEl.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnEl.disabled = false;
    }
    
  },
};

const fp = flatpickr(inputEl, options);

btnEl.addEventListener('click', startTimer);

function startTimer() {
  timerId = setInterval(() => {
    const currentDate = Date.now();
    const timeLeft = selectedDate - currentDate;
    
    if (timeLeft < 1000) {
      clearInterval(timerId);
      return;
    }
    const {days, hours, minutes, seconds} = convertMs(timeLeft);

    setTimerValue(days, hours, minutes, seconds);

  }, 1000);
}

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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function setTimerValue(d, h, m, s) {
    timerDays.textContent = addLeadingZero(d);
    timerHours.textContent = addLeadingZero(h);
    timerMinutes.textContent = addLeadingZero(m);
    timerSeconds.textContent = addLeadingZero(s);
}