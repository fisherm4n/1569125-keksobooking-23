import { randomFloat, randomValue, getElementsArray, endOfGuest, numOfAva, endOfRooms } from './utils.js';

const LAT_MIN = 35.65;
const LAT_MAX = 35.7;
const LNG_MIN = 139.7;
const LNG_MAX = 139.8;
const PRECISION = 5;

const adsTemplate = document.querySelector('#card').content.querySelector('.popup');
const titles = ['Под сенью клёнов', 'Дотянуться до небес', 'Под сенью клёнов', 'Дом под старину', 'Домашняя торжественность', 'Залог покоя и надежности'];
const checkInTime = ['12:00', '13:00', '14:00'];
const checkOutTime = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const typeFinish = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];



// function createAds() {
//   const author = {
//     avatar: `img/avatars/user${numOfAva()}.png`,
//   };
//   const location = {
//     lat: `${randomFloat(LAT_MIN, LAT_MAX, PRECISION)}`,
//     lng: `${randomFloat(LNG_MIN, LNG_MAX, PRECISION)}`,
//   };
//   const offer = {
//     title: `${titles[randomValue(0, titles.length - 1)]}`,
//     address: `${location.lat}, ${location.lat}`,
//     price: randomValue(100, 2000),
//     type: typeFinish[Object.keys(typeFinish)[randomValue(0, Object.keys(typeFinish).length - 1)]],
//     rooms: randomValue(1, 5),
//     guests: randomValue(1, 4),
//     checkin: checkInTime[randomValue(0, checkInTime.length - 1)],
//     checkout: checkOutTime[randomValue(0, checkOutTime.length - 1)],
//     features: getElementsArray(features),
//     description: 'Супер описание помещения',
//     photos: photos[randomValue(0, photos.length - 1)],

//   };
//   return { author, location, offer };
// }
// const COUNT_OF_OFFERS = 4;
// const createArrAds = () => new Array(COUNT_OF_OFFERS).fill(null).map(() => createAds());
// const arrOfOffers = createArrAds();


const getFeatures = (dataArr, elements, parentElement) => {
  if (dataArr) {
    const featuresNewClassArr = dataArr.map((feature) => `popup__feature--${feature}`);
    elements.forEach((feature) => {
      const modified = feature.classList[1];
      if (!featuresNewClassArr.includes(modified)) {
        feature.remove();
      }
    })
  } else {
    parentElement.remove();
  }
}
const createCards = (offers) => {
  const arrOfArticles = [];

  offers.forEach(({ author, offer, location }) => {
    const offerItem = adsTemplate.cloneNode(true);
    offerItem.querySelector('.popup__title').textContent = offer.title;
    offerItem.querySelector('.popup__text--address').textContent = offer.address;
    offerItem.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    offerItem.querySelector('.popup__type').textContent = typeFinish[offer.type];
    offerItem.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${endOfRooms(offer.rooms)}  для ${offer.guests} ${endOfGuest(offer.guests)}`;
    offerItem.querySelector('.popup__text--time').textContent = `${offer.checkin}, выезд до ${offer.checkout}`;
    offerItem.querySelector('.popup__description').textContent = offer.description;
    const featuresData = offer.features;
    const featuresListElement = offerItem.querySelector('.popup__features');
    const featureElements = offerItem.querySelectorAll('.popup__feature');
    getFeatures(featuresData, featureElements, featuresListElement);
    const photosBox = offerItem.querySelector('.popup__photos');
    if (offer.photos) {
      for (let index = 0; index < offer.photos.length; index++) {
        const newPhoto = offerItem.querySelector('.popup__photo').cloneNode(true);
        newPhoto.src = offer.photos[index];
        photosBox.append(newPhoto);
      }
      offerItem.querySelectorAll('.popup__photo')[0].remove();
    } else {
      photosBox.remove();
    }
    offerItem.querySelector('.popup__avatar').src = author.avatar;
    arrOfArticles.push(offerItem);

  });
  return arrOfArticles;
}
export { LAT_MIN, LNG_MIN, LAT_MAX, LNG_MAX, PRECISION, createCards };
