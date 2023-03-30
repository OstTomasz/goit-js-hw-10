import debounce from 'lodash.debounce';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

export const fetchCountries = fetch(
  'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages'
);
// https://restcountries.com/v3.1/name/{name}

let inputedCountry = '';
searchBox.addEventListener(
  'input',
  debounce(() => {
    inputedCountry = searchBox.value.trim();
    console.log(inputedCountry);
  }, DEBOUNCE_DELAY)
);

function listCountries(countries) {
  let countriesListHTML = '';

  countries.forEach(country => {
    countriesListHTML += `<li>${country.name.official}</li>`;
  });
  countryList.innerHTML = countriesListHTML;
}

fetchCountries
  .then(response => {
    const countriesData = response.json();
    return countriesData;
  })
  .then(countries => {
    console.log(countries);
    listCountries(countries);
  })
  .catch(error => {
    console.log(`oops! We have a problem: ${error}`);
  });

//todo
// filtercountry
