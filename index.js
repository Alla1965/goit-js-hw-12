import{a as g,S as m,i as c}from"./assets/vendor-D0cagnvz.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=r(a);fetch(a.href,n)}})();const v="https://pixabay.com/api/",M="48829147-1041292ac799ae9595254ba31";async function f(t,o=1){try{const r=await g.get(v,{params:{key:M,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:40}});return{hits:r.data.hits,totalHits:r.data.totalHits}}catch(r){throw console.error("Помилка запиту:",r),new Error("Sorry, there are no images matching your search query. Please try again!")}}function L(t){return`
      ${t.map(({largeImageURL:o,webformatURL:r,tags:s,likes:a,views:n,comments:l,downloads:y})=>`
      <li class="gallery-item photo-card">
          <a href="${o}">
            <img class="gallery-image" src="${r}" alt="${s}" />
          </a>
          <div class="statistic">
          <div class=statistic-item-likes> 
          <p class="count-header">Likes </p>
           <p class="count">${a}</p>
          </div>
            <div class=statistic-item-views> 
          <p class="count-header">Views </p>
           <p class="count">${n}</p>
          </div>
            <div class=statistic-item-comments> 
          <p class="count-header">Comments </p>
           <p class="count">${l}</p>
          </div>
           <div class=statistic-item-downloads> 
          <p class="count-header">Downloads </p>
           <p class="count">${y}</p>
          </div>
                     </div>
        </li>`).join("")}
  `}const e={formEl:document.querySelector(".container"),galleryContainer:document.querySelector(".gallery"),loader:document.getElementById("loader"),loadMoreBtn:document.querySelector(".load-more")},C=new m(".gallery a",{captionsData:"alt",captionDelay:250});let d=1,u="",i=0,h=0;e.galleryContainer.innerHTML="";e.loadMoreBtn.hidden=!0;e.formEl.addEventListener("submit",async t=>{t.preventDefault();const o=t.target.elements.query.value.trim();if(e.galleryContainer.innerHTML="",e.loadMoreBtn.hidden=!0,!o||o.length===0){c.error({title:"Помилка",message:"Введіть запит для пошуку!",position:"topCenter"});return}u=o,d=1,i=0,e.loader.hidden=!1;try{const{hits:r,totalHits:s}=await f(u,d);if(h=s,!r||r.length===0){e.galleryContainer.innerHTML="",c.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"}),t.target.elements.query.value="";return}p(r,!1),i=r.length,h<=40?e.loadMoreBtn.hidden=!0:e.loadMoreBtn.hidden=!1}catch(r){console.error("Помилка запиту:",r),e.galleryContainer.innerHTML=""}finally{e.loader.hidden=!0}t.target.reset()});e.loadMoreBtn.addEventListener("click",async()=>{if(i>=h){e.loadMoreBtn.hidden=!0,c.info({message:"We're sorry, but you've reached the end of search results.",position:"topCenter"});return}d+=1,e.loader.hidden=!1;try{const{hits:t,totalHits:o}=await f(u,d);if(!t||t.length===0){e.loadMoreBtn.hidden=!0;return}if((d-1)*40>=o){c.info({message:"We're sorry, but you've reached the end of search results.",position:"topCenter"}),e.loadMoreBtn.hidden=!0;return}p(t,!0),i+=t.length,e.loadMoreBtn.hidden=i>=o;const r=e.galleryContainer.lastElementChild;i>=o||t.length<40?(e.loadMoreBtn.hidden=!0,c.info({message:"We're sorry, but you've reached the end of search results.",position:"topCenter"})):e.loadMoreBtn.hidden=!1,B(),r&&r.scrollIntoView({behavior:"smooth",block:"end"})}catch(t){console.error("Помилка запиту:",t)}finally{e.loader.hidden=!0}});function p(t,o=!0){const r=L(t);o?e.galleryContainer.insertAdjacentHTML("beforeend",r):e.galleryContainer.innerHTML=r,C.refresh()}function B(){const t=document.querySelector(".gallery .photo-card");if(t){const o=t.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
