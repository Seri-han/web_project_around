import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this._inputList = this._form.querySelectorAll(".form__input");
    this._submitButton = this._form.querySelector(".form__submit");
    this._submitButtonText = this._submitButton.textContent;
  }

  // Método privado para recopilar datos de todos los campos de entrada
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  // Método para cambiar el estado del botón
  _toggleLoadingState(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Guardando...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  // Método público para agregar los event listeners
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._toggleLoadingState(true); // Mostrar "Guardando..."
      this._handleFormSubmit(this._getInputValues())
        .then(() => this.close()) // Cerrar si la solicitud fue exitosa
        .catch((err) => console.error("Error al enviar formulario:", err))
        .finally(() => this._toggleLoadingState(false)); // Restaurar el botón
    });
  }

  // Método público para cerrar el popup y reiniciar el formulario
  close() {
    super.close();
  }
}
