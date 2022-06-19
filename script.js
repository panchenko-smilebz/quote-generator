"use strict";

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuoteFromAPI() {
    showLoadingSpinner();
    const proxyUrl = 'https://cors-enywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is blank, add 'неизвестен'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'неизвестен';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
    } catch (error) {
        getQuoteFromAPI();
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} ©${author}`;
    window.open(twitterUrl, '_blank');
}
// Event Listeners
newQuoteBtn.addEventListener('click', getQuoteFromAPI);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuoteFromAPI();