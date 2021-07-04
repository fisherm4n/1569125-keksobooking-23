import { randomFloat, randomValue, rndArray } from './utils.js';
import { generateTemplate } from './generate-templates.js';
import {disableForm, activateForm} from './form-activation.js';
import './generate-templates.js';
const NUMBER_OF_ADS = 10;
const SRC_IMG = 'img/avatars/user0';
const LAT_MIN = 35.65;
const LAT_MAX = 35.7;
const LNG_MIN = 139.7;
const LNG_MAX = 139.8;
const PRECISION = 5;
const TYPE = ['flat', 'house', 'bungalow', 'palace', 'hotel'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const createAds = () => {
  const author = {
    avatar: `${SRC_IMG + randomValue(1, 8)}.png`,
  };
  const location = {
    lat: randomFloat(LAT_MIN, LAT_MAX, PRECISION),
    lng: randomFloat(LNG_MIN, LNG_MAX, PRECISION),
  };
  const offer = {
    title: 'Уютная квартира в центре.Звучание города',
    address: `${location.lat}, ${location.lng}`,
    price: randomValue(100, 2000),
    type: TYPE[randomValue(0, TYPE.length - 1)],
    rooms: randomValue(1, 5),
    guests: randomValue(1, 5),
    checkin: CHECKIN[randomValue(0, CHECKIN.length - 1)],
    checkout: CHECKOUT[randomValue(0, CHECKOUT.length - 1)],
    features: rndArray(FEATURES),
    description:
      'Двухкомнатная квартира,панорамный вид на город, природу и т.д. ',
    photos: rndArray(PHOTOS),
  };
  const about = { author: author, offer: offer, location: location };
  return about;
};
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
disableForm(adForm);
activateForm(adForm);
disableForm(mapFilters);
activateForm(mapFilters);
const map = document.querySelector('#map-canvas');
const arrayOfAds = new Array(NUMBER_OF_ADS).fill('').map(() => createAds());
const eachTepmlate = generateTemplate(arrayOfAds);
map.appendChild(eachTepmlate.children[1]);
