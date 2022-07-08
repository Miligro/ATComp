import {get} from '../../../api.js'

const slideLeftBtn = document.getElementById('slide-left-btn');
const slideRightBtn = document.getElementById('slide-right-btn');

let photos = [];
let photosEl = [];
let length = 0;
let path = window.location.pathname.split('/')
let photoIndex = 0;
let sliderWidth = 0;
async function getPhotos(id){
    photos = await get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`);
    showPhotos();
}

function showPhotos(){
    const slideGroup = document.getElementById('slider');
    sliderWidth = slideGroup.offsetWidth;
    sliderHeight = slideGroup.offsetWidth;
    for(let photo of photos){
        const slideEl = document.createElement('div');
        slideEl.setAttribute('class', 'slide');

        const imgEl = document.createElement('img')
        imgEl.setAttribute('src', photo.url);
        imgEl.setAttribute('title',photo.title);
        imgEl.style.width = sliderWidth + 'px';
        imgEl.style.height = sliderHeight + 'px';
        slideEl.appendChild(imgEl)
        photosEl.push(slideEl);
        slideGroup.appendChild(slideEl);
    }
    length = photosEl.length
}

function slide(index){
    photosEl.forEach((el)=>{
        el.style.transform = `translateX(-${index*sliderWidth}px)`
    })
}

slideLeftBtn.addEventListener('click', ()=>{
    const index = photoIndex - 1
    if(index >= 0){
        photoIndex = index;
        slide(photoIndex);
    }
    
})

slideRightBtn.addEventListener('click', ()=>{
    const index = photoIndex + 1
    if(index < length){
        photoIndex = index;
        slide(photoIndex);
    }
})

getPhotos(+path[path.length-1])