import { enableValidation, validateFormOnOpen, toggleButtonState  } from "./validate.js";


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

addCardPopup.querySelector(".popup__form").addEventListener("submit", function (evt) {
  evt.preventDefault();
  const titleValue = titleInput.value;
  const imageValue = linkInput.value;
  createCard(titleValue, imageValue);
  closePopup(addCardPopup); 
});

popupForm.querySelector(".popup__form").addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupForm);
});

function createCard(title, imageLink) {
  const cardContainer = document.querySelector('.elements');
  const cardElement = document.createElement('div');
  cardElement.classList.add('element');

  cardElement.innerHTML = `
    <button class="element__trash" type="button">
      <img class="trash-bin" src="../images/trash-bin.svg" alt="icono de basura">
    </button>
    <img src="${imageLink}" alt="${title}" class="element__image">
    <h2 class="element__title">${title}</h2>
    <div class="element__like"></div>
  `;

  cardElement.querySelector('.element__trash').addEventListener('click', (e) => {
    cardElement.remove();
  });

  cardElement.querySelector('.element__like').addEventListener('click', (e) => {
    const likeButton = e.currentTarget;
    handleLikeButton(likeButton)
  });

  cardContainer.prepend(cardElement);
}

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
  };
}