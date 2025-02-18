import { references } from './assets.js';

const { quotes, gifFiles } = references;

const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".quote-author");
const generateBtn = document.querySelector("#generateBtn");

let lastQuoteIndex = -1;
let lastGifIndex = -1;

generateBtn.addEventListener("click", () => {
  let randomQuoteIndex;
  do {
    randomQuoteIndex = Math.floor(Math.random() * quotes.length);
  } while (randomQuoteIndex === lastQuoteIndex && quotes.length > 1);
  lastQuoteIndex = randomQuoteIndex;
  
  quoteText.textContent = `"${quotes[randomQuoteIndex].text}"`;
  quoteAuthor.textContent = `- ${quotes[randomQuoteIndex].author}`;

  // Select a random GIF file
  let randomGifIndex;
  do {
    randomGifIndex = Math.floor(Math.random() * gifFiles.length);
  } while (randomGifIndex === lastGifIndex && gifFiles.length > 1);
  lastGifIndex = randomGifIndex;
  
  const gifUrl = gifFiles[randomGifIndex].url;

  // Set as background for the body element
  document.body.style.background = `url(${gifUrl}) no-repeat center center fixed`;
  document.body.style.backgroundSize = 'cover';
});