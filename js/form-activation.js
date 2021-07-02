
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

export {disableForm,activateForm};