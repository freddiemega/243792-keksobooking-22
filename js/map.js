import {createAdvertFromTemplate} from './popup.js';
import {setAddressField, activateForms, deactivateForms} from './form.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {setHousing} from './filters.js';

const MAP_ZOOM = 9;
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



const makePoins = function (adverts) {
  // очищаем группу слоёв
  if (markerGroup) {
    markerGroup.clearLayers();
  }
  for (let i = adverts.length - 1; i >= 0; i--) {
    createMarkerOnMap(adverts[i]);
  }
}
// активное состояние
const setPageActive = function () {

  // активируем формы
  activateForms ();

  // обращаемся к серверу и получаем объекты
  getData (
    (advertsFromServer) => {
      //получаем объявления от сервера
      setHousing(advertsFromServer);
    },
    () => showAlert('Не удалось получить данные от сервера. Попробуйте ещё раз'),
  );

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

// создаём группу слоёв и добавляем её на карту
let markerGroup = null;
markerGroup = window.L.layerGroup().addTo(map);

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
  // добавляем балун маркеру
  marker
    .bindPopup(
      createAdvertFromTemplate (point, balloonTemplate),
      {
        keepInView: true,
      },
    );
  // добавляем слой с маркером в группу
  markerGroup.addLayer(marker);

};

// инициализация карты
map.on('load', () => {
  setPageActive();
})
  .setView(
    CENTER_TOKYO, MAP_ZOOM);

// функция устанавливает Главную метку обратно в центр Токио
const setMainPointToBegin = function () {
  // перемещаем главную метку обратно в центр Токио
  mainMarker.setLatLng(CENTER_TOKYO);
  // задаём координаты главной метки в поле адоес формы
  setAddressField (mainMarker.getLatLng().lat.toFixed(5), mainMarker.getLatLng().lng.toFixed(5));
  // задаём карте центр и зум
  map.setView(CENTER_TOKYO, MAP_ZOOM);
};

// функция сброса карты - отрисовка всех объектов
const resetMap = function () {
  // обращаемся к серверу и получаем объекты
  getData (
    (advertsFromServer) => {
      //получаем объявления от сервера
      setHousing(advertsFromServer);
    },
    () => showAlert('Не удалось получить данные от сервера. Попробуйте ещё раз'),
  );
}

export {createMarkerOnMap, setMainPointToBegin, makePoins, resetMap};
