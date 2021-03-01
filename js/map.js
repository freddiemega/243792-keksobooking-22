import {similarAdverts} from './data.js';
import {createAdvertFromTemplate} from './popup.js';

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
// находим форму создания объявления
const adForm = document.querySelector('.ad-form');
// находим форму фильтра карты
const mapFiltersForm = document.querySelector('.map__filters');

// неактивное состояние
const setPageInactive = function () {
  blockForm (adForm);
  blockForm (mapFiltersForm);
}

// активное состояние
const setPageActive = function () {
  unBlockForm (adForm);
  unBlockForm (mapFiltersForm);
  // координаты центра Токио
  const CENTER_TOKYO = {
    lat: 35.68658,
    lng: 139.76463,
  };
  // создаём карту
  const map = window.L.map('map-canvas')
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
  marker.on('drag', function () {
    fieldAddress.value = marker.getLatLng().lat.toFixed(5) + ', ' + marker.getLatLng().lng.toFixed(5);
  });

  // добавляем на карту метки объявлений
  // находим шаблон
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');

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
        createAdvertFromTemplate (point, balloonTemplate),
        {
          keepInView: true,
        },
      );
  };
  // цикл перебора коллекции объявлений
  for (let i = similarAdverts.length - 1; i >= 0; i--) {
    createMarkerOnMap (similarAdverts[i]);
  }
}

setPageInactive();
setPageActive ();
