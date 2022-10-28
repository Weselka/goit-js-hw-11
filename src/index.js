import './css/styles.css';
import { apiRings } from './js/apiRings';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import markup from './js/templates/markup.hbs';

const DEBOUNCE_DELAY = 3000;

const refs = {
  body: document.querySelector('body'),
  searchBox: document.querySelector('#search-form'),
  container: document.querySelector('.gallery'),
};

refs.searchBox.addEventListener(
  'input',
  debounce(onInputSearch, DEBOUNCE_DELAY)
);

function onInputSearch(event) {
  event.preventDefault();

  const inputSearch = event.target.value.trim().toLowerCase();
  console.log(inputSearch);

  if (inputSearch.length === 0) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  apiRings(inputSearch)
    .then(data => {
      refs.container.insertAdjacentHTML('beforeend', markup(data.hits));
    })
    .catch(onFetchError);
}

function clearMarkup() {
  refs.container.innerHTML = '';
}

function onFetchError(error) {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

//Notify.info('Sorry, there are no images matching your search query. Please try again.')
