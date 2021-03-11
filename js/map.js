import {createAdvertFromTemplate} from './popup.js';
import {setAddressField, activateForms, deactivateForms} from './form.js';

// находим шаблон балуна
const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');

// координаты центра Токио
const CENTER_TOKYO = {
  lat: 35.68658,
  lng: 139.76463,
};
// создаём карту
const map = window.L.map('map-canvas');

// неактивное состояние - блокируем формы
deactivateForms ();


// создаём свою Главную метку
const mainPinIcon = window.L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [100, 100],
  iconAnchor: [50, 100],
});
// добавляем на карту метку
const mainMarker = window.L.marker(
  CENTER_TOKYO,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainMarker.addTo(map);

// активное состояние
const setPageActive = function () {

  // активируем формы
  activateForms ();

  // добавляем на карту слой и копирайт
  window.L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  // задаём начальные координаты адреса центра Токио
  setAddressField (mainMarker.getLatLng().lat.toFixed(5), mainMarker.getLatLng().lng.toFixed(5));
  // выбор адреса путём перемещения главной метки и запись значений в поле адреса
  mainMarker.on('drag', function () {
    setAddressField (mainMarker.getLatLng().lat.toFixed(5), mainMarker.getLatLng().lng.toFixed(5));
  });
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
      lat: point.location.lat,
      lng: point.location.lng,
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
    CENTER_TOKYO, 10);

// функция устанавливает Главную метку обратно в центр Токио
const setMainPointToBegin = function () {
  // перемещаем главную метку обратно в центр Токио
  mainMarker.setLatLng(CENTER_TOKYO);
  // задаём координаты главной метки в поле адоес формы
  setAddressField (mainMarker.getLatLng().lat.toFixed(5), mainMarker.getLatLng().lng.toFixed(5));
  // задаём карте центр и зум
  map.setView(CENTER_TOKYO, 10);
};

export {createMarkerOnMap, setMainPointToBegin};
