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
  } else if (node.hasAttribute('src')) {
    node.src = nodeValue;
  }
  node.textContent = nodeValue;
};

const generateTemplate = function ({author, offer}) {
  const offersElement = firstTemplate.cloneNode(true);
  const title = offersElement.querySelector('.popup__title');
  checkValue(title, offer.title);
  const address = offersElement.querySelector('.popup__text--address');
  checkValue(address, offer.address);
  const price = offersElement.querySelector('.popup__text--price');
  price.textContent = `${offer.price}₽/ночь`;
  const type = offersElement.querySelector('.popup__type');
  type.textContent = TYPE_OF_BOOK[offer.type];
  const rooms = offersElement.querySelector('.popup__text--capacity');
  rooms.textContent = `${offer.rooms} комнаты для ${offer.guests} `;
  const time = offersElement.querySelector('.popup__text--time');
  time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  const features = offersElement.querySelector('.popup__features');
  features.textContent = offer.features;
  const description = offersElement.querySelector('.popup__description');
  description.textContent = offer.description;
  const photos = offersElement.querySelector('.popup__photos');
  const img = offersElement.querySelector('.popup__photo');
  offer.photos.forEach((imgEl) => {
    checkValue(img, imgEl);
    photos.appendChild(img.cloneNode(true));
  });
  const avatar = offersElement.querySelector('.popup__avatar');
  checkValue(avatar, author.avatar);
  return offersElement;
};
export { generateTemplate };
