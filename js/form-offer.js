
import {sendOffersData} from './fetch-data.js';
import { resetMap } from './map.js';
import {createSuccessMessage, createErrorsMessage} from './page.js';
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const ALERT_SHOW_TIME = 5000;
const KEY_ESC = 'Esc';
const KEY_ESCAPE = 'Escape';
const fieldsetAdForm = adForm.querySelectorAll('fieldset');
const mapFilter = mapFilters.querySelectorAll('.map__filter');
const mapFilterFieldset = mapFilters.querySelector('fieldset');
const adTimeIn = adForm.querySelector('#timein');
const adTimeOut = adForm.querySelector('#timeout');
const disableForm = function (el) {
  el.classList.add(`${el.classList[0]}--disabled`);
  el.querySelectorAll('fieldset').forEach((item) => {
    item.disabled = true;
  });
};
const disableAdForm = function(){
  return disableForm(adForm);
};

const disablemapFilters = function(){
  return disableForm(mapFilters);
};
const activateForm = function (el) {
  el.classList.remove(`${el.classList[1]}`);
  el.querySelectorAll('fieldset').forEach((item) => {
    item.disabled = false;
  });
};
const activateAdForm = function(){
  return activateForm(adForm);
};
const activateMapForm = function () {
  return  activateForm(mapFilters);
};

// activateAdForm ();
const selectType = adForm.querySelector('#type');
const inputPrice = adForm.querySelector('#price');
const selectRooms = adForm.querySelector('#room_number');
const selectGuests = adForm.querySelector('#capacity');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
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
//

// const bodyBlock = document.querySelector('body');
// const successMessageTemlate = document.querySelector ('#success');
// const errorMessageTemplate = document.querySelector ('#error');
// const createMessage = (template) => {
//   const messageFragment = document.createDocumentFragment();
//   const message = template.cloneNode(true).content;
//   messageFragment.appendChild(message);
//   return bodyBlock.appendChild(messageFragment);
// };

// const createSuccessMessage = () => {
//   createMessage (successMessageTemlate);

//   const successClass = document.querySelector('.success');
//   const onEscSuccesMessage = (evt) => {
//     if (evt.key === KEY_ESC || evt.key === KEY_ESCAPE) {
//       closeMessage (successClass);
//       document.removeEventListener('keydown', onEscSuccesMessage);
//     }
//   };

//   successClass.addEventListener('click', () => {
//     closeMessage (successClass);
//     document.removeEventListener('keydown', onEscSuccesMessage);
//   });

//   document.addEventListener('keydown', onEscSuccesMessage);
// };

// const createErrorsMessage = () => {
//   createMessage(errorMessageTemplate);

//   const errorClass = document.querySelector('.error');
//   const onEscErrorMessage = (evt) => {
//     if (evt.key === KEY_ESC || evt.key === KEY_ESCAPE) {
//       closeMessage (errorClass);
//       document.removeEventListener('keydown', onEscErrorMessage);
//     }
//   };

//   errorClass.addEventListener('click', () => {
//     closeMessage(errorClass);
//     document.removeEventListener('keydown', onEscErrorMessage);
//   });

//   document.addEventListener('keydown', onEscErrorMessage);

//   const errorButton = errorClass.querySelector('.error__button');
//   errorButton.addEventListener('click', () => {
//     closeMessage(errorClass);
//     document.removeEventListener('keydown', onEscErrorMessage);
//   });
// };
const onPriceChange = function () {
  inputPrice.placeholder = MINPRICE_FOR_TYPE[selectType.value];
  inputPrice.min = MINPRICE_FOR_TYPE[selectType.value];
};
const setUserFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) =>{
    if(!onRoomToGuestCheck()) {
      return evt.preventDefault();
    }
    evt.preventDefault();
    sendOffersData(
      ()=>{
      console.log('forma otprabilas');
      onSuccess();
      adForm.reset();
      mapFilters.reset();
      resetMap();
      onPriceChange();
    },
    () => onFail(),
    new FormData(evt.target));
  });
};


setUserFormSubmit(createSuccessMessage, createErrorsMessage);
selectGuests.addEventListener('change', onRoomToGuestCheck);
selectRooms.addEventListener('change', onRoomToGuestCheck);
selectType.addEventListener('change', onPriceChange);
export { disableAdForm, disablemapFilters, activateAdForm, activateMapForm,setUserFormSubmit };
