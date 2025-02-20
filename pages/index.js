import { Card } from "../scripts/Card.js";
import { PopupWithForm } from "../scripts/PopupWithForms.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithConfirmation } from "../scripts/PopupWithConfirmation.js";
import { Section } from "../scripts/Section.js";
import { UserInfo } from "../scripts/UserInfo.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { api } from "../utils/api.js";

document.addEventListener("DOMContentLoaded", () => {
  // Variables para modificar el perfil
  const popupProfile = document.querySelector("#popup-profile");
  const profileButton = document.querySelector(".profile__edit-button");
  const profileName = document.querySelector(".profile__name");
  const profileHobbie = document.querySelector(".profile__hobbie");
  const inputName = document.querySelector("#input-name");
  const inputHobbie = document.querySelector("#input-hobbie");
  const formProfile = document.querySelector("#form-profile");
  // Variables para agregar tarjetas (cards)
  const cardContainer = document.querySelector(".elements__container");
  const popupAddCard = document.querySelector("#popup-add-card");
  const formAddCard = document.querySelector("#form-addCard");
  const addButton = document.querySelector(".profile__add-button");
  const inputCardName = document.querySelector("#input-card-name");
  const inputLink = document.querySelector("#input-card-link");
  const closeButton = document.querySelector(".popup__close");
  const createButton = document.querySelector(".form__submit"); //botón de crear y guardar
  //Variables para agrandar imagen
  const popupCardImage = document.querySelector("#popup-show-card");
  const popupCardClose = document.querySelector(".popup__close-card");
  const inputAvatar = document.querySelector("#input-avatar-url");
  const profileAvatar = document.querySelector(".profile__avatar");

  //Variables para popup avatar
  const avatarButton = document.querySelector(".profile__edit-avatar");
  const popupAvatar = document.querySelector("#popup-avatar");

  // Configuración para la validación de formularios
  const config = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__submit_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
  };

  //  Instancias de clases
  const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    hobbieSelector: ".profile__hobbie",
    avatarSelector: ".profile__avatar",
  });

  // Popup de perfil
  const profilePopup = new PopupWithForm("#popup-profile", (data) => {
    api
      .updateUserProfile(data.name, data.hobbie)
      .then((updatedData) => {
        userInfo.setUserInfo(updatedData);
        profilePopup.close();
      })
      .catch((err) => console.error("Error al actualizar perfil:", err));
  });
  profilePopup.setEventListeners();

  // Popup para agregar tarjetas
  const addCardPopup = new PopupWithForm("#popup-add-card", (data) => {
    console.log("Datos de la tarjeta:", data);
    return api
      .addNewCard(data.name, data.link)
      .then((newCard) => {
        console.log("Tarjeta añadida:", newCard);
        const cardElement = createCard(newCard.link, newCard.name, newCard._id);
        cardContainer.prepend(cardElement);
        addCardPopup.close();
      })
      .catch((err) => console.error("Error al agregar tarjeta:", err));
  });
  addCardPopup.setEventListeners();

  // Popup para mostrar imágenes
  const showCardPopup = new PopupWithImage("#popup-show-card");
  showCardPopup.setEventListeners();
  // Popup para cambiar avatar
  const avatarPopup = new PopupWithForm("#popup-avatar", (data) => {
    api
      .updateUserAvatar(data.avatar)
      .then((updatedData) => {
        userInfo.setUserAvatar(data.avatar);
        avatarPopup.close();
      })
      .catch((err) => console.error("Error al actualizar avatar:", err));
  });
  avatarPopup.setEventListeners();
  // Popup de confirmación de eliminación
  const deletePopup = new PopupWithConfirmation("#popup-delete");
  deletePopup.setEventListeners();

  // Cargar datos del usuario desde la API
  api
    .getUserInfo()
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        hobbie: userData.about,
      });
      userInfo.setUserAvatar(userData.avatar);
    })
    .catch((err) => console.error("Error al obtener datos del usuario:", err));

  // Cargar tarjetas desde la API
  api
    .getInitialCards()
    .then((initialCards) => {
      const section = new Section(
        {
          items: initialCards.reverse(),
          renderer: (item) => {
            const newCard = createCard(
              item.link,
              item.name,
              item._id,
              item.isLiked
            );
            cardContainer.prepend(newCard);
          },
        },
        ".elements__container"
      );
      section.renderItems();
    })
    .catch((err) => console.error("Error al cargar tarjetas:", err));

  //  Validaciones de formularios
  const profileFormValidator = new FormValidator(config, formProfile);
  profileFormValidator.enableValidation();

  const addCardFormValidator = new FormValidator(config, formAddCard);
  addCardFormValidator.enableValidation();

  //  Función para crear tarjetas
  function createCard(link, name, cardId, isLiked) {
    const card = new Card(
      name,
      link,
      "#template__card",
      (link, name) => {
        showCardPopup.open();
        document.querySelector(".popup__photo-link").src = link;
        document.querySelector(".popup__photo-link").alt = name;
        document.querySelector(".popup__photo-name").textContent = name;
      },
      (cardElement) => {
        deletePopup.open(() => {
          api
            .removeCard(cardId) // Llamamos a la API con el ID de la tarjeta
            .then(() => {
              cardElement.remove(); // Eliminamos la tarjeta del DOM si la API responde correctamente
              deletePopup.close();
            })
            .catch((err) => console.error("Error al eliminar tarjeta:", err));
        });
      },
      (cardId, isLiked) => {
        return api
          .toggleLike(cardId, isLiked)
          .then(() => !isLiked)
          .catch((err) => {
            console.error("Error al alternar 'me gusta':", err);
            return isLiked;
          });
      },
      isLiked,
      cardId
    );

    return card.generateCard();
  }

  //  Eventos de apertura de popups
  profileButton.addEventListener("click", () => {
    const data = userInfo.getUserInfo();
    inputName.value = data.name;
    inputHobbie.value = data.hobbie;
    profilePopup.open();
  });

  addButton.addEventListener("click", () => addCardPopup.open());

  avatarButton.addEventListener("click", () => {
    inputAvatar.value = "";
    avatarPopup.open();
  });

  //  Eventos para cerrar popups al hacer clic fuera
  document.querySelectorAll(".popup__overlay").forEach((overlay) => {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        profilePopup.close();
        addCardPopup.close();
        showCardPopup.close();
        avatarPopup.close();
      }
    });
  });
});
