import "/style.scss";

import { phrases } from "/data/test";
// import { phrases } from '/data/test-ac';

import { randInt, sample, sampleProp, shuffle } from "./common/common";
import images from "./img/*.png";
import svgs from "./img/icons/*.svg";
import pngs from "./img/icons/*.png";

import "@fortawesome/fontawesome-free/css/all.min.css";

if (document.readyState !== "loading") init();
else document.addEventListener("DOMContentLoaded", init);

function init() {
  addBanners(100);
}

// let banners = ['floral', 'butterfly', 'ribbons', 'standard'];
// let bgs = ['floral', 'bee', 'paint', 'space', 'butterfly'];
// let bgs = ['bee', 'space'];
// let bgs = ["bee", "space", "apples", "floral", "leaves", "blue-hearts"];
let bgs = [
  "autumn1",
  "spring",
  "winter",
  "leaves",
  "letters1",
  "rain",
  "clouds",
  "sports",
  "roses",
  "oranges",
  "strawberries",
  "paint",
  "meow"
];

let phrases2 = `he/him dissonance
motivation misfit
villainous gf
androgynous absurdist
in love with opinions
stay-at-home frog
cloudberry bakery
ironic honk
chartreuse moose
dr. doctor
egg ASMR
lilypad isle
powerful poltergeist
cacti nonconformist
papaya collective
clout socks
goblin influencer
e-dad
garden life`.split("\n");

let wobblySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397.82 50.55" fill="currentColor" width="100%" height="100%" preserveAspectRatio="none"><path d="M45.59,50.55c9.46-.1,295.42-1,315.1-.46a62,62,0,0,0,19.36-2.76c7.76-2.39,10.61-5,12-6.46a22.19,22.19,0,0,0,5.53-12,26,26,0,0,0-.92-11.06c-.22-.82-1.78-6.59-4.61-10.14C386.54.81,370.75.55,364.38.32,338.57-.6,67,.77,54.8.77c-14.74,0-26.73,0-35.94,1.85C16.32,3.12,2.61,6.89.42,18.28A34.77,34.77,0,0,0,.51,29.45a25.53,25.53,0,0,0,3.8,10.14,21.1,21.1,0,0,0,5.18,5.6c3.51,2.59,7.1,3.18,12.15,4a64,64,0,0,0,7.08.74C36.17,50.38,39.9,50.6,45.59,50.55Z"></path></svg>`;

function roll() {
  if (Math.random() < 0.6) return '0';

  let n = randInt(1, 1200);
  if (n >= 1000) {
    let r = (Math.round(n * 10) / 10000).toFixed(1);
    return r + '<span class="k">k</spand>';
    // return (n/1000) + '<span class="k">k</spand>';
  }
  return n;
}
function addBanners(n) {
  let gridDiv = document.querySelector(".phrase-grid");
  let lastbg = null;
  let html = [];
  let j = 0;
  for (let i = 0; i < n; i++) {
    let phrase;
    if (i < phrases2.length) phrase = phrases2[i];
    else phrase = phrases[Math.floor(Math.random() * phrases.length)];
    // let bg;
    // while(true) {
    //   bg = sample(bgs);
    //   if(bg != lastbg)
    //     break;
    // }
    // lastbg = bg;
    //let bg = bgs[i % bgs.length];
    // let bg = sample(bgs);
    let bg = bgs[j];
    j++;
    if(j >= bgs.length) {
      let lastbg = bg;
      while(bgs[bgs.length - 1] == lastbg)
        shuffle(bgs);
      j = 0;
    }
    let r1 = roll(), r2 = roll();
    let classes = [];
    if(i == 8)
      classes.push('rhyme');
    if([1, 3, 9, 12].includes(i))
      classes.push('alliteration');

    html.push(`<div class="phrase ${classes.join(' ')}">
            <div class="wobbly-bg">${wobblySvg}</div>
            ${
              i == 6 || i == 11
                ? `<div class="nook"><img src="${images.nook}"></img></div>`
                : ""
            }
            <div class="bg ${bg}"></div>
            <div class="text">
                <div class="title">${phrase}</div>
            </div>
            <div class="phrase-actions">
            <div class="action ${r1 > 0 && Math.random() < 0.2 ? "action-set" : ""}">
              <div class="action-img fun-icon"><img src="${svgs["trunk"]}"></div>
                <div class="action-label">${r1}</div>
              </div>
              <div class="action ${r2 > 0 && Math.random() < 0.2 ? "action-set" : ""}">
                <div class="action-img aesthetic-icon"><img src="${
                  svgs["flower"]
                }"></div>
                <div class="action-label">${r2}</div>
              </div>
              <div class="action action-bookmark">
                <div class="action-img bookmark-icon"><img src="${
                  svgs["note-white"]
                }"></div>
                <div class="action-plus"><i class="fas fa-plus"></i></div>
              </div>
            </div>
        </div>`);

    /*         <div class="action">
                <div class="action-img"><img src="${sampleProp(icons)}"></div>
                <div class="action-label">0</div>
              </div>
              <div class="action">
                <div class="action-img"><img src="${sampleProp(icons)}"></div>
                <div class="action-label">0</div>
              </div> */
  }

  gridDiv.innerHTML = html.join("\n");

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
