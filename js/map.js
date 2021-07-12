import { generateTemplate } from './generate-templates.js';
import { createAds } from './create-announcement.js';
import {
  disableAdForm,
  disablemapFilters,
  activateAdForm,
  activateMapForm
} from './form-offer.js';
const MAIN_LAT = 35.6895;
const MAIN_LNG = 139.692;
const NUMBER_OF_ADS = 10;
const address = document.querySelector('#address');
address.disabled = true;
const arrayOfAds = new Array(NUMBER_OF_ADS).fill('').map(() => createAds());
const resetButton = document.querySelector('.ad-form__reset');
disableAdForm();
disablemapFilters();
address.value = ' 35.6895,139.692 ';
const map = L.map('map-canvas')
  .on('load', () => {
    activateAdForm();
    activateMapForm();
    address.value = `${MAIN_LAT},${MAIN_LNG}`;
  })
  .setView(
    {
      lat: MAIN_LAT,
      lng: MAIN_LNG,
    },
    10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: MAIN_LAT,
    lng: MAIN_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  });
mainPinMarker.on('moveend', (evt) => {
  evt.target.getLatLng();
  address.value = `${mainPinMarker._latlng.lat.toFixed(4)}, ${mainPinMarker._latlng.lng.toFixed(3)}`;
});

mainPinMarker.addTo(map);
resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: MAIN_LAT,
    lng: MAIN_LNG,
  });
  map.setView(
    {
      lat: MAIN_LAT,
      lng: MAIN_LNG,
    },
    16);
});

arrayOfAds.forEach((point) => {
  const { lat, lng } = point.location;
  const icon = L.icon({
    iconUrl:
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    });

  marker.addTo(map).bindPopup(generateTemplate(point));
});
// const createCustomPopup = (point) => {
//     const balloonTemplate = document.querySelector('#balloon').content.querySelector('.balloon');
//     const popupElement = balloonTemplate.cloneNode(true);

//     popupElement.querySelector('.balloon__title').textContent = point.title;
//     popupElement.querySelector('.balloon__lat-lng').textContent = `Координаты: ${point.lat}, ${point.lng}`;

//     return popupElement;
//   };
// points.forEach((point) => {
//     const {lat, lng} = point;

//     const icon = L.icon({
//       iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
//       iconSize: [40, 40],
//       iconAnchor: [20, 40],
//     });

//     const marker = L.marker(
//       {
//         lat,
//         lng,
//       },
//       {
//         icon,
//       },
//     );

//     marker
//       .addTo(map)
//       .bindPopup(
//         createCustomPopup(point),
//       );
//   });
export { map };
