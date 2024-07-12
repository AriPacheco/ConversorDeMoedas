const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");

// Substitua 'YOUR_API_KEY' pela sua chave de API obtida da ExchangeRate-API
const API_KEY = '14ae579cc1d0f3392cd79ab5';
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/BRL`;

let exchangeRates = {};

// Função para buscar taxas de câmbio
async function fetchExchangeRates() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    exchangeRates = data.conversion_rates;
  } catch (error) {
    console.error("Erro ao buscar taxas de câmbio:", error);
  }
}

function convertValues() {
  const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value.replace(/[^0-9,-]+/g,"").replace(",","."));
  const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
  const currencyValueConverted = document.querySelector(".currency-value");

  const dolarToday = exchangeRates.USD;
  const euroToday = exchangeRates.EUR;

  if (currencySelect.value === "dolar") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(inputCurrencyValue / dolarToday);
  }

  if (currencySelect.value === "euro") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR"
    }).format(inputCurrencyValue / euroToday);
  }

  currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(inputCurrencyValue);
}

function changeCurrency() {
  const currencyName = document.getElementById("currency-name");
  const currencyImage = document.querySelector(".currency-img");

  if (currencySelect.value === "dolar") {
    currencyName.innerHTML = "Dólar Americano";
    currencyImage.src = "./assets/dolar.png";
  }

  if (currencySelect.value === "euro") {
    currencyName.innerHTML = "Euro";
    currencyImage.src = "./assets/euro.png";
  }

  convertValues();
}

currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);

// Busca as taxas de câmbio ao carregar a página
fetchExchangeRates();
