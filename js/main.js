import './util.js';
import './data.js';
import './popup.js';
import './map.js';
import './form.js';


import {createMarkerOnMap} from './map.js';
import {addAdvertFormSubmit} from './form.js';
import {getData} from './api.js';

getData((advertsFromServer) => {
  //console.log(advertsFromServer);
  // перебираем массив объектов полученных с сервера
  for (let i = advertsFromServer.length - 1; i >= 0; i--) {
    createMarkerOnMap(advertsFromServer[i]);
  }
});

addAdvertFormSubmit();
