import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// const debounce = require('lodash.debounce');
// const DEBOUNCE_DELAY = 300;

const refs = {
  body: document.querySelector('body'),
  // container: document.querySelector('.country-info'),
  // searchBox: document.querySelector('#search-box'),
};

// refs.searchBox.addEventListener(
//   'input',
//   debounce(onInputSearch, DEBOUNCE_DELAY)
// );

// function onInputSearch(event) {
//   event.preventDefault();

//   const inputSearch = event.target.value.trim().toLowerCase();
//   console.log(inputSearch);

//   if (inputSearch.length === 0) {
//     return Notify.failure('Enter country');
//   }
  
//   fetchCountries(inputSearch).then(country => {
//     clearMarkup()
//     if (country.length === 1) {
//       renderCountryItem(country);
//     } else if (country.length >= 2 && country.length <= 10) {
//       renderCountryList(country);
//     } else {
//       Notify.info('Too many matches found. Please enter a more specific name.');
//     }
//   }).catch(onFetchError);
// }

// function clearMarkup () {
//   refs.container.innerHTML = '';
//   refs.countryList.innerHTML = '';
// }

// function renderCountryList(country) {
//   console.log(country);
//   const markup = country
//     .map(
//       ({ name, flags }) =>
//         `<li class='country-item'>
//       <img class='flag' src="${flags.svg}" alt="flags" width=30>
//       <h2 class='country-title'>${name.common}</h2>`
//     )
//     .join('');
//   refs.countryList.innerHTML = markup;
// }

// function renderCountryItem([{ name, capital, population, flags, languages }]) {
//   const markupCard = `<div class='country-box'>
//   <img class='flag' src="${flags.svg}" alt="flags" width=30>
//       <h2> ${name.official}</h2></div>
//       <div><p class='country-text'><span class='country-span'>Capital: </span>${capital}</p>
//       <p class='country-text'><span class='country-span'>Population: </span>${population}</p>      
//       <p class='country-text'><span class='country-span'>Languages: </span>${Object.values(
//         languages
//       ).join(', ')}</p></div>`;
//   refs.container.innerHTML = markupCard;
// }

// function onFetchError(error) {
//    Notify.failure('Oops, there is no country with that name');
// }
