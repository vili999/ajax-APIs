// when the page loads, we want to do two things:
// we want to get the file from figma
// organize the file by ids
// then with those ids (as an array), generate some images from figma
// then add them to the site

//loadFile().then(ids => {
//    loadImages(ids).then(imageUrls => {
        // in here add imageUrls(which is an array) to the site
//    })
//})

//const project = "PkCFgvXEujM1U49Ji1LZ21"

const loadingTag = document.querySelector("header p.loading")
const nextTag = document.querySelector("a.next")
const previousTag = document.querySelector("a.previous")
const stepsTag = document.querySelector("footer span")
const sliderTag = document.querySelector("div.slider")
const footerTag = document.querySelector("footer")

let currentSlide = 0
let totalSlide = 0

const apiKey ="3568-40b64c06-492b-4ce7-ae7a-d4643137f64c"
const apiHeaders = {
    headers: {
        "X-Figma-token": apiKey
    }
}

const loadFile = function(key) {
    return fetch("https://api.figma.com/v1/files/" + key, apiHeaders)
        .then(response => response.json())
        .then(data => {
            // we want to return a list of frame ids
            const ids = data.document.children[0].children.map(frame => {
                return frame.id
            })

            return { 
                key: key,
                title: data.name,
                ids: ids
            }
        }) 
}

const loadImages = function (obj){
    const key = obj.key
    const ids = obj.ids.join(",")
    
    return fetch("https://api.figma.com/v1/images/" + key +"?ids=" + ids + "&scale=1", apiHeaders)
    .then(response => response.json())
    .then(data => {
        return obj.ids.map(id => {
            return data.images[id]
        } )
    })
}

const addImagesToSite = function (urls) {
    sliderTag.innerHTML = ""
    totalSlides = urls.length

    footerTag.classList.add("show")

    urls.forEach(url => {
        sliderTag.innerHTML = sliderTag.innerHTML + `
            <div> 
                <img src="${url}">
            </div>
        `
    })
}


loadFile("PkCFgvXEujM1U49Ji1LZ21")
    .then(file => {
        loadingTag.innerHTML = file.title
        document.title = file.title + " - Figure"
        return file
    })
    .then(file => loadImages(file))
    .then(imageUrls => addImagesToSite(imageUrls))
    .then(function () {
        loadingTag.innerHTML = ""
    })

// lets add in events for next and previous

const next = function () {
    currentSlide = currentSlide + 1
    if (currentSlide >= totalSlides) {
        currentSlide = totalSlides - 1
    }
    moveSlider()
}

const previous = function () {
    currentSlide = currentSlide - 1
    if(currentSlide < 0) {
        currentSlide = 0
    }
    moveSlider()
}

const moveSlider = function () {
    sliderTag.style.transform = `translate(${currentSlide * - 100}vw, 0)`
    stepsTag.innerHTML = `${currentSlide + 1} / ${totalSlides}`
}

nextTag.addEventListener("click", function () {
    next()
})

previousTag.addEventListener("click", function () {
    previous()
})