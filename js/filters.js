//import {getData} from './api.js';
//import {showAlert} from './util.js';

// функция принимает тип жилья, возвращает массив отфильтрованных объектов согласно этого типа
const filterByHousingType = function (housingType, arrayObjects) {
  const filteredArrayObjects = arrayObjects.filter(function(element) {
    return element.offer.type === housingType;
  });
  return filteredArrayObjects;
}

export {filterByHousingType};
