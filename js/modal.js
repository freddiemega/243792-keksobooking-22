// находим шаблон сообщения об отправке формы
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
// находим <main> - место вставки модального окна
const placeMain = document.querySelector('main');
// находим шаблон сообщения об ошибке
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

// функция показывает сообщение об успешной отправке формы подачи объявления
const showSuccessMessage = () => {
  // клонируем сообщение
  const successMessage = successMessageTemplate.cloneNode(true);
  // размещаем сообщение в <main> в самом начале
  placeMain.insertBefore(successMessage, placeMain.firstChild);
  // добавляем обработчик нажатия клавиши
  document.addEventListener('keydown', onPopupEscKeydown);
  // добавляем обработчик клика мышью
  successMessage.addEventListener('click', onPopupClick);
}

// функция показывает сообщение об ошибке
const showErrorMessage = () => {
  // клонируем сообщение
  const errorMessage = errorMessageTemplate.cloneNode(true);
  // размещаем сообщение в <main> в самом начале
  placeMain.insertBefore(errorMessage, placeMain.firstChild);
  // находим кнопку
  const errorModalButton = errorMessage.querySelector('.error__button');
  // добавляем обработчик нажатия клавиши
  document.addEventListener('keydown', onPopupEscKeydownError);
  // добавляем обработчик клика мышью
  errorMessage.addEventListener('click', onPopupClickError);
  // добавляем обработчик на кнопку в окне
  errorModalButton.addEventListener('click', onPopupClickError);
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};
// функция убирает действие по умолчанию если нажали ESC и запускает функцию закрытия модального окна отправки
const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};
// функция убирает действие по умолчанию и запускает функцию закрытия модального окна
const onPopupClick = (evt) => {
  evt.preventDefault();
  closeUserModal();
};

// функция "Закрыть модальное окно" убирает обработчики событий и удаляет модальное окно из DOM
const closeUserModal = () => {
  const successModal = document.querySelector('.success');
  // удаляем модальное окно
  successModal.remove();
  // убираем обработчик нажатия клавиши
  document.removeEventListener('keydown', onPopupEscKeydown);
  // убираем обработчик клика мышью
  successModal.removeEventListener('click', onPopupClick);
};


// функция убирает действие по умолчанию если нажали ESC и запускает функцию закрытия модального окна ошибки
const onPopupEscKeydownError = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUserModalError();
  }
};
// функция убирает действие по умолчанию и запускает функцию закрытия модального окна ошибки
const onPopupClickError = (evt) => {
  evt.preventDefault();
  closeUserModalError();
};

// функция "Закрыть модальное окно" убирает обработчики событий и удаляет модальное окно ошибки из DOM
const closeUserModalError = () => {
  const errorModal = document.querySelector('.error');
  // удаляем модальное окно
  errorModal.remove();
  // убираем обработчик нажатия клавиши
  document.removeEventListener('keydown', onPopupEscKeydownError);
  // убираем обработчик клика мышью
  errorModal.removeEventListener('click', onPopupClickError);
};

export {showSuccessMessage, showErrorMessage};
