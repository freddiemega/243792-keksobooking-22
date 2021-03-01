// находим место вставки объявления
//const placeForAdvert = document.querySelector('#map-canvas');
// находим шаблон
//const newItemTemplate = document.querySelector('#card').content.querySelector('.popup');

// функция возвращает тип жилья по русски
const getTypeOfRealEstate = function (typeOfRealEstate) {
  switch (typeOfRealEstate) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalow':
      return 'Бунгало';
    default:
      return 'Квартира';
  }
}
// функция возвращает элементы списка "доступные удобства в объявлении"
const getListItemsFeatures = function (arrayFeatures) {
  let arrayFeaturesHTML = [];
  arrayFeatures.forEach (function (element) {
    // создаём элемент списка
    let listItem = document.createElement('li');
    // присваиваем элементу списка классы
    listItem.classList.add('popup__feature');
    listItem.classList.add('popup__feature--' + element);
    // наполняем массив элементов списка
    arrayFeaturesHTML.push(listItem.outerHTML);
  });
  // возвращаем слитый построчно HTML
  return arrayFeaturesHTML.join('\n');
}
// функция возвращает HTML фотографий для вставки
const getPhotos = function (arrayPhotos) {
  let arrayPhotosHTML = [];
  arrayPhotos.forEach (function (element) {
    // создаём изображение img
    let imgItem = document.createElement('img');
    // присваиваем изображению класс
    imgItem.classList.add('popup__photo');
    // присваиваем атрибуты
    imgItem.setAttribute('src', element);
    imgItem.setAttribute('width', 45);
    imgItem.setAttribute('height', 40);
    imgItem.setAttribute('alt', 'Фотография жилья');
    // наполняем массив изображений
    arrayPhotosHTML.push(imgItem.outerHTML);
  });
  // возвращаем слитый построчно HTML
  return arrayPhotosHTML.join('\n');
}

// функция возвращает объявление, принимает объект с данными и шаблон, возвращает HTML объявления
const createAdvertFromTemplate = function (valueDataAdvert, popupTemplate) {
  // клонируем объявление
  const advert = popupTemplate.cloneNode(true);
  // аватар пользователя
  advert.querySelector('.popup__avatar').src = valueDataAdvert.author.avatar;
  // заголовок объявления
  advert.querySelector('.popup__title').textContent = valueDataAdvert.offer.title;
  // адрес
  advert.querySelector('.popup__text--address').textContent = valueDataAdvert.offer.address;
  // цена
  advert.querySelector('.popup__text--price').innerHTML = valueDataAdvert.offer.price + '  <span>₽/ночь</span>';
  // тип жилья
  advert.querySelector('.popup__type').textContent = getTypeOfRealEstate(valueDataAdvert.offer.type);
  // количество гостей и комнат
  advert.querySelector('.popup__text--capacity').textContent = valueDataAdvert.offer.rooms + ' комнаты для ' + valueDataAdvert.offer.guests + ' гостей';
  // заезд отъезд
  advert.querySelector('.popup__text--time').textContent = 'Заезд после ' + valueDataAdvert.offer.checkin + ', выезд до ' + valueDataAdvert.offer.checkout;
  // все доступные удобства в объявлении
  advert.querySelector('.popup__features').innerHTML = getListItemsFeatures (valueDataAdvert.offer.features);
  // описание объекта недвижимости
  advert.querySelector('.popup__description').textContent = valueDataAdvert.offer.description;
  // все фотографии из списка
  advert.querySelector('.popup__photos').innerHTML = getPhotos (valueDataAdvert.offer.photos);

  return advert;
}

// экспорт функции создания и размещения объявления
export {createAdvertFromTemplate, getTypeOfRealEstate, getListItemsFeatures, getPhotos};
