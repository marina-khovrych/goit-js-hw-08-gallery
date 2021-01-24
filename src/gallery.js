import gallery from "./gallery-items.js";
const galleryList = document.querySelector(".js-gallery");
const liRefs = gallery
  .map((galleries) => {
    return `<li class="gallery__item"> <a
    class="gallery__link" href='${galleries.original}'><img class="gallery__image" src='${galleries.preview}' data-source='${galleries.original}' alt='${galleries.description}'/> </a></li>`;
  })
  .join("");
galleryList.insertAdjacentHTML("afterbegin", liRefs);
console.log(galleryList);

const lightboxRef = document.querySelector(".js-lightbox");
console.log(lightboxRef);
const bigImg = document.querySelector(".lightbox__image");
console.log(bigImg);
const closeLightboxBtn = document.querySelector(
  'button[data-action="close-lightbox"]'
);
console.log(closeLightboxBtn);
const lightboxOverlay = document.querySelector(".lightbox__overlay");
function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  lightboxRef.classList.add("is-open");
  bigImg.setAttribute("src", event.target.dataset.source);
  window.addEventListener("keydown", closeLightBoxByEsc);
  lightboxOverlay.addEventListener("click", closeLightBoxByClick);
  closeLightboxBtn.addEventListener("click", closeLightBoxByBtn);
}
function closeLightBoxByBtn() {
  lightboxRef.classList.remove("is-open");
  bigImg.setAttribute("src", "");
  window.removeEventListener("keydown", closeLightBoxByEsc);
  lightboxOverlay.removeEventListener("click", closeLightBoxByClick);
  closeLightboxBtn.removeEventListener("click", closeLightBoxByBtn);
}
function closeLightBoxByEsc(event) {
  if (event.code === "Escape") {
    closeLightBoxByBtn();
  }
}
function closeLightBoxByClick(event) {
  if (event.target === event.currentTarget) {
    closeLightBoxByBtn();
  }
}

galleryList.addEventListener("click", onGalleryClick);
