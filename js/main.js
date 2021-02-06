const TITLES = [
  'Милая, уютная квартирка в центре Токио',
  'Отличное жильё рядом с метро',
  'Прекрасный вариант для пары с детьми',
  'Сдаю помещение для студентов',
  'Хорошая квартирка, рядом рынок',
  'Двухэтажный дом на два хозяина',
  'Квартира на последнем этаже с прекрасным видом',
  'Уютный дом на окраине города',
  'Квартира на третьем этаже в центре',
  'Современный дом недалеко от центра',
];
const TYPES_REAL_ESTATE = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES_REAL_ESTATE = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTIONS = [
  'Уютная недвижимость для молодожёнов. Всё новое, отличный ремонт.',
  'Квартира с великолепным видом из окон. Санузел и ванна новые. Рядом школа и магазины.',
  'Прекрасный вариант для пар с детьми. Можно держать кошку.',
  'Помещение большое светлое, рядом торговы квартал, много магазинов и ж/д станция',
  'Сдаю на длительный срок, не менее полугода. Свежий ремонт.',
  'Квартира укомплектована полностью и недавно отремонтирована. Хороший спокойный район. Можно держать домашних животных (кошку, маленькую собаку).',
  'Вариант для семейных. Рядом школа, вся инфраструктура.',
  'Отличная квартира после капитального ремонта. Газовая плита, местное отопление.',
  'Квартира-студия в центре Токио. Подходит как бизнесменам, так и туристам.',
  'Отличный вариант для туристов. Центр. Все достопримечательности рядом. Императорский дворец, каналы с рыбками.',
];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const SIMILAR_ADVERT_COUNT = 10;

// функция случайное целое число из диапазона
const getRandom = function (minNumber, maxNumber) {
  const min = Math.min(minNumber, maxNumber);
  const max = Math.max(minNumber, maxNumber);
  return Math.ceil(Math.random() * (max - min) + min);
}
// функция случайное число из диапазона с заданным "количеством знаков после запятой"
const getRandomDecimalPlaces = function (minNumber, maxNumber, decimalPlaces) {
  const min = Math.min(minNumber, maxNumber);
  const max = Math.max(minNumber, maxNumber);
  let num = Math.random() * (max - min) + min;
  return Number(num.toFixed(decimalPlaces));
}
// функция возвращает 0 или 1 случайно
const getRandomBinary = function () {
  return Math.round(Math.random());
}
// функция возвращает случайный элемент массива
const getRandomArrayElement = (elements) => {
  return elements[Math.floor(Math.random()*elements.length)];
};
// функция возвращает массив с несколькими случайными значениями из исходного массива без повторов
const getMultipleValuesArray = function (sourceArray) {
  let tempArray = [];
  //цикл работает пока целевой массив пустой - если такое произошло случайно
  while (tempArray.length === 0) {
    tempArray = sourceArray.filter((arrayVariable) =>  {
      //переносим значение из исходного массива или нет случайно
      if (getRandomBinary() === 0) return arrayVariable;
    });
  }
  return tempArray;
}
// определяем счётчик
let counter = 0;

const createAdvert = () => {

  // создаём объект author
  let author = {
    avatar: 'img/avatars/user0' + getRandom(1, 8) + '.png',
  };
    // создаём объект location
  let location = {
    x: getRandomDecimalPlaces(35.65000, 35.70000, 5),
    y: getRandomDecimalPlaces(139.70000, 139.80000, 5),
  };
  // создаём объект offer
  let offer = {
    title: TITLES[counter],
    address: [location.x, location.y],
    price: getRandom(1000, 10000),
    type: getRandomArrayElement(TYPES_REAL_ESTATE),
    rooms: getRandom(1, 9),
    guests: getRandom(1, 40),
    checkin: getRandomArrayElement(CHECKIN_TIMES),
    checkout: getRandomArrayElement(CHECKOUT_TIMES),
    features: getMultipleValuesArray(FEATURES_REAL_ESTATE),
    description: DESCRIPTIONS[counter],
    photos: getMultipleValuesArray(PHOTOS),
  };
  // инкремент счётчика
  counter++;
  return [
    author,
    offer,
    location,
  ];
};

const similarAdverts = new Array(SIMILAR_ADVERT_COUNT).fill(null).map(() => createAdvert());

//console.log(similarAdverts);
similarAdverts;
