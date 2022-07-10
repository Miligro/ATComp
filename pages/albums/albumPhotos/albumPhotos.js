import { get } from "../../../api.js";

const slideLeftBtn = document.getElementById("slide-left-btn");
const slideRightBtn = document.getElementById("slide-right-btn");

let photos = [];
let length = 0;
let path = window.location.pathname.split("/");
const sliderWidth = 500;
const sliderHeight = 500;

async function getPhotos(id) {
  photos = await get(
    `https://jsonplaceholder.typicode.com/albums/${id}/photos`
  );
  showPhotos();
}

function showPhotos() {
  const slider = document.getElementById("slider");
  slider.style.height = `${sliderHeight}px`;
  slider.style.width = `${sliderWidth}px`;
  const slides = document.getElementById("slides");
  for (let photo of photos) {
    const slideEl = document.createElement("div");
    slideEl.setAttribute("class", "slide");

    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", photo.url);
    imgEl.setAttribute("title", photo.title);
    imgEl.style.maxWidth = sliderWidth + "px";
    imgEl.style.maxHeight = sliderHeight + "px";
    slideEl.appendChild(imgEl);
    slides.appendChild(slideEl);
  }
  length = photos.length;
  slides.style.width = `${length * sliderWidth}px`;

  if (length > 1) {
    slides.style.marginLeft = `-${sliderWidth}px`;
  }
  slides.insertBefore(slides.lastElementChild, slides.firstElementChild);
}

function slideLeft() {
  const slides = document.getElementById("slides");
  slides.style.transition = `left 0.2s`;
  slides.style.left = `${sliderWidth}px`;

  setTimeout(() => {
    slides.insertBefore(slides.lastElementChild, slides.firstElementChild);
    slides.style.transition = ``;
    slides.style.left = `0px`;
  }, 200);
}

function slideRight() {
  const slides = document.getElementById("slides");
  slides.style.transition = `left 0.2s`;
  slides.style.left = `${-sliderWidth}px`;
  setTimeout(() => {
    slides.appendChild(slides.firstElementChild);
    slides.style.transition = ``;
    slides.style.left = ``;
  }, 200);
}

slideLeftBtn.addEventListener("click", () => {
  slideLeft();
});

slideRightBtn.addEventListener("click", () => {
  slideRight();
});

getPhotos(+path[path.length - 1]);
