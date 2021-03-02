import {similarAdverts} from './data.js';
import {createAdvertFromTemplate} from './popup.js';
import {blockForm, unBlockForm, setAddressField} from './form.js';

// находим шаблон балуна
const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');

// координаты центра Токио
const CENTER_TOKYO = {
  lat: 35.68658,
  lng: 139.76463,
};
// создаём карту
const map = window.L.map('map-canvas');

// находим форму создания объявления
const adForm = document.querySelector('.ad-form');
// находим форму фильтра карты
const mapFiltersForm = document.querySelector('.map__filters');

// неактивное состояние
const setPageInactive = function () {
  blockForm (adForm, 'ad-form--disabled');
  blockForm (mapFiltersForm, 'map__filters--disabled');
}

// активное состояние
const setPageActive = function () {
  unBlockForm (adForm, 'ad-form--disabled');
  unBlockForm (mapFiltersForm, 'map__filters--disabled');

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

  // задаём начальные координаты адреса центра Токио
  setAddressField (marker.getLatLng().lat.toFixed(5), marker.getLatLng().lng.toFixed(5));
  // выбор адреса путём перемещения главной метки и запись значений в поле адреса
  marker.on('drag', function () {
    setAddressField (marker.getLatLng().lat.toFixed(5), marker.getLatLng().lng.toFixed(5));
  });
  // цикл перебора коллекции объявлений - добавляем на карту метки объявлений
  for (let i = similarAdverts.length - 1; i >= 0; i--) {
    createMarkerOnMap (similarAdverts[i]);
  }
}

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

// инициализация карты
map.on('load', () => {
  setPageActive();
})
  .setView(
    CENTER_TOKYO, 12);

setPageInactive();
setPageActive ();
