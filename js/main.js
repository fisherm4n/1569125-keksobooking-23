const NUMBER_OF_ADS = 10;
const SRC_IMG = 'img/avatars/user0';
const LAT_MIN = 35.65;
const LAT_MAX = 35.7;
const LNG_MIN = 139.7;
const LNG_MAX = 139.8;
const PRECISION = 5;
const TYPE = ['flat', 'house', 'room'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
function randomFloat(min, max, afterDot = 1) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const randomResult = Math.random() * (upper - lower + 1) + lower;
  return randomResult.toFixed(afterDot);
}
function randomValue(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
function rndArray(someArray) {
  const arrayIndex = randomValue(0, someArray.length);
  const arrayIndex2 = randomValue(0, someArray.length);
  if (arrayIndex > arrayIndex2) {
    return someArray.slice(arrayIndex2, arrayIndex).join();
  } else if (arrayIndex === arrayIndex2) {
    return someArray.slice(0, someArray.length).join();
  } else {
    return someArray.slice(arrayIndex, arrayIndex2).join();
  }
}
const createAds = () => {
  const author = {
    avatar: `${SRC_IMG + randomValue(1, 8)}.png`,
  };
  const location = {
    lat: randomFloat(LAT_MIN, LAT_MAX, PRECISION),
    lng: randomFloat(LNG_MIN, LNG_MAX, PRECISION),
  };
  const about = {
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
  const offer = [author, about, location];
  return offer;
};

const createArrayOfAds = () => {
  const arrayOfAds = [];
  for (let i = 0; i <= NUMBER_OF_ADS; i++) {
    arrayOfAds.push(createAds());
  }
  return arrayOfAds;
}
console.log(createArrayOfAds());
