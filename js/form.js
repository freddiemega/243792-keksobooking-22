import {getTypeOfRealEstate, getListItemsFeatures, getPhotos} from './popup.js';
import {similarAdverts} from './data.js';

/*
// задаём номер объявления для примера
const NUMBER_OF_ADVERT = 1;
const currentDataAdvert = similarAdverts[NUMBER_OF_ADVERT];
// отрисовать объявление
//showAdvert(currentDataAdvert);
//console.log(currentDataAdvert);
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

//-----------неактивное/активное состояние------------------
// находим форму создания объявления
const adForm = document.querySelector('.ad-form');
// находим форму фильтра карты
const mapFiltersForm = document.querySelector('.map__filters');

// функция приводит форму в неактивное состояние
const blockForm = function (form) {
  // добавляем форме класс .ad-form--disabled
  form.classList.add('ad-form--disabled');
  // находим все дочерние элементы формы
  let childElements = form.children;
  // блокируем все дочерние элементы в форме с помощью аттрибута disabled
  for (let i = 0; i < childElements.length; i++) {
    childElements[i].setAttribute('disabled', 'disabled');
  }
}
// функция приводит форму в активное состояние
const unBlockForm = function (form) {
  // удаляем в форме класс .ad-form--disabled
  form.classList.remove('ad-form--disabled');
  // находим все дочерние элементы формы
  let childElements = form.children;
  // разблокируем все дочерние элементы в форме с помощью аттрибута disabled
  for (let i = 0; i < childElements.length; i++) {
    childElements[i].removeAttribute('disabled');
  }
}

// активное состояние
const setPageActive = function () {
  unBlockForm (adForm);
  unBlockForm (mapFiltersForm);
}
// неактивное состояние
const setPageInactive = function () {
  blockForm (adForm);
  blockForm (mapFiltersForm);
}
// переводим страницу в неактивное состояние
setPageInactive ();

//-----------карта------------------
// координаты центра Токио
const CENTER_TOKYO = {
  lat: 35.68658,
  lng: 139.76463,
};
// создаём карту
const map = window.L.map('map-canvas')
// действие при загрузке карты
  .on('load', () => {
    // переводим страницу в активное состояние
    setPageActive ();
  })
  .setView(
    CENTER_TOKYO, 12);
// добавляем на карту слой и копирайт
window.L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// создаём свою Главную метку
const mainPinIcon = window.L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [100, 100],
  iconAnchor: [50, 100],
});
// добавляем на карту метку
const marker = window.L.marker(
  CENTER_TOKYO,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
marker.addTo(map);

// находим поле адреса
const fieldAddress = document.querySelector('#address');
// задаём начальные координаты адреса центра Токио
fieldAddress.value = marker.getLatLng().lat.toFixed(5) + ', ' + marker.getLatLng().lng.toFixed(5);
// выбор адреса путём перемещения главной метки и запись значений в поле адреса
marker.on('dragend', function () {
  fieldAddress.value = marker.getLatLng().lat.toFixed(5) + ', ' + marker.getLatLng().lng.toFixed(5);
});


// добавляем на карту метки объявлений
// функция создания балуна метки
const createCustomPopup = (point) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);

  popupElement.querySelector('.popup__avatar').src = point.author.avatar;
  popupElement.querySelector('.popup__title').textContent = point.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = `Координаты: ${point.location.x}, ${point.location.y}`;
  popupElement.querySelector('.popup__text--price').innerHTML = point.offer.price + '  <span>₽/ночь</span>';
  popupElement.querySelector('.popup__type').textContent = getTypeOfRealEstate(point.offer.type);
  popupElement.querySelector('.popup__text--capacity').textContent = point.offer.rooms + ' комнаты для ' + point.offer.guests + ' гостей';
  popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + point.offer.checkin + ', выезд до ' + point.offer.checkout;
  popupElement.querySelector('.popup__features').innerHTML = getListItemsFeatures (point.offer.features);
  popupElement.querySelector('.popup__description').textContent = point.offer.description;
  popupElement.querySelector('.popup__photos').innerHTML = getPhotos (point.offer.photos);

  return popupElement;
};
// функция создания метки по координатам
const createMarkerOnMap = function (point) {
  // создаём метку
  const pinIcon = window.L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
  });
  // добавляем на карту метку
  const marker = window.L.marker(
    {
      lat: point.location.x,
      lng: point.location.y,
    },
    {
      draggable: false,
      icon: pinIcon,
    },
  );
  marker
    .addTo(map)
    .bindPopup(
      createCustomPopup(point),
      {
        keepInView: true,
      },
    );
};
// цикл перебора коллекции объявлений
for (let i = similarAdverts.length - 1; i >= 0; i--) {
  createMarkerOnMap (similarAdverts[i]);
}
