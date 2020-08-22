const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const removeLoadingSpinner = () => {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }    
}

// Get Quote from API
const getQuote = async () => {
    showLoadingSpinner();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json"
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If quoteAuthor field is blank, send 'Unknown'
        if (data.quoteAuthor === "") {
            authorText.innerText = "Unknown";
        } else {
            authorText.innerText = data.quoteAuthor
        }
        // If quoteText has more than 120 characters, change the font size
        if (data.quoteText.length > 120) {
            quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
    } catch (err) {
            if (err.toString().includes("Unexpected token ' in JSON at position")) {
                getQuote();
            } else {
                console.log("API error");
                removeLoadingSpinner();
            }           
    }
}

// Tweet Quote
const tweetQuote = () => {
    const author = authorText.innerText;
    const quote = quoteText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On page load
getQuote();
