import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this._inputList = this._form
      ? this._form.querySelectorAll(".form__input")
      : [];
    this._submitButton = this._form
      ? this._form.querySelector(".form__submit")
      : null;

    if (!this._submitButton) {
      console.error(
        `No se encontró el botón de envío en el popup: ${popupSelector}`
      );
      return;
    }

    this._submitButtonText = this._submitButton.textContent;
  }

  open(handleConfirm) {
    super.open();
    this._handleConfirm = handleConfirm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (this._handleConfirm) {
        this._handleConfirm();
        this.close();
      }
    });
  }
}