const firstTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const TYPE_OF_BOOK = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const checkValue = function (node, nodeValue) {
  if (nodeValue === '') {
    node.classList.add('hidden');
  } else {
    node.textContent = nodeValue;
  }
};
const srcValue = function (node, nodeValue) {
  if (nodeValue === '') {
    node.classList.add('hidden');
  } else {
    node.src = nodeValue;
  }
};
const generateTemplate = function (offers) {
  const fragment = document.createDocumentFragment();
  offers.forEach(({ offer, author }) => {
    const offerElement = firstTemplate.cloneNode(true);
    const title = offerElement.querySelector('.popup__title');
    checkValue(title, offer.title);
    const address = offerElement.querySelector('.popup__text--address');
    checkValue(address, offer.address);
    const price = offerElement.querySelector('.popup__text--price');
    price.textContent = `${offer.price}₽/ночь`;
    const type = offerElement.querySelector('.popup__type');
    type.textContent = TYPE_OF_BOOK[offer.type];
    const rooms = offerElement.querySelector('.popup__text--capacity');
    rooms.textContent = `${offer.rooms} комнаты для ${offer.guests} `;
    const time = offerElement.querySelector('.popup__text--time');
    time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    const features = offerElement.querySelector('.popup__features');
    features.textContent = offer.features;
    const description = offerElement.querySelector('.popup__description');
    description.textContent = offer.description;
    const photos = offerElement.querySelector('.popup__photos');
    const img = offerElement.querySelector('.popup__photo');
    offer.photos.forEach((imgEl) => {
      srcValue(img, imgEl);
      photos.appendChild(img.cloneNode(true));
    });
    const avatar = offerElement.querySelector('.popup__avatar');
    srcValue(avatar, author.avatar);
    fragment.appendChild(offerElement);
  });
  return fragment;
};
export { generateTemplate };
