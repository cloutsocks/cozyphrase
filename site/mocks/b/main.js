import "/style.scss";

import { phrases } from "/data/test";
// import { phrases } from '/data/test-ac';

import { randInt, sample, shuffle } from "./common/common";
import images from "./img/*.png";

if (document.readyState !== "loading") init();
else document.addEventListener("DOMContentLoaded", init);

function init() {
  addBanners(300);
}

// let banners = ['floral', 'butterfly', 'ribbons', 'standard'];
// let bgs = ['floral', 'bee', 'paint', 'space', 'butterfly'];
// let bgs = ['bee', 'space'];
// let bgs = ["bee", "space", "apples", "floral", "leaves", "blue-hearts"];
let bgs = ['autumn', 'rain', 'sbubby'];

let wobblySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397.82 50.55" fill="currentColor" width="100%" height="100%" preserveAspectRatio="none"><path d="M45.59,50.55c9.46-.1,295.42-1,315.1-.46a62,62,0,0,0,19.36-2.76c7.76-2.39,10.61-5,12-6.46a22.19,22.19,0,0,0,5.53-12,26,26,0,0,0-.92-11.06c-.22-.82-1.78-6.59-4.61-10.14C386.54.81,370.75.55,364.38.32,338.57-.6,67,.77,54.8.77c-14.74,0-26.73,0-35.94,1.85C16.32,3.12,2.61,6.89.42,18.28A34.77,34.77,0,0,0,.51,29.45a25.53,25.53,0,0,0,3.8,10.14,21.1,21.1,0,0,0,5.18,5.6c3.51,2.59,7.1,3.18,12.15,4a64,64,0,0,0,7.08.74C36.17,50.38,39.9,50.6,45.59,50.55Z"></path></svg>`;

function addBanners(n) {
  let gridDiv = document.querySelector(".phrase-grid");

  let html = [];
  for (let i = 0; i < n; i++) {
    let phrase = phrases[Math.floor(Math.random() * phrases.length)];
    let bg = bgs[i % bgs.length];
    html.push(`<div class="phrase">
            <div class="wobbly-bg">${wobblySvg}</div>
            <div class="nook"><img src="${images.nook}"></img></div>
            <div class="bg ${bg}"></div>
            <div class="text">
                <div class="title">${phrase}</div>
            </div>
        </div>`);
  }

  gridDiv.innerHTML = html.join('\n');

  // for(let i = 0; i < n; i++) {
  //     let phraseDiv = document.createElement('div');
  //     phraseDiv.className = 'oldphrase unit';
  //     gridDiv.appendChild(phraseDiv);

  //     let bannerDiv = document.createElement('div');
  //     bannerDiv.className = 'banner';
  //     bannerDiv.classList.add(bgs[i % bgs.length]);
  //     // bannerDiv.textContent = 'cozy woods';
  //     let phrase = phrases[Math.floor(Math.random() * phrases.length)]
  //     // bannerDiv.innerHTML = `<div class="title"><span class="prefix">cozy</span> <span class="suffix">woods</span></div>`
  //     bannerDiv.innerHTML = `<div class="titleold mali">${phrase}</div>`

  //     phraseDiv.appendChild(bannerDiv);
  // }
}
