/* global _:readonly */
import {updatePoints} from './map.js';

// задаём количество фильтруемых объявлений
const NUMBER_DISPLAYED_ADS = 10;
// задаём задержку для перерисовки маркеров
const RERENDER_DELAY = 500;

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
// находим все инпуты features
const featuresAll = filtersForm.querySelectorAll('input[type="checkbox"]');

// функция проверки объекта по типу жилья
const checkByType = function(element) {
  if (selectHousingType.value !== 'any') {
    return element.offer.type === selectHousingType.value;
  } else {
    return true;
  }
};
// функция проверки объекта по цене
const checkByPrice = function(element) {
  switch (selectHousingPrice.value) {
    case 'middle':
      return (element.offer.price >= 10000 && element.offer.price < 50000);
    case 'low':
      return element.offer.price < 10000;
    case 'high':
      return element.offer.price >= 50000;
    default:
      return true;
  }
};
// функция проверки объекта по количеству комнат
const checkByRooms = function (element) {
  switch (Number(selectHousingRooms.value)) {
    case 1:
      return element.offer.rooms === 1;
    case 2:
      return element.offer.rooms === 2;
    case 3:
      return element.offer.rooms === 3;
    default:
      return true;
  }
}
// функция проверки объекта по количеству гостей
const checkByGuests = function (element) {
  switch (Number(selectHousingGuests.value)) {
    case 1:
      return element.offer.guests === 1;
    case 2:
      return element.offer.guests === 2;
    case 0:
      return element.offer.guests === 0;
    default:
      return true;
  }
}
// функция проверки объекта по features
const checkByFeatures = function (element, featuresAll) {
  let flag = true;
  for(let i = 0; i < featuresAll.length; i++) {
    if (featuresAll[i].checked) {
      let feature = featuresAll[i].value;
      flag = flag && element.offer.features.includes(feature);
    }
  }
  return flag;
}
// функция применяет фильтры к массиву объявлений, возвращает отфильтрованный массив
const applyFilters = (adverts) => {
  const filteredItems= [];
  for(let i = 0; i < adverts.length; i++) {
    const item = adverts[i];
    if (checkByType(item) &&
      checkByPrice(item) &&
      checkByRooms(item) &&
      checkByGuests(item) &&
      checkByFeatures(item, featuresAll)) {
      filteredItems.push(item);
    }
    if (filteredItems.length >= NUMBER_DISPLAYED_ADS) {
      break;
    }
  }
  return filteredItems;
}
// функция защиты от дребезга при использовании формы фильтров
const debounceUpdatePoints = _.debounce(() => updatePoints(), RERENDER_DELAY);
// прослушиваем событие изменения формы
filtersForm.addEventListener('change', function () {
  // применяем функцию перерисовки маркеров
  debounceUpdatePoints();
});

export {applyFilters};
