'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch('/fortune')
  .then(response => response.text())
  .then(fortune => {
    document.querySelector('#fortune-text').innerHTML = fortune;
  });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;

  // TODO: request weather with that URL and show the forecast in #weather-info
  fetch(`${url}?zipcode=${zipcode}`)
  .then(response => response.json())
  .then(responseData => {
    document.querySelector('#weather-form').innerHTML = responseData.forecast;
  })
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS
// TODO: show the result message after your form
// TODO: if the result code is ERROR, make it show up in red (see our CSS!)

function orderMelons(evt) {
  evt.preventDefault();
  
  const formInputs = {
    type: document.querySelector('#melon-type-field').value,
    amount: document.querySelector('#qty-field').value,
  };

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.code === 'ERROR') {
        document.querySelector('#order-status').classList.add('.error-order');

      }
      document.querySelector('#order-status').innerText = responseJson.msg;
    });
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);
