//Declaration
const imageContainer = document.getElementById("image-container")
const loader = document.getElementById("loader")
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//Unsplash api
const count  = 30;
const apiKey = '0EHVpPsvkxlvblRshhyJzmSJL9uhad2GVz5vCuWlGdA'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
// image loader functyion
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded=== totalImages){
        ready = true;
        loader.hidden = true;
    }
}
// Helper function to set atributes on DOM elements
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}
// Create Elements for links & PHOTOS,Add to the DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length
    // run function for each in array photosArray
    photosArray.forEach((photo) =>{
        // Create <a> to link UNSPLASH
        const item = document.createElement('a')
        setAttributes(item,{
            href : photo.links.html,
            target: '_blank'
        })
        // Create <img> for photo
        const img = document.createElement('img')
        setAttributes(img,{
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description
        })
        //Put <img> inside the <a>, then put both inside imageContainer
        //Add event listener when all images are loaded
        img.addEventListener('load', imageLoaded)
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}
// get photos from UNSPLASH API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
    }catch(err){
        console.log(err)
    }
}
// Check when scrolling is near bottom of page load more photos
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos()
    }
})

//on load
getPhotos()