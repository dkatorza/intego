// Utility functions
const buildMainElements = () => {
  const currency = document.querySelector('select[name=currency]');
  const supportCheck = document.querySelector('input[name=add-support]');
  const regularCurrency = document.querySelector('p.regular .currency');
  const regularPrice = document.querySelector('p.regular .price');
  const specialCurrency = document.querySelector('p.special .currency');
  const specialPrice = document.querySelector('p.special .price');
  const submitStatus = document.querySelector('div.status-container');
  const submitButton = document.querySelector('.button-wrapper button');

  return {
    currency,
    supportCheck,
    regularCurrency,
    regularPrice,
    specialCurrency,
    specialPrice,
    submitStatus,
    submitButton,
  };
};

async function getPrices() {
  try {
    const response = await fetch('./data.json');
    return response.json();
  } catch (error) {
    console.log('Could not fetch prices', error);
  }
}

// Init window events
window.onload = onInit;

// Main component functions
const {
  currency: currencyElement,
  supportCheck,
  regularCurrency,
  regularPrice,
  specialCurrency,
  specialPrice,
  submitButton,
  submitStatus,
} = buildMainElements();
let prices;

async function onInit() {
  prices = await getPrices();
  submitStatus.style.display = 'none';
  renderFormOptions();
  handleInputChange();
}

function renderFormOptions() {
  for (const price in prices) {
    const { currency } = prices[price];
    const option = document.createElement('option');
    option.textContent = currency.code.toUpperCase();
    option.value = price;
    currencyElement.appendChild(option);
  }
}

function handleInputChange() {
  const currValue = prices[currency.value];
  let typeOfPrice;
  if (supportCheck.checked) typeOfPrice = currValue.supportPack;
  else typeOfPrice = currValue.original;

  //Update the fields on change
  regularCurrency.textContent = currValue.currency.symbol;
  regularPrice.textContent = typeOfPrice.regular.toFixed(2);
  specialPrice.textContent = typeOfPrice.discount.toFixed(2);
  specialCurrency.textContent = currValue.currency.symbol;
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
