import { activateFilter } from './form.js';
import './form-validation.js';
import { addToMap} from './map.js';
import { debounce } from './utils.js';
import { onChangeMap } from './filter.js';
import { getModalError } from './modal.js';

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      activateFilter();
      return response.json();
    }
    throw new Error(`${response.status} - ${response.statusText}`);
  })
  .then((data) => {
    addToMap(data);
    onChangeMap(debounce(() => addToMap(data)));
  })
  .catch(() => {
    getModalError();
  });
