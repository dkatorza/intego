import data from './data.json' assert { type: 'json' };

window.onload = onInit;

//Registering functions.
function onInit() {
  renderFormData();
}

//Grabbing elements
const currency = document.querySelector('select[name=currency]');
const supportCheck = document.querySelector('input[name=add-support]');
const regularCurrency = document.querySelector('p.regular .currency');
const regularPrice = document.querySelector('p.regular .price');
const specialCurrency = document.querySelector('p.special .currency');
const specialPrice = document.querySelector('p.special .price');
const submitStatus = document.querySelector('p.statusmsg');

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
