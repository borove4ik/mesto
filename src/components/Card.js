export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

_handleLikeClick(evt) {
  evt.currentTarget.classList.toggle("gallery__like_active");
}

  _setEventListeners() {
    this._likeButton.addEventListener("click", (evt) => this._handleLikeClick(evt));
    this._galleryTrash.addEventListener("click", this.deleteCard);
    this.photo.addEventListener("click", this._handleCardClick);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__element")
      .cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".gallery__like");
    this._galleryTrash = this._element.querySelector(".gallery__trash");
    this._element.querySelector(".gallery__photo").src = this._link;
    this._element.querySelector(".gallery__photo").alt = this._name;
    this.photo = this._element.querySelector(".gallery__photo");
    this._element.querySelector(".gallery__element-description").textContent =
      this._name;
    this._setEventListeners();
    return this._element;
  }
}
