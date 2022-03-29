const formTag = document.querySelector("form")
const inputTag = formTag.querySelector("input")
const resultsTag = document.querySelector("section.results")

const accessKey = "204be0b49630037041bdf5edf262da768e1295ef085f4f9cb252cda4a76e4efc"
//const accessKey = "324b651107c9fe502c339fc5638eb98ce80c92a9470b8019068668be65f01301"
//const accessKey ="091343ce13c8ae780065ecb3b13dc903475dd22cb78a05503c2e0c69c5e98044"
//const apiUrl = "https://api.unsplash.com/photos?per_page=24&query=blue"
//const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query=red"

const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query="
//const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query=red&client_id=204be0b49630037041bdf5edf262da768e1295ef085f4f9cb252cda4a76e4efc"

const searchUnsplash = function (term) {
    return fetch(apiUrl + term, {
        method: "GET",
        headers: {
            "Authorization": "Client-ID " + accessKey
        }
    })
    .then(response => response.json())
    .then(data => {
        return data.results.map(result => {
            return {
                imageSrc: result.urls.regular,
                width: result.width,
                height: result.height,
                name: result.user.name,
                title: (result.description || "Untitled"),
                backgroundColor: (result.color || "#cccccc") + "33"
            }
        })
    })
}

// add results to page
const addResults = function (results) {
    // remove all the loading tags
    resultsTag.innerHtml = ""

    // loop over each individual result and add the results tag
    results.forEach(result => {
        console.log(result)
        resultsTag.innerHTML = resultsTag.innerHTML + `
            <div class="single-result">
                <div class="image" style="background-color: ${result.backgroundColor}">
                    <img src="${result.imageSrc}">
                </div>
                <h2> ${result.title}</h2>
                <p>by ${result.name} ${result.width} x ${result.height} </p>
            </div>
        `

    })

}

// when we submit the form, get the info from input
formTag.addEventListener("submit", function (event) {
    // get the info from input
    const searchTerm = inputTag.value

    searchUnsplash(searchTerm)
        .then(results => {
            addResults(results)
        })

    // stop the form from going to the usual next page
    event.preventDefault()
})
