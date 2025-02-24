import searchPicture from './js/pixabay-api';
import makeUpGallery from './js/render-functions';
import iziToast from 'izitoast';
// import axios from 'axios';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// створюємо об'єкт refs, який містить посилання на HTML-елементи сторінки

const refs = {
  formEl: document.querySelector('.container'),
  galleryContainer: document.querySelector('.gallery'),
  loader: document.getElementById('loader'),
  loadMoreBtn: document.querySelector('.load-more'),
};

// Створюємо екземпляр SimpleLightbox, який додає функціонал модального перегляду зображень у галереї
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
let currentPage = 1;
let currentQuery = '';
let totalLoaded = 0;
let totalHits = 0;
// currentPage = 1;

refs.galleryContainer.innerHTML = '';
refs.loadMoreBtn.hidden = true;

refs.formEl.addEventListener('submit', async e => {
  e.preventDefault(); //Запобігає перезавантаженню сторінки при відправці форми
  const userValue = e.target.elements.query.value.trim(); // пошукове слово, введене користувачем

  refs.galleryContainer.innerHTML = ''; //очищаємо вміст контейнера галереї перед додаванням нових зображень.
  refs.loadMoreBtn.hidden = true;

  // Перевіряємо, чи вікно вводу порожнім
  if (!userValue || userValue.length === 0) {
    iziToast.error({
      title: 'Помилка',
      message: 'Введіть запит для пошуку!',
      position: 'topCenter',
    });
    // e.target.elements.query.value = '';
    return;
  }
  // Оновлюємо пошуковий запит та скидаємо сторінку
  currentQuery = userValue;
  currentPage = 1;
  totalLoaded = 0;

  //Показуємо індикатор завантаження (loader)
  refs.loader.hidden = false;

  //Відправляємо HTTP-запит та обробляємо відповідь
  try {
    const { hits, totalHits: apiTotalHits } = await searchPicture(
      currentQuery,
      currentPage
    );
    totalHits = apiTotalHits; // Оновлюємо глобальну змінну
    console.log('Total Hits:', totalHits);

    //виводимо повідомлення  про те, що нічого не знайдено.
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

    renderPicture(hits, false);
    totalLoaded = hits.length;
    // Перевіряємо, чи потрібно показувати кнопку "Load more"

    console.log(totalHits);

    // if (totalHits > 40) {
    refs.loadMoreBtn.hidden = false;
    // }
    //виводимо повідомлення  про помилку.
  } catch (error) {
    console.error('Помилка запиту:', error);
    refs.galleryContainer.innerHTML = '';
  } finally {
    refs.loader.hidden = true;
  }
  //очищення форми після її відправлення
  e.target.reset();
});

refs.loadMoreBtn.addEventListener('click', async () => {
  if (totalLoaded >= totalHits) {
    refs.loadMoreBtn.hidden = true;
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topCenter',
    });

    return; // Зупиняємо функцію, щоб уникнути зайвого запиту!
  }
  currentPage += 1;
  console.log(`Загружается страница: ${currentPage}`);

  refs.loader.hidden = false;

  try {
    const { hits, totalHits } = await searchPicture(currentQuery, currentPage);

    if (!hits || hits.length === 0) {
      refs.loadMoreBtn.hidden = true;
      return;
    }
    if ((currentPage - 1) * 40 >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topCenter',
      });
      refs.loadMoreBtn.hidden = true;
      return;
    }
    renderPicture(hits, true);
    totalLoaded += hits.length;

    refs.loadMoreBtn.hidden = totalLoaded >= totalHits;
    const lastImage = refs.galleryContainer.lastElementChild;

    if (totalLoaded >= totalHits || hits.length < 40) {
      refs.loadMoreBtn.hidden = true;
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topCenter',
      });
    } else {
      refs.loadMoreBtn.hidden = false;
    }

    // Прокрутка до останнього зображення
    scrollPageAfterLoad();

    if (lastImage) {
      lastImage.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  } catch (error) {
    console.error('Помилка запиту:', error);
  } finally {
    refs.loader.hidden = true;
  }
});

function renderPicture(hits, append = true) {
  const markup = makeUpGallery(hits);
  if (append) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
  } else {
    refs.galleryContainer.innerHTML = markup;
  }
  lightbox.refresh();
}

function scrollPageAfterLoad() {
  const firstCard = document.querySelector('.gallery .photo-card');
  if (firstCard) {
    const cardHeight = firstCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
