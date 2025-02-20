
//Запит на сервер
export default function searchPicture(q) {
  const BASE_URL = 'https://pixabay.com/';
  const END_POINT = 'api/?';
  const params = new URLSearchParams({
    key: '48829147-1041292ac799ae9595254ba31',
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `${BASE_URL}${END_POINT}${params}`;
  

  return fetch(url).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }
  });
}
