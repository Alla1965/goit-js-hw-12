
export default function makeUpGallery(image) {
  return `
      ${image.slice(0,9)
            .map(
        ({ largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => `
      <li class="gallery-item">
          <a href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
          </a>
          <div class="statistic">
          <div class=statistic-item-likes> 
          <p class="count-header">Likes </p>
           <p class="count">${likes}</p>
          </div>
            <div class=statistic-item-views> 
          <p class="count-header">Views </p>
           <p class="count">${views}</p>
          </div>
            <div class=statistic-item-comments> 
          <p class="count-header">Comments </p>
           <p class="count">${comments}</p>
          </div>
           <div class=statistic-item-downloads> 
          <p class="count-header">Downloads </p>
           <p class="count">${downloads}</p>
          </div>
                     </div>
        </li>`
        
      )
      .join('')}
  `;
}
