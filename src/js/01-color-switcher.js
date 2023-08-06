const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', startChangingBodyCl);
stopBtn.addEventListener('click', stopChangingBodyCl);

let timerId = null;
const body = document.body;

function startChangingBodyCl() {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  
  startBtn.disabled = true;
}

function stopChangingBodyCl() {
  clearInterval(timerId);
  startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
