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
        console.log(matches);

        if (matches.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        } else {
          matches.forEach(match => {
            countryName = match.name.official;
            countryFlag = match.flags.png;
            countryCapital = match.capital;
            countryPopulation = match.population;
            countryLanguages = match.languages;
            if (matches.length === 1) {
              countriesListHTML += `<li style = 'display: flex;'><img src="${countryFlag}" height=30"> <p class="">${countryName}</p></li>`;
              countryInfoHTML = `<ul style="list-style: none;"><li style = 'display: flex;'><p>Capital: </p> <p>${countryCapital}</p></li><li style = 'display: flex;'><p>Population: </p> <p>${countryPopulation}</p></li><listyle = 'display: flex;'><p>Languages: </p> <p>${countryLanguages}</p></listyle></ul>`;
              countryList.innerHTML = countriesListHTML;
              countryInfo.innerHTML = countryInfoHTML;
            } else {
              countriesListHTML += `<li><img src="${countryFlag}" height=15"> ${countryName}</li>`;
              countryList.innerHTML = countriesListHTML;
            }
          });
        }
      });
    } else if (!input) {
      countryList.innerHTML = '';
    }
  }, DEBOUNCE_DELAY)
);

countryList.style.listStyle = 'none';
countryList.style.display = 'flex';
