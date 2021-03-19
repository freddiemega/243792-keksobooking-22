import {makePoins} from './map.js';

// находим форму фильтров
const filtersForm = document.querySelector('.map__filters');
// находим селект тип жилья
const selectHousingType = filtersForm.querySelector('#housing-type');
// находим селект цены
const selectHousingPrice = filtersForm.querySelector('#housing-price');
// находим селект количества комнат
const selectHousingRooms = filtersForm.querySelector('#housing-rooms');
// находим селект количества гостей
const selectHousingGuests = filtersForm.querySelector('#housing-guests');
// находим инпуты features
const inputFilterWifi = filtersForm.querySelector('#filter-wifi');
const inputFilterDishwasher = filtersForm.querySelector('#filter-dishwasher');
const inputFilterParking = filtersForm.querySelector('#filter-parking');
const inputFilterWasher = filtersForm.querySelector('#filter-washer');
const inputFilterElevator = filtersForm.querySelector('#filter-elevator');
const inputFilterConditioner = filtersForm.querySelector('#filter-conditioner');

// функция фильтрации объявлений
const setHousing = function (adverts) {

  makePoins(adverts);
  // прослушиваем событие изменения селекта
  filtersForm.addEventListener('change', function () {

    const housingType = selectHousingType.value;
    const housingPrice = selectHousingPrice.value;
    const housingRooms = selectHousingRooms.value;
    const housingGuests = selectHousingGuests.value;
    const wifi = inputFilterWifi.checked;
    const dishwasher = inputFilterDishwasher.checked;
    const parking = inputFilterParking.checked;
    const washer = inputFilterWasher.checked;
    const elevator = inputFilterElevator.checked;
    const conditioner = inputFilterConditioner.checked;

    let filters = [
      o => {
        if (housingType !== 'any') {
          return o.offer.type === housingType;
        } else {
          return true;
        }
      },
      o => {
        switch (housingPrice) {
          case 'middle':
            return (o.offer.price >= 10000 && o.offer.price < 50000);
          case 'low':
            return o.offer.price < 10000;
          case 'high':
            return o.offer.price > 50000;
          default:
            return true;
        }
      },
      o => {
        switch (Number(housingRooms)) {
          case 1:
            return o.offer.rooms === 1;
          case 2:
            return o.offer.rooms === 2;
          case 3:
            return o.offer.rooms === 3;
          default:
            return true;
        }
      },
      o => {
        switch (Number(housingGuests)) {
          case 1:
            return o.offer.guests === 1;
          case 2:
            return o.offer.guests === 2;
          case 0:
            return o.offer.guests === 0;
          default:
            return true;
        }
      },
      o => {
        if (wifi) {
          return o.offer.features.includes('wifi');
        } else {
          return true;
        }
      },
      o => {
        if (dishwasher) {
          return o.offer.features.includes('dishwasher');
        } else {
          return true;
        }
      },
      o => {
        if (parking) {
          return o.offer.features.includes('parking');
        } else {
          return true;
        }
      },
      o => {
        if (washer) {
          return o.offer.features.includes('washer');
        } else {
          return true;
        }
      },
      o => {
        if (elevator) {
          return o.offer.features.includes('elevator');
        } else {
          return true;
        }
      },
      o => {
        if (conditioner) {
          return o.offer.features.includes('conditioner');
        } else {
          return true;
        }
      },
    ];
    let result = adverts.filter(o => filters.every(fn => fn(o)));

    makePoins(result);
  });
};

export {setHousing};
