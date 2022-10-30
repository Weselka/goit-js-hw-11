import './css/styles.css';
import { apiRings } from './js/apiRings';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import debounce from 'lodash.debounce';
import markup from './js/templates/markup.hbs';

// const DEBOUNCE_DELAY = 3000;

const refs = {
  searchBox: document.querySelector('#search-form'),
  searchBtn: document.querySelector('.search-btn'),
  container: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

console.log(refs)

let page = 1;
let inputSearch = '';

refs.searchBox.addEventListener('input', onInputSearch);
refs.searchBox.addEventListener('click', onClickSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.searchBox.addEventListener('submit', onSubmitSearch);
refs.searchBtn.addEventListener('click', onClickSearch);

refs.searchBtn.disabled = true;

function onInputSearch(event) {
  event.preventDefault();
  clearMarkup();
  
  inputSearch = event.target.value;
  console.log(inputSearch);

  if (inputSearch.length === 0) {
    refs.loadMoreBtn.classList.add('is-hidden');
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  refs.searchBtn.disabled = false;
  // apiRings(inputSearch)
  //   .then(data => {
  //     refs.container.insertAdjacentHTML('beforeend', markup(data.hits));
  //   })
  //   .catch(onFetchError);
  // refs.loadMoreBtn.classList.remove('is-hidden');
}

function onClickSearch() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function onSubmitSearch(event) {
  event.preventDefault();
  apiRings(inputSearch)
    .then(response => {
      refs.container.insertAdjacentHTML('beforeend', markup(response.hits));
      Notify.success(`Hooray! We found ${response.total}`);
    })
    .catch(onFetchError);
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function onLoadMore() {
  page += 1;
  paramSearch = inputSearch;
  
  apiRings(paramSearch, page)
    .then(response => {
      if (response.total === response.totalHits) {
        refs.loadMoreBtn.classList.add('is-hidden');
        return Notify.success(
          "We're sorry, but you've reached the end of search results."
        );
      }
      refs.container.insertAdjacentHTML('beforeend', markup(response.hits));
      Notify.success(`Hooray! We found ${response.total}`);
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