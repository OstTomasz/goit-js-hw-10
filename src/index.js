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
          if (countryName.toLowerCase().includes(input.toLowerCase())) {
            countriesListHTML += `<li>${countryName}</li>`;
            countryList.innerHTML = countriesListHTML;
          }
        });
      });
    } else if (!input) {
      countryList.innerHTML = '';
    }
  }, DEBOUNCE_DELAY)
);
