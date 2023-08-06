import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', startPromiseGenerator);

function startPromiseGenerator(evt) {
  evt.preventDefault();

  const formElement = evt.target.elements;
  const startDelay = Number(formElement.delay.value);
  const delayStep = Number(formElement.step.value);
  const amount = Number(formElement.amount.value);
  
  for (let i = 1; i <= amount; i += 1) {
    let promiseDelay = startDelay + delayStep * i;

    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });

    formEl.reset();
  }

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }
}
