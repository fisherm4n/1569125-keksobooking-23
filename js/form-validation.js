const userAd = document.querySelector('.ad-form');
const userAdTitle = userAd.querySelector('input[name="title"]');
const userAdPrice = userAd.querySelector('input[name="price"]');
const userAdRooms = userAd.querySelector('select[name="rooms"]');
const userAdCapacity = userAd.querySelector('select[name="capacity"]');
const optionsCapacity = Array.from(userAdCapacity.children);
const userAdType = userAd.querySelector('select[name="type"]');
const userAdCheckin = userAd.querySelector('select[name="timein"]');
const userAdCheckout = userAd.querySelector('select[name="timeout"]');
userAdTitle.addEventListener('input', () => {
  const valueLength = userAdTitle.value.length;
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;

  if (valueLength < MIN_TITLE_LENGTH) {
    userAdTitle.setCustomValidity(`Минимально допустимое количество символов: ${MIN_TITLE_LENGTH}. Длина текста сейчас: ${valueLength}.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    userAdTitle.setCustomValidity(`Превышено максимально допустимое количество символов на: ${valueLength - MAX_TITLE_LENGTH}`);
  } else {
    userAdTitle.setCustomValidity('');
  }

  userAdTitle.reportValidity();
});

userAdPrice.addEventListener('input', () => {
  if (userAdPrice.value > 1000000) {
    userAdPrice.setCustomValidity('Максимальная цена 1 000 000');
  } else {
    userAdPrice.setCustomValidity('');
  }

  userAdPrice.reportValidity();
});

userAdPrice.addEventListener('input', () => {
  const minPrice = +userAdPrice.placeholder;

  if (userAdPrice.value > 1000000 || userAdPrice.value < minPrice) {
    userAdPrice.setCustomValidity(`Минимальная цена ${minPrice}. Максимальная цена 1000000.`);
  } else {
    userAdPrice.setCustomValidity('');
  }

  userAdPrice.reportValidity();
});

document.addEventListener('DOMContentLoaded', () => {
  optionsCapacity[0].setAttribute('disabled', 'disabled');
  optionsCapacity[1].setAttribute('disabled', 'disabled');
  optionsCapacity[3].setAttribute('disabled', 'disabled');
});
const typeWithPrice = {
  BUNGALO: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};
const changePriceAttribute = (minPrice) => {
  userAdPrice.setAttribute('min', minPrice);
  userAdPrice.setAttribute('placeholder', minPrice);
};

userAdCheckin.addEventListener('change', () => {
  userAdCheckout.value = userAdCheckin.value;
});

userAdCheckout.addEventListener('change', () => {
  userAdCheckin.value = userAdCheckout.value;
});

userAdRooms.addEventListener('change', (event) => {
  optionsCapacity.forEach((element) => element.removeAttribute('disabled'));

  switch (event.target.value) {
    case '1':
      optionsCapacity[0].setAttribute('disabled', 'disabled');
      optionsCapacity[1].setAttribute('disabled', 'disabled');
      optionsCapacity[3].setAttribute('disabled', 'disabled');
      break;
    case '2':
      optionsCapacity[0].setAttribute('disabled', 'disabled');
      optionsCapacity[3].setAttribute('disabled', 'disabled');
      break;
    case '3':
      optionsCapacity[3].setAttribute('disabled', 'disabled');
      break;
    case '100':
      optionsCapacity[0].setAttribute('disabled', 'disabled');
      optionsCapacity[1].setAttribute('disabled', 'disabled');
      optionsCapacity[2].setAttribute('disabled', 'disabled');
      break;
  }


});
userAdRooms.addEventListener('change', () => {
  optionsCapacity.forEach((element) => {
    if (element.hasAttribute('disabled') && element.selected) {
      userAdCapacity.setCustomValidity('Выберите допустимое значение для этого поля.');
    }
  });
});
userAdCapacity.addEventListener('change', () => {
  optionsCapacity.forEach((element) => {
    if (!element.hasAttribute('disabled') && element.selected) {
      userAdCapacity.setCustomValidity('');
    }
  });
});
userAdType.addEventListener('change', (event) => {
  switch (event.target.value) {
    case 'bungalow':
      changePriceAttribute(typeWithPrice.BUNGALO);
      break;
    case 'flat':
      changePriceAttribute(typeWithPrice.FLAT);
      break;
    case 'hotel':
      changePriceAttribute(typeWithPrice.HOTEL);
      break;
    case 'house':
      changePriceAttribute(typeWithPrice.HOUSE);
      break;
    case 'palace':
      changePriceAttribute(typeWithPrice.PALACE);
      break;


  }
});
