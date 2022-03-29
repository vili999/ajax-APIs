const quoteTag = document.querySelector("h1")
const authorTag = document.querySelector("p")
const bodyTag = document.querySelector("body")
const randomTag = document.querySelector("footer img");

let data = []


// lets load in the real data
//fetch("https://api.superhi.com/api/test/quotes/")
// fetch("testquotes.json")
// //fetch("quotes.json")
//     .then(response => response.json())
//     .then(jsonData => {
//         data = jsonData
//         getQuote()
//     })

const getQuote = function () {
    // if (data.length > 0 ) { 
    //     // get a random quotes* 
    //     const randomNumber = Math.floor(Math.random() * data.length)
    //     const randomQuote = data[randomNumber]

    //     // and put it in the site
    //     quoteTag.innerHTML = randomQuote.quote
    //     authorTag.innerHTML = randomQuote.author
    // }
    fetch("https://api.superhi.com/api/test/quotes/random")
        .then(response => response.json())
        .then(jsonData => {
            quoteTag.innerHTML = "&ldquo;" + jsonData.quote + "&rdquo;"
            authorTag.innerHTML = "- " + jsonData.author

            if (jsonData.quote.length > 100) {
                quoteTag.classList.add("long")
            } else {
                quoteTag.classList.remove("long")
            }

            bodyTag.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 90%)`
        })
    }

// run setQuote on page load

getQuote()

// run getQuote on click of random image

randomTag.addEventListener("click", function () {
    getQuote()
})