import {showAdvert} from './popup.js';
import {similarAdverts} from './data.js';

// задаём номер объявления для примера
const NUMBER_OF_ADVERT = 1;

const currentDataAdvert = similarAdverts[NUMBER_OF_ADVERT];

showAdvert(currentDataAdvert);
