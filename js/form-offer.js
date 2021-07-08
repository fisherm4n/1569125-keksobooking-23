const disableForm = function (el) {
  el.classList.add(`${el.classList[0]}--disabled`);
  el.querySelectorAll('fieldset').forEach((item) => {
    item.disabled = true;
  });
};

const activateForm = function (el) {
  el.classList.remove(`${el.classList[1]}`);
  el.querySelectorAll('fieldset').forEach((item) => {
    item.disabled = false;
  });
};
const form = document.querySelector('.ad-form');
const selectType = form.querySelector('#type');
const inputPrice = form.querySelector('#price');
const selectRooms = form.querySelector('#room_number');
const selectGuests = form.querySelector('#capacity');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const MINPRICE_FOR_TYPE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
document.addEventListener('change', (event) => {
  if (event.target.id === 'timein') {
    timeOut.value = timeIn.value;
  } else if (event.target.id === 'timeout') {
    timeIn.value = timeOut.value;
  }
});
const onRoomToGuestCheck = function () {
  const room = selectRooms.value;
  const guest = selectGuests.value;
  if (room === '1' && guest !== '1') {
    selectGuests.setCustomValidity('Однокомнатная только для одного гостя.');
  } else if (room === '100' && guest !== '0') {
    selectGuests.setCustomValidity('Не для гостей');
  } else if (room === '2' && guest !== '2' && guest !== '1') {
    selectGuests.setCustomValidity('До двух гостей включительно');
  } else if (room === '3' && guest !== '3' && guest !== '2' && guest !== '1') {
    selectGuests.setCustomValidity('До трёх гостей включительно');
  } else {
    selectGuests.setCustomValidity('');
  }
  selectGuests.reportValidity();
};
///
onRoomToGuestCheck();
selectGuests.addEventListener('change', onRoomToGuestCheck);
selectRooms.addEventListener('change', onRoomToGuestCheck);
const onPriceChange = function () {
  inputPrice.placeholder = MINPRICE_FOR_TYPE[selectType.value];
  inputPrice.min = MINPRICE_FOR_TYPE[selectType.value];
};
onPriceChange();
selectType.addEventListener('change', onPriceChange);
export { disableForm, activateForm };
