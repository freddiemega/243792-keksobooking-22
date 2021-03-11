import {showAlert} from './util.js';
import {showErrorMessage} from './modal.js';
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

const sendData = (onSuccess, body) => {
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
        resetFormAndMainPoint();
      } else {
        showErrorMessage();
      }
    })
    .catch(() => {
      showErrorMessage();
    });
};

export {getData, sendData};
