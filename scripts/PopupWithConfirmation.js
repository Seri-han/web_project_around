import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    const popupElement = document.querySelector(popupSelector);
    super(popupElement);
    this._formElement = document.querySelector("#form__button-delete");
    this._handleConfirm = null;
  }

  open(card) {
    const saveButton = this._popupElement.querySelector(".popup__save-button");

    super.open();

    saveButton.classList.remove("popup__button_disabled");
    saveButton.disabled = false;
    saveButton.addEventListener("click", () => {
      card.remove();
      super.close();
    });

    this._card = card; // Store the callback
  }

  setEventListener() {
    // super.setEventListener();
    this._popupElement.addEventListener("click", () => {
      // this._handleDeleteSubmit();
      // this.close();

      if (this._handleConfirm) {
        this._handleConfirm(); // Execute the callback
        this.close();
      }
    });
  }
}
