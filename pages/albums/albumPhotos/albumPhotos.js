import {get} from '../../../api.js'

const photosMain = document.getElementById('template');
const slideLeftBtn = document.getElementById('slide-left-btn');
const slideRightBtn = document.getElementById('slide-right-btn');
const imgEl = document.getElementById('img');

let photos = [];
let photosEl = [];
let length = 0;
let path = window.location.pathname.split('/')
let photoIndex = 0;

async function getPhotos(id){
    photos = await get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`);
    photos = photos.slice(40);
    showPhotos();
}

function showPhotos(){
    const slideGroup = document.getElementById('slider');
    for(let photo of photos){
        const slideEl = document.createElement('div');
        slideEl.setAttribute('class', 'slide');
        const imgEl = document.createElement('img')
        imgEl.setAttribute('src', photo.url);
        imgEl.setAttribute('title',photo.title);
        slideEl.appendChild(imgEl)
        photosEl.push(slideEl);
        slideGroup.appendChild(slideEl);
    }
    length = photosEl.length
    // const pixels = (length/2*600 - 300)
    // photosEl.forEach((el)=>{
    //     el.style.transform = `translateX(${pixels}px)`
    // })
}

function slide(index){
    const pixels = (length/2*600 - 300 - index*600);
    photosEl.forEach((el)=>{
        el.style.transform = `translateX(${pixels}px)`
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