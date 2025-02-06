import { FormValidator } from "../scripts/FormValidator.js";
import { Card } from "../scripts/Card.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import { api } from "../scripts/Api.js";
import PopupWithConfirmation from "../scripts/PopupWithConfirmation.js";
import { avatarButton, avatarInput, profileAvatar, closePopup, popupAvatar } from "../scripts/utils.js";
import Popup from "../scripts/Popup.js";
import '../pages/index.css';
import '../vendor/normalize.css';
var currentUser = null;
var cardList = null;

// Select the popup element
var popupDeleteCard = new PopupWithConfirmation({
  popupSelector: "#popupConfirmation" // Replace with your popup's CSS selector
});

// Obtener datos del usuarios y actualizarlos
api.getUserInfo().then(function (user) {
  if (!user) {
    console.error("No se pudo obtener información del usuario.");
    return;
  }

  // Configurar datos del usuario
  currentUser = user;
  userInfo.setUserInfo({
    name: user.name,
    about: user.about
  });
  profileAvatar.src = user.avatar;

  // Obtener tarjetas iniciales
  return api.getInitialCards();
}).then(function (cards) {
  if (!cards || !Array.isArray(cards)) {
    console.error("Las tarjetas iniciales no son válidas.");
    return;
  }
  console.log("ASDASDAS");
  console.log(cards);
  var cardList = new Section({
    data: cards,
    renderer: function renderer(item) {
      var card = new Card(item.name, item.link, {
        handleCardClick: function handleCardClick(link, name) {
          return popupZoom.open({
            link: link,
            name: name
          });
        },
        handleDeleteCard: function handleDeleteCard(cardId, callback) {
          popupDeleteCard.open(function () {
            api.deleteCard(cardId).then(function () {
              callback();
            });
          });
        },
        handleAddLike: function handleAddLike(cardId) {
          return api.addCardLike(cardId);
        },
        handleRemoveLike: function handleRemoveLike(cardId) {
          // return api.deleteCardLike(cardId);
        }
      });
      var cardElement = card.createCard();
      cardList.addItem(cardElement);
    }
  }, ".elements");
  cardList.renderItems(); // Renderizar tarjetas
})["catch"](function (err) {
  return console.error("Error en la carga inicial:", err);
});
//

var popupForm = document.querySelector("#popupForm");
var addCardPopup = document.querySelector("#addCardPopup");
var imagesCardPopup = document.querySelector("#images-card");
var formValidatorPopup = new FormValidator(popupForm);
var formValidatorAddCard = new FormValidator(addCardPopup);
formValidatorPopup.enableValidation();
formValidatorAddCard.enableValidation();
var editButton = document.querySelector(".profile__info-edit-btn");
var nameInput = document.querySelector("#name-input");
var jobInput = document.querySelector("#job-input");
var addButton = document.querySelector(".profile__add-btn");
var titleInput = document.querySelector("#place__title-input");
var linkInput = document.querySelector("#place__link-input");
var userInfo = new UserInfo({
  nameSelector: ".profile__info-header",
  jobSelector: ".profile__info-title"
});
var editProfilePopup = new PopupWithForm(popupForm, function (formData) {
  var name = formData.name,
    job = formData.job;
  userInfo.setUserInfo({
    name: name,
    job: job
  });
});

//avatar update
var avatarUpdate = new PopupWithForm({
  popupSelector: popupAvatar,
  handleFormSubmit: function handleFormSubmit(inputValue) {
    if (inputValue.avatar !== "") {
      return api.updateAvatarProfile(inputValue.avatar).then(function (user) {
        profileAvatar.src = inputValue.avatar;
      });
    }
  }
});
avatarButton.addEventListener("click", function () {
  avatarUpdate.open();
  avatarInput.value = profileAvatar.src;
});
avatarUpdate.setEventListeners();

//

editButton.addEventListener("click", function () {
  editProfilePopup.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
});
var cardsContainer = document.querySelector(".elements");
// const cardsSection = new Section([], (item) => item.createCard(), ".element");

var addCardPopupInstance = new PopupWithForm(addCardPopup, function (formData) {
  var title = formData.title,
    link = formData.link;
  var newCard = new Card(title, link, function (card) {
    return popupDeleteCard.open(card);
  });
  cardsSection.addItem(newCard);
});
addButton.addEventListener("click", function () {
  addCardPopupInstance.open();
});
addCardPopup.querySelector(".popup__form").addEventListener("submit", function (evt) {
  evt.preventDefault();
  var titleValue = titleInput.value;
  var imageValue = linkInput.value;
  var card = new Card(titleValue, imageValue, function (card) {
    return popupDeleteCard.open(card);
  });
  var cardElement = card.createCard();
  document.querySelector(".elements").prepend(cardElement);
  closePopup(addCardPopup);
});
popupForm.querySelector(".popup__form").addEventListener("submit", function (evt) {
  evt.preventDefault();
  var profileName = document.querySelector(".profile__info-header");
  var profileJob = document.querySelector(".profile__info-title");
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupForm);
});

// Event delegation for closing popups
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("popup_show")) {
    var activePopup = document.querySelector(".popup_show");
    if (activePopup) {
      activePopup.classList.remove(".popup_show");
    }
  }
});

// Handle Esc key for closing popups
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    var activePopup = document.querySelector(".popup_show");
    if (activePopup) {
      activePopup.classList.remove(".popup_show");
    }
  }
});

//popup images

var imagesCardPopupInstance = new PopupWithImage(imagesCardPopup);
document.querySelectorAll(".element__image").forEach(function (image) {
  image.addEventListener("click", function () {
    var imageSrc = image.src;
    var imageAlt = image.alt;
    var imageTitle = image.nextElementSibling.textContent;
    imagesCardPopupInstance.open(imageSrc, imageAlt, imageTitle);
  });
});

//trash and like handling
var trashButtons = document.querySelectorAll(".element__trash");
var likeButtons = document.querySelectorAll(".element__like");
trashButtons.forEach(function (trashButton) {
  trashButton.addEventListener("click", function (event) {
    var cardElement = event.target.closest(".element"); // Find the card to delete

    popupDeleteCard.open(cardElement);
  });
});
likeButtons.forEach(function (button) {
  button.addEventListener("click", function (e) {
    var likeButton = e.currentTarget;
    handleLikeButton(likeButton);
  });
});
function handleLikeButton(likeButton) {
  if (likeButton.classList.contains("active")) {
    likeButton.classList.remove("active");
  } else {
    likeButton.classList.add("active");
  }
}