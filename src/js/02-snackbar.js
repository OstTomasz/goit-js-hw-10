import iziToast from 'izitoast';
import 'iziToast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const fulfilledInput = document.querySelector('input[value="fulfilled"]');
const rejectedInput = document.querySelector('input[value="rejected"]');
const submit = document.querySelector(`button`);

submit.addEventListener('click', e => {
  e.preventDefault();
  let delay = delayInput.value;
  if ((fulfilledInput.checked || rejectedInput.checked) && delay !== '') {
    const fulfilled = fulfilledInput.checked;
    const createPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (fulfilled) {
          resolve(`✅ Fulfilled promise in ${delay}ms`);
        } else {
          reject(`❌ Rejected promise in ${delay}ms`);
        }
      }, delay);
    })
      .then(value => {
        iziToast.success({ message: value });
      })
      .catch(error => {
        iziToast.error({ message: error });
      });

    form.reset();
  } else {
    iziToast.info({ message: 'Choose delay and state!' });
  }
});
