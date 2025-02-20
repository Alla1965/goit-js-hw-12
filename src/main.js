import searchPicture from './js/pixabay-api';
import makeUpGallery from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  formEl: document.querySelector('.container'),
  galleryContainer: document.querySelector('.gallery'),
  loader: document.getElementById('loader'),
};
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.formEl.addEventListener('submit', async e => {
  e.preventDefault();
  const userValue = e.target.elements.query.value.trim(); // пошукове слово, введене користувачем

  console.log('Запрос пользователя:', userValue);
  console.log('Длина запроса:', userValue.length);
  refs.galleryContainer.innerHTML = '';

  if (!userValue || userValue.length === 0) {
    iziToast.error({
      title: 'Ошибка',
      message: 'Введите запрос для поиска!',
      position: 'topCenter',
    });
    e.target.elements.query.value = '';
    // e.target.reset();
    return;
  }
  refs.loader.hidden = false;
  // refs.galleryContainer.innerHTML = '';
  try {
    const { hits } = await searchPicture(userValue);
    if (!hits || hits.length === 0) {
      refs.galleryContainer.innerHTML = '';
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topCenter',
      });
      e.target.elements.query.value = '';
      return;
    }
    renderPicture(hits);
  } catch (error) {
    console.error('Ошибка запроса:', error);
    refs.galleryContainer.innerHTML = '';
  } finally {
    refs.loader.hidden = true;
  }

  e.target.reset();
});

function renderPicture(hits) {
  console.log(hits);
  const markup = makeUpGallery(hits);

  refs.galleryContainer.innerHTML = markup;
  lightbox.refresh();
}
