import {makePoins} from './map.js';

// задаём количество фильтруемых объявлений
const NUMBER_DISPLAYED_ADS = 10;
// задаём задержку для перерисовки маркеров
//const RERENDER_DELAY = 500;

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

let housingType = selectHousingType.value;
let housingPrice = selectHousingPrice.value;
let housingRooms = selectHousingRooms.value;
let housingGuests = selectHousingGuests.value;

// функция проверки объекта по типу жилья
const checkByType = function(element) {
  if (housingType !== 'any') {
    return element.offer.type === housingType;
  } else {
    return true;
  }
};
// функция проверки объекта по цене
const checkByPrice = function(element) {
  switch (housingPrice) {
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
  switch (Number(housingRooms)) {
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
  switch (Number(housingGuests)) {
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
const applyАFilters = (adverts) => {
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

//const debounceMakePoins = _.debounce(() => makePoins(applyАFilters(adverts), RERENDER_DELAY));

const setHousing = function (adverts) {
  // выводим все объявления на карту
  makePoins(adverts);

  // прослушиваем событие изменения всей формы
  filtersForm.addEventListener('change', function () {

    housingType = selectHousingType.value;
    housingPrice = selectHousingPrice.value;
    housingRooms = selectHousingRooms.value;
    housingGuests = selectHousingGuests.value;

    makePoins(applyАFilters(adverts));
    //console.log(applyАFilters(adverts));
    //return adverts.slice(1, 5);
    //return applyАFilters(adverts);
  });
  //return adverts;
}

/*
const filter = function (arr) {
  //return arr.slice(1, 7);
  //let arrSliced = arr.slice(1, 5);
  //let arrSliced = arr;
  //console.log(arr);

  const filterInside = function () {
    //console.log(arrSliced);
    let arrFiltered = arr.slice(1, 5);
    //console.log(arrFiltered);
    return arrFiltered;

  }
  return filterInside();

}
*/

export {setHousing};
