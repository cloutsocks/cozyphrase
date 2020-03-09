import '/style.scss';

import { phrases as phrases } from '/data/test';
// import { phrases } from '/data/test-ac';


if (document.readyState !== "loading")
    init();
else
    document.addEventListener('DOMContentLoaded', init);

function init() {
    addBanners(300);
}

// let banners = ['floral', 'butterfly', 'ribbons', 'standard'];
// let bgs = ['floral', 'bee', 'paint', 'space', 'butterfly'];
// let bgs = ['bee', 'space'];
let bgs = ['bee', 'space', 'apples', 'floral', 'leaves', 'blue-hearts'];


function addBanners(n) {
    let gridDiv = document.querySelector('.phrase-grid');

    for(let i = 0; i < n; i++) {
        let phraseDiv = document.createElement('div');
        phraseDiv.className = 'oldphrase unit';
        gridDiv.appendChild(phraseDiv);

        let bannerDiv = document.createElement('div');
        bannerDiv.className = 'banner';
        bannerDiv.classList.add(bgs[i % bgs.length]);
        // bannerDiv.textContent = 'cozy woods';
        let phrase = phrases[Math.floor(Math.random() * phrases.length)]
        // bannerDiv.innerHTML = `<div class="title"><span class="prefix">cozy</span> <span class="suffix">woods</span></div>`
        bannerDiv.innerHTML = `<div class="titleold mali">${phrase}</div>`

        phraseDiv.appendChild(bannerDiv);
    }


}