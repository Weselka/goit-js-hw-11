// import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '30883328-4550d73a5a5d91ad50d778095';

export async function apiRings(inputSearch, page = 1) {
  const axios = require('axios').default;
  const url = `${BASE_URL}?key=${API_KEY}&q=${inputSearch}&page=${page}`;
  const response = await axios.get(url, {
    // headers: {
    //   'Content-Type': 'application/json',
    //   // Authorization: '${API_KEY}',
    // },
    params: {
      // q: 'inputSearch',
      // page: 'page',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: '40',
    },
  });
  console.log(response);
  return response.data;
}

// const axios = require('axios').default;
//   const url = `${BASE_URL}?key=${API_KEY}&q=${inputSearch}&page=${page}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;
//   const response = await axios.get(url);
//   console.log(response);
//   return response.data;
// }