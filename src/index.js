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

// apiRings().then(data => {

// } console.log(markup(data.hits)));

function onInputSearch(event) {
  event.preventDefault();

  const inputSearch = event.target.value.trim().toLowerCase();
  console.log(inputSearch);

  // if (inputSearch.length === 0) {
  //   return Notify.failure(
  //     'Sorry, there are no images matching your search query. Please try again.'
  //   );
  // }

//   fetchCountries(inputSearch)
//     .then(hits => {
//       // clearMarkup();
//       if (hits) {
//         renderGaleryItem(hits);
//       }
//       // else {
//       //   Notify.info(
//       //     'Sorry, there are no images matching your search query. Please try again.'
//       //   );
//       // }
//     })
//     .catch(onFetchError);
// }

apiRings(inputSearch).then(data => {
  refs.container.insertAdjacentHTML('beforeend', (markup(data.hits)))
});

function clearMarkup() {
  refs.container.innerHTML = '';
}

// function renderGaleryItem([
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
//   console.log(markupCard);
//   refs.container.innerHTML = markupCard;
// }

// function renderGaleryItem(data) {
//   console.log(data);
//   const markupCard = data.hits
//     .map(
//       ({
//         webformatURL,
//         userImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `<a href="${userImageURL}"><div class="photo-card">
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
// </div></a>`
//     )
//     .joiun('');
//   refs.container.innerHTML = markupCard;
// }

function onFetchError(error) {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
