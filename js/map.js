import { activateForm } from './form.js';
import { createCards } from './card.js';
import { filterAds } from './filter.js';

const userAddress = document.querySelector('input[name="address"]');
const map = L.map('map-canvas');
const mainPinMarker = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const userMarker = L.marker(
  {
    lat: 35.675,
    lng: 139.75,
  },
  {
    draggable: true,
    icon: mainPinMarker,
  },
);

userMarker.addTo(map);
const initMap = () => {
  map.on('load', () => {
    activateForm();
  });

  map.setView(
    {
      lat: 35.675,
      lng: 139.75,
    },13 );

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
};
initMap();

// Забирает координаты от ручного перемещения красного маркера и передаёт их в инпут адреса.
userMarker.on('moveend', (evt) => {
  userAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target
    .getLatLng()
    .lng.toFixed(5)}`;
});
const resetMap = () => {
  userMarker.setLatLng({
    lat: 35.675,
    lng: 139.75,
  });

  map.setView(
    {
      lat: 35.675,
      lng: 139.75,
    },13 );
};

const markerSet = L.layerGroup().addTo(map);
// ДОБАВЛЯЕМ ДАННЫЕ НА КАРТУ
const addToMap = (data) => {
  markerSet.clearLayers();
  const filter = filterAds(data);
  const popups = createCards(filter);
  for (let index = 0; index < popups.length; index++) {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: filter[index].location.lat,
        lng: filter[index].location.lng,
      },
      {
        icon,
      },
    );
    marker.addTo(markerSet).bindPopup(popups[index]);
  }

};

export { userMarker, initMap, resetMap, addToMap };
