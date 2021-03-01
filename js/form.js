//import {getTypeOfRealEstate, getListItemsFeatures, getPhotos} from './popup.js';
/*
// задаём номер объявления для примера
const NUMBER_OF_ADVERT = 1;
const currentDataAdvert = similarAdverts[NUMBER_OF_ADVERT];
*/

// находим форму
const advertForm = document.querySelector('.ad-form');
// находим селектор "Тип жилья"
const fieldSelectType = advertForm.querySelector('#type');
// находим инпут "Цена за ночь"
const fieldInputPriceForNight = advertForm.querySelector('#price');

// функция возвращает минимальную цену за ночь в зависимости от типа жилья
const getPriceForNight = function (typeOfRealEstate) {
  switch (typeOfRealEstate) {
    case 'palace':
      return 10000;
    case 'flat':
      return 1000;
    case 'house':
      return 5000;
    case 'bungalow':
      return 0;
    default:
      return 0;
  }
}
// функция устанавливает соответствие полей "Цена за ночь" от "Тип жилья"
const setPriceForNight = function (selectedType) {
  fieldInputPriceForNight.setAttribute('placeholder', getPriceForNight (selectedType));
  fieldInputPriceForNight.setAttribute('min', getPriceForNight (selectedType));
}
// «Тип жилья» — выбор опции меняет атрибуты минимального значения и плейсхолдера поля «Цена за ночь»
// находим какой пункт селекта выбран
let selectedType = fieldSelectType.value;
// устанавливаем соответствие полей "Цена за ночь" от "Тип жилья"
setPriceForNight (selectedType);
// прослушиваем событие изменения селекта
fieldSelectType.addEventListener('change', function () {
  // находим какой пункт селекта выбран
  selectedType = fieldSelectType.value;
  // устанавливаем соответствие полей "Цена за ночь" от "Тип жилья"
  setPriceForNight (selectedType);
});


////// «Время заезда», «Время выезда» — выбор опции одного поля автоматически изменят значение другого
// находим селектор "Время заезда"
const fieldTimeIn = advertForm.querySelector('#timein');
// находим селектор "Время выезда"
const fieldTimeOut = advertForm.querySelector('#timeout');
// обработчик изменения «Время заезда»
fieldTimeIn.addEventListener('change', function () {
  fieldTimeOut.value = fieldTimeIn.value;
});
// обработчик изменения «Время выезда»
fieldTimeOut.addEventListener('change', function () {
  fieldTimeIn.value = fieldTimeOut.value;
});
