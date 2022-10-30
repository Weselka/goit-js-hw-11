import './css/styles.css';
import { apiRings } from './js/apiRings';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import markup from './js/templates/markup.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-form'),
  searchBtn: document.querySelector('.search-btn'),
  container: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let page = 1;
let inputSearch = '';

refs.searchBox.addEventListener(
  'input',
  debounce(onInputSearch, DEBOUNCE_DELAY)
);
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
    onFetchError();
  }
  refs.searchBtn.disabled = false;
}

async function onSubmitSearch(event) {
  event.preventDefault();
  try {
    const response = await apiRings(inputSearch);
    
    
    if (response.totalHits >= 1) {
      refs.container.insertAdjacentHTML('beforeend', markup(response.hits));
      Notify.success(`Hooray! We found ${response.total}`);
      refs.loadMoreBtn.classList.remove('is-hidden');
    } else if (response.data.hits === []) {
      onFetchError();
    }
  } catch (error) {
    onFetchError();
  }
  lightbox.refresh();
}

function onLoadMore() {
  page += 1;

  apiRings(inputSearch, page)
    .then(response => {
      if (response.total === response.totalHits) {
        refs.loadMoreBtn.classList.add('is-hidden');
        refs.searchBtn.disabled = true;
        return Notify.success(
          "We're sorry, but you've reached the end of search results."
        );
      }
      refs.container.insertAdjacentHTML('beforeend', markup(response.hits));      
      Notify.success(`Hooray! We found ${response.total}`);
      lightbox.refresh();
    })
    .catch(onFetchError);  
}

function onClickSearch() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function clearMarkup() {
  refs.container.innerHTML = '';
}

function onFetchError(error) {
  refs.loadMoreBtn.classList.add('is-hidden');
  return Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
