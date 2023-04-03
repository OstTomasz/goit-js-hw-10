import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
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
    let matches = [];
    let countriesListHTML = '';
    let countryInfoHTML = '';
    let countryName = '';
    let countryFlag = '';
    let countryCapital = '';
    let countryPopulation = '';
    let countryLanguages = '';
    if (input) {
      fetchCountries(input).then(countries => {
        countries.forEach(country => {
          countryName = country.name.official;
          if (countryName.toLowerCase().includes(input.toLowerCase())) {
            matches.push(country);
          }
        });

        if (matches.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          countryInfo.innerHTML = '';
          countryList.innerHTML = '';
          return;
        } else if (matches.length === 0) {
          countryList.innerHTML = '';
          countryInfo.innerHTML = '';
          Notify.failure('Oops, there is no country with that name');
        } else {
          matches.forEach(match => {
            countryName = match.name.official;
            countryFlag = match.flags.png;
            countryCapital = match.capital;
            countryPopulation = match.population;
            countryLanguages = Object.values(match.languages);
            if (matches.length === 1) {
              countriesListHTML += `<li style = 'display: flex;'><img src="${countryFlag}" height=30">&nbsp<p class="">${countryName}</p></li>`;
              countryInfoHTML = `<ul style="list-style: none;"><li style = 'display: flex;'><p>Capital: </p>&nbsp<p>${countryCapital}</p></li><li style = 'display: flex;'><p>Population: </p>&nbsp<p>${countryPopulation}</p></li><li style = 'display: flex;'><p>Languages: </p>&nbsp<p>${countryLanguages}</p></li></ul>`;
              countryList.innerHTML = countriesListHTML;
              countryInfo.innerHTML = countryInfoHTML;
            } else {
              countriesListHTML += `<li><img src="${countryFlag}" height=15"> ${countryName}</li>`;
              countryList.innerHTML = countriesListHTML;
              countryInfo.innerHTML = '';
            }
          });
        }
      });
    } else if (!input) {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    }
  }, DEBOUNCE_DELAY)
);

countryList.style.listStyle = 'none';
