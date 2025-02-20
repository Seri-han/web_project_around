export class Card {
  constructor(
    name,
    link,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    isLiked,
    cardId
  ) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardId = cardId;
    this._isLiked = isLiked; // Estado inicial del like
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._btnLike.addEventListener("click", () => this._toggleLike());
    this._btnDelete.addEventListener("click", () =>
      this._handleDeleteClick(this._element)
    );
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._link, this._name)
    );
  }

  _toggleLike() {
    this._handleLikeClick(this._cardId, this._isLiked)
      .then((newState) => {
        this._isLiked = newState; // Actualizar el estado localmente
        this._updateLikeButton();
      })
      .catch((err) => console.error("Error al alternar 'me gusta':", err));
  }

  _updateLikeButton() {
    if (this._isLiked) {
      this._btnLike.classList.add("element__photo-like_active");
    } else {
      this._btnLike.classList.remove("element__photo-like_active");
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._btnLike = this._element.querySelector(".element__photo-like");
    this._btnDelete = this._element.querySelector(".element__photo-trash");
    this._cardImage = this._element.querySelector(".element__photo-link");
    this._element.querySelector(".element__photo-name").textContent =
      this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._updateLikeButton(); // Aplica el estado inicial del like
    this._setEventListeners();

    return this._element;
  }
}