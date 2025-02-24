import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '48829147-1041292ac799ae9595254ba31';
//Запит на сервер
export default async function searchPicture(q, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
      },
    });

    // return response.data; // Axios автоматично обробляє JSON
    return { hits: response.data.hits, totalHits: response.data.totalHits };
  } catch (error) {
    console.error('Помилка запиту:', error);
    throw new Error(
      'Sorry, there are no images matching your search query. Please try again!'
    );
  }
}
