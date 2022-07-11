import { get } from "../../../api.js";
import {
  show as showLoading,
  destroy as destroyLoading,
} from "../../../loading";

const slideLeftBtn = document.getElementById("slide-left-btn");
const slideRightBtn = document.getElementById("slide-right-btn");
const slides = document.getElementById("slides");
let photos = [];
let length = 0;
let path = window.location.pathname.split("/");
const sliderWidth = 500;
const sliderHeight = 500;
const loadingEl = showLoading(document.getElementById("template"), "");

async function getPhotos(id) {
  photos = await get(
    `https://jsonplaceholder.typicode.com/albums/${id}/photos`
  );
  photos = photos.slice(1,3);
  showPhotos();
}

function showPhotos() {
  const slider = document.getElementById("slider");
  slider.style.height = `${sliderHeight}px`;
  slider.style.width = `${sliderWidth}px`;
  for (let photo of photos) {
    appendSlide(photo.url, photo.title);
  }
  slides.insertBefore(slides.lastElementChild, slides.firstElementChild);
  length = photos.length;
  if(length === 2){
    length += 1;
    slides.style.marginLeft = `-${sliderWidth}px`;
    appendSlide(slides.firstElementChild.firstElementChild.src, "")

    slideLeftBtn.addEventListener("click", () => {
      slideLeftSrc();
    });
    
    slideRightBtn.addEventListener("click", () => {
      slideRightSrc();
    });
  }
  else if (length > 1) {
    slides.style.marginLeft = `-${sliderWidth}px`;
    slideLeftBtn.addEventListener("click", () => {
      slideLeft();
    });
    
    slideRightBtn.addEventListener("click", () => {
      slideRight();
    });
  }

  slides.style.width = `${length * sliderWidth}px`;
  destroyLoading(loadingEl);
}

function appendSlide(url, title){
  const slideEl = document.createElement("div");
  slideEl.setAttribute("class", "slide");

  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", url);
  imgEl.setAttribute("title", title);
  imgEl.style.maxWidth = sliderWidth + "px";
  imgEl.style.maxHeight = sliderHeight + "px";
  slideEl.appendChild(imgEl);
  slides.appendChild(slideEl);
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

function slideLeftSrc() {
  const slides = document.getElementById("slides");
  slides.style.transition = `left 0.2s`;
  slides.style.left = `${sliderWidth}px`;

  setTimeout(() => {
    slides.insertBefore(slides.lastElementChild, slides.firstElementChild);
    slides.style.transition = ``;
    slides.style.left = `0px`;
  }, 200);
  slides.lastElementChild.firstElementChild.src = slides.firstElementChild.firstElementChild.src;
}

function slideRightSrc() {
  const slides = document.getElementById("slides");
  slides.style.transition = `left 0.2s`;
  slides.style.left = `${-sliderWidth}px`;
  setTimeout(() => {
    slides.appendChild(slides.firstElementChild);
    slides.style.transition = ``;
    slides.style.left = ``;
  }, 200);
  slides.lastElementChild.firstElementChild.src = slides.firstElementChild.firstElementChild.src;
}

getPhotos(+path[path.length - 1]);
