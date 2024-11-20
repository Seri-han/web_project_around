let popupForm = document.querySelector("#popupForm");
let editButton = document.querySelector(".profile__info-edit-btn");
let nameInput = document.querySelector("#name-input");
let jobInput = document.querySelector("#job-input");
let profileName = document.querySelector(".profile__info-header");
let profileJob = document.querySelector(".profile__info-title");

let addCardPopup = document.querySelector("#addCardPopup");
let addButton = document.querySelector(".profile__add-btn");
let titleInput = document.querySelector("#place__title-input");
let linkInput = document.querySelector("#place__link-input");

function openPopup(popup) {
  popup.classList.add("popup_show");
}

function closePopup(popup) {
  popup.classList.remove("popup_show");
}

editButton.addEventListener("click", function () {
  openPopup(popupForm);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});


addButton.addEventListener("click", function() {
  openPopup(addCardPopup);
  titleInput.value = "";
  linkInput.value = "";
});

document.querySelectorAll(".popup__close-btn").forEach(button => {
  button.addEventListener("click", function () {
    const popup = button.closest(".popup");  
    closePopup(popup);
  });
});

popupForm.querySelector(".popup__form").addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupForm);  
});

addCardPopup.querySelector(".popup__form").addEventListener("submit", function (evt) {
  evt.preventDefault();
  const titleValue = titleInput.value;
  const imageValue = linkInput.value;
  createCard(titleValue, imageValue);
  closePopup(addCardPopup);  
});

function createCard(title, imageLink) {
  const cardContainer = document.querySelector(".elements"); 
  const cardElement = document.createElement("div");
  cardElement.classList.add("element");

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
    
    if (likeButton.classList.contains('active')) {
      likeButton.classList.remove('active');
    } else {
      likeButton.classList.add('active');
    }
  });
});


// 

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

//

function closePopupOnOverlay(evt) {
  if (evt.target.classList.contains('popup_show')) {
    closePopup(evt.target)
  }
}

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_show');
    if(activePopup) closePopup(activePopup);
  }
}

document.addEventListener('mousedown', closePopupOnOverlay);
document.addEventListener('keydown', closePopupOnEsc);