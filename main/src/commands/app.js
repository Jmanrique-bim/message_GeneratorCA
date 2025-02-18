import { references } from './assets.js';

const { quotes, gifFiles } = references;

const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".quote-author");
const generateBtn = document.querySelector("#generateBtn");

let lastQuoteIndex = -1;
let lastGifIndex = -1;

generateBtn.addEventListener("click", () => {
  // Choose a random quote
  let randomQuoteIndex;
  do {
    randomQuoteIndex = Math.floor(Math.random() * quotes.length);
  } while (randomQuoteIndex === lastQuoteIndex && quotes.length > 1);
  lastQuoteIndex = randomQuoteIndex;
  
  quoteText.textContent = `"${quotes[randomQuoteIndex].text}"`;
  quoteAuthor.textContent = `- ${quotes[randomQuoteIndex].author}`;

  // Choose a random GIF
  let randomGifIndex;
  do {
    randomGifIndex = Math.floor(Math.random() * gifFiles.length);
  } while (randomGifIndex === lastGifIndex && gifFiles.length > 1);
  lastGifIndex = randomGifIndex;
  
  const gifUrl = gifFiles[randomGifIndex].url;
  
  // Set an initial background as cover (this ensures no white gaps)
  document.body.style.background = `url(${gifUrl}) no-repeat center center fixed`;
  document.body.style.backgroundSize = 'cover';

  // Update the background with our custom scaling and dual-layer approach
  updateBackgroundScale(gifUrl);

  // Optionally update scaling on window resize
  window.addEventListener('resize', () => {
    updateBackgroundScale(gifUrl);
  });
});

function updateBackgroundScale(gifUrl) {
  const img = new Image();
  img.src = gifUrl;

  img.onload = function() {
    // Get the original dimensions of the GIF
    const gifWidth = img.naturalWidth;
    const gifHeight = img.naturalHeight;
    
    // Use the full viewport height for our resized GIF
    const newHeight = window.innerHeight;
    // Calculate the new width while maintaining the aspect ratio
    const newWidth = newHeight * (gifWidth / gifHeight);
    
    // Set the background with two layers:
    // - Top layer: our resized GIF (maintaining aspect ratio)
    // - Bottom layer: a cover version of the same GIF to fill any gaps
    document.body.style.backgroundImage = `url(${gifUrl}), url(${gifUrl})`;
    document.body.style.backgroundPosition = 'center center, center center';
    document.body.style.backgroundRepeat = 'no-repeat, no-repeat';
    document.body.style.backgroundSize = `${newWidth}px ${newHeight}px, cover`;
    
    // Show an emergent alert with the current viewport height and our resized dimensions
    //alert(`Window Height: ${newHeight}px\nResized GIF Size: ${newWidth.toFixed(0)}px x ${newHeight}px`);
  };
}
