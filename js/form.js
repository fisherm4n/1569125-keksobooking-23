import { sendUserData } from './requests.js';

import { showModalSuccess, showModalError } from './modal.js';
const adForm = document.querySelector('.ad-form');

const mapFilters = document.querySelector('.map__filters');
const userAdPrice = adForm.querySelector('input[name="price"]');
const userAvatarChooser = adForm.querySelector('input[name="avatar"]');
const userAvatarPreview = adForm.querySelector('.ad-form-header__user-avatar');
const userPhotoChooser = adForm.querySelector('input[name="images"]');
const userPhotoPreviewContainer = adForm.querySelector('.ad-form__photo');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_USER_AVATAR = 'img/muffin-grey.svg';
const DEFAULT_USER_PRICE = 1000;

userAvatarChooser.addEventListener('change', () => {
  const file = userAvatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      userAvatarPreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

userPhotoChooser.addEventListener('change', () => {
  const file = userPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const userPhotoPreview = document.createElement('img');
      userPhotoPreview.src = reader.result;
      userPhotoPreview.style.width = '60px';
      userPhotoPreview.style.height = '60px';
      userPhotoPreviewContainer.style.display = 'flex';
      userPhotoPreviewContainer.style.alignItems = 'center';
      userPhotoPreviewContainer.style.justifyContent = 'center';
      userPhotoPreview.style.objectFit = 'contain';
      userPhotoPreviewContainer.appendChild(userPhotoPreview);
    });

    reader.readAsDataURL(file);
  }
});
const resetForm = ()=>{
  adForm.reset();
  userAvatarChooser.src = DEFAULT_USER_AVATAR;
  userAdPrice.placeholder = DEFAULT_USER_PRICE;
  userPhotoPreviewContainer.textContent = '';
}
function disableForm() {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  adForm.querySelectorAll('fieldset').forEach((item) => {
    item.disabled = true;
  });
  mapFilters.querySelectorAll('fieldset').forEach((item) => {
    item.disabled = true;
  });
}
function activateForm() {
  setTimeout(()=>{
    adForm.classList.remove('ad-form--disabled');
    adForm.querySelectorAll('fieldset').forEach((item) => {
      item.disabled = false;
    });
  },0);

}

function activateFilter() {
  mapFilters.classList.remove('map__filters--disabled');
  mapFilters.querySelectorAll('fieldset').forEach((item) => {
    item.disabled = false;
  });

}
adForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  sendUserData(showModalSuccess, showModalError, new FormData(adForm));
  resetForm();
});
disableForm();
export { disableForm, activateFilter, resetForm, activateForm };
