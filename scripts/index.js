import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { openPopup, closePopup, handleEscClose, closePopupOnOverlay, closePopupOnEsc } from "./utils.js";

const popupForm = document.querySelector("#popupForm");
const addCardPopup = document.querySelector("#addCardPopup");

const formValidatorPopup = new FormValidator(popupForm);
const formValidatorAddCard = new FormValidator(addCardPopup);

formValidatorPopup.enableValidation();
formValidatorAddCard.enableValidation();

const editButton = document.querySelector(".profile__info-edit-btn");
const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#job-input");
const profileName = document.querySelector(".profile__info-header");
const profileJob = document.querySelector(".profile__info-title");

const addButton = document.querySelector(".profile__add-btn");
const titleInput = document.querySelector("#place__title-input");
const linkInput = document.querySelector("#place__link-input");

editButton.addEventListener("click", () => {
  openPopup(popupForm);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

addButton.addEventListener("click", () => {
  openPopup(addCardPopup);
  titleInput.value = "";
  linkInput.value = "";
});

document.querySelectorAll(".popup__close-btn").forEach((button) => {
  button.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  });
});

document.addEventListener("mousedown", closePopupOnOverlay);
document.addEventListener("keydown", closePopupOnEsc);

addCardPopup.querySelector(".popup__form").addEventListener("submit", function (evt) {
  evt.preventDefault();
  const titleValue = titleInput.value;
  const imageValue = linkInput.value;
  const card = new Card(titleValue, imageValue);
  const cardElement = card.createCard();
  document.querySelector('.elements').prepend(cardElement);
  closePopup(addCardPopup); 
});

popupForm.querySelector(".popup__form").addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupForm);
});

let popupImageCard = document.querySelector("#images-card");
let popupImage = popupImageCard.querySelector(".popup__image-container");
let popupImageTitle = popupImageCard.querySelector(".popup__image-title");

function openImagePopup(imageSrc, imageAlt, imageTitle) {
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupImageTitle.textContent = imageTitle;
  openPopup(popupImageCard);
}

document.querySelectorAll(".element__image").forEach(image => {
  image.addEventListener("click", function () {
    const imageSrc = image.src;
    const imageAlt = image.alt;
    const imageTitle = image.nextElementSibling.textContent;  
    openImagePopup(imageSrc, imageAlt, imageTitle);
  });
});

popupImageCard.querySelector(".popup__close-btn").addEventListener("click", function () {
  closePopup(popupImageCard);
});


const trashButtons = document.querySelectorAll('.element__trash');
const likeButtons = document.querySelectorAll('.element__like');

trashButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const element = e.target.closest('.element');
    element.remove();
  });
});

likeButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const likeButton = e.currentTarget;
    handleLikeButton(likeButton);
  });
});

function handleLikeButton(likeButton) {
  if (likeButton.classList.contains('active')) {
    likeButton.classList.remove('active');
  } else {
    likeButton.classList.add('active');
  }
}
