import {makePoins, markerGroup} from './map.js';

// функция принимает тип жилья, возвращает массив отфильтрованных объектов согласно этого типа
const filterByHousingType = function (housingType = 'any', arrayObjects) {
  const filteredArrayObjects = arrayObjects.filter(function(element) {
    if (housingType !== 'any') {
      return element.offer.type === housingType;
    } else {
      return element;
    }

  });
  return filteredArrayObjects;
}

const filterByHousingPrice = function (housingPrice = 'any', arrayObjects) {
  const filteredArrayObjects = arrayObjects.filter(function(element) {
    let priceFromObject = element.offer.price;
    if (housingPrice === 'middle') {
      return (priceFromObject > 10000 && priceFromObject < 50000);
    } else if (housingPrice === 'low') {
      return priceFromObject < 10000;
    } else if (housingPrice === 'high') {
      return priceFromObject > 50000;
    } else {
      return element;
    }
  });
  return filteredArrayObjects;
}

const filterByHousingRooms = function (housingRooms = 'any', arrayObjects) {
  const filteredArrayObjects = arrayObjects.filter(function(element) {
    let roomsFromObject = element.offer.rooms;
    switch (housingRooms) {
      case 1:
        return roomsFromObject === 1;
      case 2:
        return roomsFromObject === 2;
      case 3:
        return roomsFromObject === 3;
      default:
        return element;
    }
  });
  return filteredArrayObjects;
}

const filterByHousingGuests = function (housingGuests = 'any', arrayObjects) {
  const filteredArrayObjects = arrayObjects.filter(function(element) {
    let guestsFromObject = element.offer.guests;
    switch (housingGuests) {
      case 1:
        return guestsFromObject === 1;
      case 2:
        return guestsFromObject === 2;
      case 0:
        return guestsFromObject === 0;
      default:
        return element;
    }
  });
  return filteredArrayObjects;
}

const filterByHousingFeatures = function (housingFeatures, arrayObjects) {
  const filteredArrayObjects = arrayObjects.filter(function(element) {
    // ищем наличие элемента в массиве
    return element.offer.features.includes(housingFeatures);
  });
  return filteredArrayObjects;
}

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

const setTypeHousing = function(adverts) {

  makePoins(adverts);
  // прослушиваем событие изменения селекта
  filtersForm.addEventListener('change', function () {
    // очищаем группу слоёв
    if (markerGroup) {
      markerGroup.clearLayers();
    }

    let advertsAfterFilters = filterByHousingType(selectHousingType.value, adverts);

    advertsAfterFilters = filterByHousingPrice(selectHousingPrice.value, advertsAfterFilters);

    advertsAfterFilters = filterByHousingRooms(Number(selectHousingRooms.value), advertsAfterFilters);

    advertsAfterFilters = filterByHousingGuests(Number(selectHousingGuests.value), advertsAfterFilters);

    if (inputFilterWifi.checked) {
      advertsAfterFilters = filterByHousingFeatures('wifi', advertsAfterFilters);
    }
    if (inputFilterDishwasher.checked) {
      advertsAfterFilters = filterByHousingFeatures('dishwasher', advertsAfterFilters);
    }
    if (inputFilterParking.checked) {
      advertsAfterFilters = filterByHousingFeatures('parking', advertsAfterFilters);
    }
    if (inputFilterWasher.checked) {
      advertsAfterFilters = filterByHousingFeatures('washer', advertsAfterFilters);
    }
    if (inputFilterElevator.checked) {
      advertsAfterFilters = filterByHousingFeatures('elevator', advertsAfterFilters);
    }
    if (inputFilterConditioner.checked) {
      advertsAfterFilters = filterByHousingFeatures('conditioner', advertsAfterFilters);
    }

    makePoins(advertsAfterFilters);
  });
};

export {setTypeHousing};
