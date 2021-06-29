import { randomFloat, randomValue, rndArray } from "./utils.js";
import "./generate-templates.js";
const NUMBER_OF_ADS = 10;
const SRC_IMG = "img/avatars/user0";
const LAT_MIN = 35.65;
const LAT_MAX = 35.7;
const LNG_MIN = 139.7;
const LNG_MAX = 139.8;
const PRECISION = 5;
const TYPE = ["flat", "house", "room"];
const CHECKIN = ["12:00", "13:00", "14:00"];
const CHECKOUT = ["12:00", "13:00", "14:00"];
const FEATURES = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner",
];
const PHOTOS = [
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg",
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg",
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg",
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
    title: "Уютная квартира в центре.Звучание города",
    address: `${location.lat}, ${location.lng}`,
    price: randomValue(100, 2000),
    type: TYPE[randomValue(0, TYPE.length - 1)],
    rooms: randomValue(1, 5),
    guests: randomValue(1, 5),
    checkin: CHECKIN[randomValue(0, CHECKIN.length - 1)],
    checkout: CHECKOUT[randomValue(0, CHECKOUT.length - 1)],
    features: rndArray(FEATURES),
    description:
      "Двухкомнатная квартира,панорамный вид на город, природу и т.д. ",
    photos: rndArray(PHOTOS),
  };
  const about = { author: author, offer: offer, location: location };
  return about;
};

const createArrayOfAds = () => {
  const arrayOfAds = [];
  for (let index = 0; index < NUMBER_OF_ADS; index++) {
    arrayOfAds.push(createAds());
  }
  return arrayOfAds;
};
createArrayOfAds();
const firstTemplate = document
  .querySelector("#card")
  .content.querySelector(".popup");
const map = document.querySelector("#map-canvas");
const TYPE_OF_BOOK = {
  flat: "Квартира",
  bungalow: "Бунгало",
  house: "Дом",
  palace: "Дворец",
  hotel: "Отель",
};
 const offerElement = firstTemplate.cloneNode(true);
 map.appendChild(offerElement);
 const generateTemplate = function (offers) {
   const fragment = document.createDocumentFragment();
   offers.forEach({offer,author}) => {
     const offerElement = firstTemplate.cloneNode(true);
     const title = offerElement.querySelector('.popup__title');
     title.textContent =offer.title;
     const address = offerElement.querySelector('..popup__text--address');
     address.textContent =  offer.address;
    const price = offerElement.querySelector('.price__teext--price');
    price.textContent =`${offer.price}₽/ночь`;
    const rooms = offerElement.querySelector('..popup__text--capacity');
    rooms.textContent = `${offer.rooms} комнаты для ${offer.guests} `;
    const time = offerElement.querySelector('.popup__text--time');
    time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    const features = offerElement.querySelector('.popup__features');
    features.textContent = offer.features;
    const description = offerElement.querySelector('.popup_description');
    description.textContent = offer.description;
    const photo = offerElement.querySelector('.popup__photos');
   
   
    const avatar =offerElement.querySelector('.popup__avatar');
   avatar.src = author.avatar; 
  }
 };
