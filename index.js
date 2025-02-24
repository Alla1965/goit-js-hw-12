import{a as y,S as m,i as d}from"./assets/vendor-D0cagnvz.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=r(a);fetch(a.href,n)}})();const v="https://pixabay.com/api/",L="48829147-1041292ac799ae9595254ba31";async function p(e,o=1){try{const r=await y.get(v,{params:{key:L,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:40}});return{hits:r.data.hits,totalHits:r.data.totalHits}}catch(r){throw console.error("Помилка запиту:",r),new Error("Sorry, there are no images matching your search query. Please try again!")}}function M(e){return`
      ${e.map(({largeImageURL:o,webformatURL:r,tags:s,likes:a,views:n,comments:c,downloads:g})=>`
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
           <p class="count">${c}</p>
          </div>
           <div class=statistic-item-downloads> 
          <p class="count-header">Downloads </p>
           <p class="count">${g}</p>
          </div>
                     </div>
        </li>`).join("")}
  `}const t={formEl:document.querySelector(".container"),galleryContainer:document.querySelector(".gallery"),loader:document.getElementById("loader"),loadMoreBtn:document.querySelector(".load-more")},C=new m(".gallery a",{captionsData:"alt",captionDelay:250});let i=1,h="",l=0,u=0;t.galleryContainer.innerHTML="";t.loadMoreBtn.hidden=!0;t.formEl.addEventListener("submit",async e=>{e.preventDefault();const o=e.target.elements.query.value.trim();if(t.galleryContainer.innerHTML="",t.loadMoreBtn.hidden=!0,!o||o.length===0){d.error({title:"Помилка",message:"Введіть запит для пошуку!",position:"topCenter"});return}h=o,i=1,l=0,t.loader.hidden=!1;try{const{hits:r,totalHits:s}=await p(h,i);if(u=s,console.log("Total Hits:",u),!r||r.length===0){t.galleryContainer.innerHTML="",d.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"}),e.target.elements.query.value="";return}f(r,!1),l=r.length,console.log(u),t.loadMoreBtn.hidden=!1}catch(r){console.error("Помилка запиту:",r),t.galleryContainer.innerHTML=""}finally{t.loader.hidden=!0}e.target.reset()});t.loadMoreBtn.addEventListener("click",async()=>{if(l>=u){t.loadMoreBtn.hidden=!0,d.info({message:"We're sorry, but you've reached the end of search results.",position:"topCenter"});return}i+=1,console.log(`Загружается страница: ${i}`),t.loader.hidden=!1;try{const{hits:e,totalHits:o}=await p(h,i);if(!e||e.length===0){t.loadMoreBtn.hidden=!0;return}if((i-1)*40>=o){d.info({message:"We're sorry, but you've reached the end of search results.",position:"topCenter"}),t.loadMoreBtn.hidden=!0;return}f(e,!0),l+=e.length,t.loadMoreBtn.hidden=l>=o;const r=t.galleryContainer.lastElementChild;l>=o||e.length<40?(t.loadMoreBtn.hidden=!0,d.info({message:"We're sorry, but you've reached the end of search results.",position:"topCenter"})):t.loadMoreBtn.hidden=!1,b(),r&&r.scrollIntoView({behavior:"smooth",block:"end"})}catch(e){console.error("Помилка запиту:",e)}finally{t.loader.hidden=!0}});function f(e,o=!0){const r=M(e);o?t.galleryContainer.insertAdjacentHTML("beforeend",r):t.galleryContainer.innerHTML=r,C.refresh()}function b(){const e=document.querySelector(".gallery .photo-card");if(e){const o=e.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
