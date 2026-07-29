'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

// AJAX stand for asynchronous javaScript and XML
// https://countries-api-836d.onrender.com/countries/

// Render country
const renderCountry = function (data, neighbour) {
  const html = `
   <article class="country ${neighbour}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} Million</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
// const getCountryAndNeighbor = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`,
//   );
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     // Render country 1
//     renderCountry(data);

//     // get neighbor country 2
//     const neighbor = data.borders?.[0];
//     if (!neighbor) return;
//     console.log('this is neighbor:', neighbor);
//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open(
//       'GET',
//       `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`,
//     );
//     request2.send();
//     request2.addEventListener('load', function (country) {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);
//       renderCountry(data2, 'Neighbour');
//     });
//   });
// };

// getCountryAndNeighbor('Palestine');

// How the Web works: Request and response
//  TCP stands for transmission control protocol
// IP stands for Internat protocol

// const request = new XMLHttpRequest();
// request.open(
//   'GET',
//   `https://countries-api-836d.onrender.com/countries/name/${country}`,
// );
// request.send();
// const request = fetch(
//   `https://countries-api-836d.onrender.com/countries/name/bangladesh`,
// );
// console.log(request);

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJSON = function (url, errorMessage) {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`Country not found ${response.status}`);
    return response.json();
  });
};

const getCountryData = function (country) {
  // country 1

  getJSON(
    `https://countries-api-836d.onrender.com/countries/name/${country}`,
    'Country not found',
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];
      if (!neighbor) throw new Error('Neighbor not found.');
      // Country 2
      return getJSON(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`,
        `Country not found`,
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function () {
  getCountryData('japan');
});
