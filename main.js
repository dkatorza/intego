import data from './data.json' assert { type: 'json' };

//Registering functions.
window.onload = onInit;
window.submitForm = submitForm;
window.renderFieldsData = renderFieldsData;
window.onInputChange = onInputChange;

function onInit() {
  renderFormData();
  renderFieldsData();
}

//Grabbing elements
const currency = document.querySelector('select[name=currency]');
const supportCheck = document.querySelector('input[name=add-support]');
const regularCurrency = document.querySelector('p.regular .currency');
const regularPrice = document.querySelector('p.regular .price');
const specialCurrency = document.querySelector('p.special .currency');
const specialPrice = document.querySelector('p.special .price');
const submitStatus = document.querySelector('div.status-container');
const submitButton = document.querySelector('.button-wrapper button');
submitStatus.style.display = 'none';

function renderFormData() {
  setSelectOptions();
}

// Dynamic options so you can updated values in one place dynamicly.
function setSelectOptions() {
  for (const curr in data) {
    const option = document.createElement('option');
    option.textContent = data[curr].currency.code;
    option.value = curr;
    currency.appendChild(option);
  }
}

// Dynamic rendering based on checkbox input
function renderFieldsData() {
  const currValue = data[currency.value];
  let typeOfPrice;
  if (supportCheck.checked) typeOfPrice = currValue.supportPack;
  else typeOfPrice = currValue.original;

  //Updating fields
  regularCurrency.textContent = currValue.currency.symbol;
  regularPrice.textContent = typeOfPrice.regular.toFixed(2);
  specialPrice.textContent = typeOfPrice.discount.toFixed(2);
  specialCurrency.textContent = currValue.currency.symbol;
}

function onInputChange() {
  renderFieldsData();
}

function submitForm() {
  event.preventDefault();
  const loader = document.createElement('div');
  loader.className = 'loader';
  submitButton.replaceChildren(loader);
  setTimeout(() => {
    submitStatus.style.display = 'flex';
  }, 4000);
}
