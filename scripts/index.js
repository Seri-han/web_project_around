import { enableValidation, validateFormOnOpen } from "./validate.js";


enableValidation();

const popupForm = document.querySelector("#popupForm");
const editButton = document.querySelector(".profile__info-edit-btn");
const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#job-input");
const profileName = document.querySelector(".profile__info-header");
const profileJob = document.querySelector(".profile__info-title");

const addCardPopup = document.querySelector("#addCardPopup");
const addButton = document.querySelector(".profile__add-btn");
const titleInput = document.querySelector("#place__title-input");
const linkInput = document.querySelector("#place__link-input");

function openPopup(popup) {
  if (!popup) {
    console.error("Popup no encontrado");
    return;
  }
  popup.classList.add("popup_show");
  document.addEventListener("keydown", handleEscClose); 

  if (popup.id === "popupForm") {
    const formElement = popup.querySelector(".popup__form");
    validateFormOnOpen(formElement);
  }
}


function closePopup(popup) {
  popup.classList.remove("popup_show");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_show");
    if (activePopup) closePopup(activePopup);
  }
}

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

document.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains("popup_show")) {
    closePopup(evt.target);
  }
});
