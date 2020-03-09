
// import './fonts/fonts.css';
import './style.scss';

let phrases = `grainy angel
angel clown
yam fort
blackberry stuff
fairy finally
lovely paprika
nettles lollipop
special snow
vaporwave bookstore
honey hero
small sesame
composer cafe
quirky croissant
collector collecting
peppermint boi
boi core
basically jail
docile devil
mocha unpredictable
niche melon
bro writer
cancelled cancer
woods police
orc sunrise
princess punk
sun riddle
woke alien
canvas plant
ferocious vinyl
influencer cookie
cryptid cheesecake
waffles smitten
rude hot
cloudberry macaron
smoke smug
toot sis
mathematics sprite
marriage marjoram
pleasant macadamia
cancer gemini
ms. poetry
boots dissonance
brilliant student
pride pupper
shy snacktime
soft core
macadamia darling
lentil fan
alien goddess
asparagus god
fossil craft
ironic friday
cancer sprite
cauliflower music
pickle punk
excellent villager
corgi lentil
haunted words
jujube snowball
sangria sketch
unwanted halloween
skeleton gf
almost opinions
persimmon bookstore
machine mostly
sports shopkeeper
hamtaro cosmic
absurd lollipop
idea boi
fireside darling
cinnamon bouquet
turbo cancelled
charcoal rebel
affection honeyberry
prune photographer
musician tart`.split('\n');

document.addEventListener('DOMContentLoaded', function () {
  addPhrases();
});


// let colors = `#FFFEFC
// #FBFCF7
// #FEFAF1
// #F5FEFD
// #FDF6E4
// #FFFADA
// #FEF9E3
// #FBFCF7
// #FAFAF2
// #F7EFEC
// #FAF3EB
// #FFF1E6
// #F2EAD3
// #E7DFCC
// #FFFFFF
// #FBFCF7
// #ECFCFC
// #FFFEFC
// #FBF5DF
// #FAF5EF`.split('\n');

let colors = `#FFFEFC
#FBFCF7
#FEFAF1
#F5FEFD
#FDF6E4
#FBFCF7
#FAFAF2
#F7EFEC
#FAF3EB
#FFF1E6
#FFFFFF
#FBFCF7
#ECFCFC
#FFFEFC
#FAF5EF`.split('\n');

function addPhrases() {
  let grid = document.querySelector('.phrases')
  if (!grid) return;

  let n = 0
  phrases.forEach((phrase, i) => {
    let card = document.createElement('div');
    card.className = 'phrase';
    card.innerHTML = `${phrase}`;
    //card.style.backgroundColor = sample(colors);
    //card.style.backgroundColor = colors[i % colors.length];
    // shuffle every x colors
    grid.appendChild(card);
    // card.addEventListener('click', () => selectGame());

    card.style.backgroundColor = colors[n];
    n++;
    if (n == colors.length) {
      n = 0;
      shuffle(colors);
    }
  });

  grid.appendChild(phrases);
}





const sample = arr => arr[Math.floor(Math.random() * arr.length)];
function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}