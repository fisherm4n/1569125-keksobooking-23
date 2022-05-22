const mapForm = document.querySelector('.map__filters');
const mapCheckbox = document.querySelectorAll('input[name="features"]');
const selectGuests = document.querySelector('select[name="housing-guests"]');
const selectRooms = document.querySelector('select[name="housing-rooms"]');
const selectPrice = document.querySelector('select[name="housing-price"]');
const selectType = document.querySelector('select[name="housing-type"]');
// ФИЛЬТРАЦИЯ ДАННЫХ
const filterGuests = (element) => element.offer.guests === Number(selectGuests.value) || selectGuests.value === 'any';
const filterRooms = (element) => element.offer.rooms === Number(selectRooms.value) || selectRooms.value === 'any';
const filterPrice = (element) => {
  switch (selectPrice.value) {
    case 'low':
      return element.offer.price > 0 && element.offer.price < 10000;
    case 'middle':
      return element.offer.price >= 10000 && element.offer.price < 50000;
    case 'high':
      return element.offer.price >= 50000;
    case 'any':
      return true;
  }
};
const filterType = (element) => element.offer.type === selectType.value || selectType.value === 'any';
const filterFeatures = (data) => {
  const similarAds = data.slice();

  const currentFeatures = Array.from(mapCheckbox).filter((checkbox) => checkbox.checked);
  const filteredFeatures = similarAds.filter((ad) => {
    return currentFeatures.every((feature) => {
      if (ad.offer.features) {
        return ad.offer.features.includes(feature.value);
      }
    });
  });
  return filteredFeatures;
};
const filterAds = (data) => {
  const filteredFeatures = filterFeatures(data)
    .filter(filterGuests)
    .filter(filterPrice)
    .filter(filterType)
    .filter(filterRooms);
  return filteredFeatures;
};
function onChangeMap(cb) {
  mapForm.addEventListener('change', () => {
    cb();
  });
}
export { filterAds, onChangeMap };
