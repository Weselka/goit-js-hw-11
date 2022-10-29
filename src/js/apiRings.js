const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '30883328-4550d73a5a5d91ad50d778095';
// const options = {
//   headers: {
//     Authorization: API_KEY,
//   },
// };

export function apiRings(name, page = 1) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${name}&page=${page}&image_type=photo&orientation=horizontal&safesearch=true&lim&page=1&per_page=40`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    console.log(response);
    return response.json();
  });
}
