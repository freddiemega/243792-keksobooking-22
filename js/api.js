const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error('Ошибка соединения с сервером');
  }
  return response;
}

const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then(checkResponse)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(() => {
      onFail();
    })
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then(checkResponse)
    .then(onSuccess)
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
