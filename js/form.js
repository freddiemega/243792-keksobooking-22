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


// функция приводит форму  в неактивное состояние
// принимает форму и класс для выключения тега <form> согласно ТЗ
const blockForm = function (form, formClass) {
  // добавляем форме класс formClass
  form.classList.add(formClass);
  // находим все дочерние элементы формы
  let childElements = form.children;
  // блокируем все дочерние элементы в форме с помощью аттрибута disabled
  for (let i = 0; i < childElements.length; i++) {
    childElements[i].setAttribute('disabled', 'disabled');
  }
}

// функция приводит форму в активное состояние
const unBlockForm = function (form, formClass) {
  // удаляем в форме класс formClass
  form.classList.remove(formClass);
  // находим все дочерние элементы формы
  let childElements = form.children;
  // разблокируем все дочерние элементы в форме с помощью аттрибута disabled
  for (let i = 0; i < childElements.length; i++) {
    childElements[i].removeAttribute('disabled');
  }
}

// метод задаёт адресс в поле адреса
// находим поле адреса
const fieldAddress = document.querySelector('#address');
const setAddressField = function (latitude, longitude) {
  fieldAddress.value = latitude + ', ' + longitude;
}

export {blockForm, unBlockForm, setAddressField};
