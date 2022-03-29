const spaceId = "pvk91asdexs7"
const environmentId = "master"
const accessToken = "6e5d7baf47cac045aef2896027c5fd315a0c4b03e093ba789bdd3bb833cce315"

// the next link is from documentation but not
const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&order=-fields.price&content_type=menuItem`
//const url = 'https://cdn.contentful.com/spaces/'+spaceId+'/environments/'+environmentId+'/entries?access_token='+accessToken

//const url = 'https://cdn.contentful.com/spaces/pvk91asdexs7/environments/master/entries?access_token=6e5d7baf47cac045aef2896027c5fd315a0c4b03e093ba789bdd3bb833cce315'

const sectionTag = document.querySelector("section.grid")

const grabData = function () {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            // store the assets somewhere
            const assets = data.includes.Asset

            // turn our content data into some more useful
            return data.items.map(item => {
                let imageUrl = "assets/image1.jpg"

                const imageId = item.fields.image.sys.id

                const imageData = assets.find(asset => {
                    return asset.sys.id == imageId
                })

                if (imageData) {
                    imageUrl = imageData.fields.file.url
                }

                item.fields.image = imageUrl
                return item.fields
            })
        })
}

// run this grabData function on load
grabData().then(data => {
    // in here, do something with the rerurned data
    console.log(data)

    // remove the loader
    sectionTag.innerHTML = ""

    data.forEach(item => {
        sectionTag.innerHTML = sectionTag.innerHTML + `
            <div class="item">
                <img src="${item.image}">
                <div class="title">
                    <h2> ${item.title} </h2>
                    <h2> ${item.price} </h2>
                </div>
                <p> ${item.description}</p>
            </div>
        `
    })
})

