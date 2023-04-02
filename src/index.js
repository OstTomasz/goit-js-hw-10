import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

let input = '';
searchBox.addEventListener(
  'input',
  debounce(() => {
    input = searchBox.value.trim();
    let countriesListHTML = '';
    let countryName = '';
    if (input) {
      fetchCountries(input).then(countries => {
        countries.forEach(country => {
          countryName = country.name.official;
          countriesListHTML += `<li>${countryName}</li>`;
          countryList.innerHTML = countriesListHTML;
        });
      });
    } else if (!input) {
      countryList.innerHTML = '';
    }
  }, DEBOUNCE_DELAY)
);

//     countryName = inputedCountry.name;
//     console.log(countryName);

//todo
// filtercountry
// countries.forEach(country => {
//   countryName = country.name.official;
//   if (countryName.includes(inputedCountry)) {
//     countriesListHTML += `<li>${countryName}</li>`;
//   }
//   countryList.innerHTML = countriesListHTML;
// });
// if (!inputedCountry) {

// }
