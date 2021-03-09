import {showAlert} from './util.js';
import {resetFormAndMainPoint} from './form.js';

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((advertsFromServer) => {
      onSuccess(advertsFromServer)
    })
    .catch(() => {
      showAlert('Не удалось получить данные от сервера. Попробуйте ещё раз')
    })
};

// находим форму
const advertForm = document.querySelector('.ad-form');

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
