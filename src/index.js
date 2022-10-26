import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

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

  fetchCountries(inputSearch)
    .then(hits => {
      clearMarkup();
      if (hits) {
        renderCountryItem(hits);
      }
      // else {
      //   Notify.info(
      //     'Sorry, there are no images matching your search query. Please try again.'
      //   );
      // }
    })
    .catch(onFetchError);
}

function clearMarkup() {
  refs.container.innerHTML = '';
}

// function renderCountryItem([
//   { webformatURL, tags, likes, views, comments, downloads },
// ]) {
//   const markupCard = `<div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes ${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views ${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments ${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads ${downloads}</b>
//     </p>
//   </div>
// </div>`;
//   refs.container.innerHTML = markupCard;
// }

function renderCountryItem(hits) {
  console.log(hits);
  const markupCard = hits
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`
    )
    .joiun('');
  refs.container.innerHTML = markupCard;
}

function onFetchError(error) {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
