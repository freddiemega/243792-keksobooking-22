// время показа сообщения
const ALERT_SHOW_TIME = 5000;

// функция случайное целое число из диапазона
const getRandom = function (minNumber, maxNumber) {
  const min = Math.min (minNumber, maxNumber);
  const max = Math.max (minNumber, maxNumber);
  return Math.ceil (Math.random() * (max - min) + min);
}
// функция случайное число из диапазона с заданным "количеством знаков после запятой"
const getRandomDecimalPlaces = function (minNumber, maxNumber, decimalPlaces) {
  const min = Math.min (minNumber, maxNumber);
  const max = Math.max (minNumber, maxNumber);
  let num = Math.random () * (max - min) + min;
  return Number (num.toFixed (decimalPlaces));
}
// функция возвращает 0 или 1 случайно
const getRandomBinary = function () {
  return Math.round (Math.random ());
}
// функция возвращает случайный элемент массива
const getRandomArrayElement = (elements) => {
  return elements[Math.floor (Math.random () * elements.length)];
};
// функция возвращает массив с несколькими случайными значениями из исходного массива без повторов
const getMultipleValuesArray = function (sourceArray) {
  let tempArray = [];
  //цикл работает пока целевой массив пустой - если такое произошло случайно
  while (tempArray.length === 0) {
    tempArray = sourceArray.filter(() => getRandomBinary())
  }
  return tempArray;
}

// функция выводит сообщение вверху окна браузера
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '24px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {getRandom, getRandomDecimalPlaces, getRandomArrayElement, getMultipleValuesArray, showAlert};
