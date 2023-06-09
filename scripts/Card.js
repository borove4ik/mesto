const popupCard = document.querySelector("#popup-open-card");
const popupPhoto = popupCard.querySelector(".popup__gallery-photo");
const popupText = popupCard.querySelector(
  ".popup__gallery-description"
);
import { openPopup } from "./index.js";
export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _handleOpenPopup(evt, popupPhoto, popupText, popupCard) {
    popupPhoto.src = evt.target.src;
    popupPhoto.alt = evt.target.src;
    popupText.textContent = evt.target.alt;
    openPopup(popupCard);
  }

  _handleDeleteCard() {
    this._card = this.closest('.gallery__element');
    this._card.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", (evt) => {
      evt.currentTarget.classList.toggle("gallery__like_active");
    });
    this._galleryImage.addEventListener("click", (evt) => {this._handleOpenPopup(evt, popupPhoto, popupText, popupCard)});
    this._trashButton.addEventListener("click", this._handleDeleteCard);
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__element")
      .cloneNode(true);
    return this._cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._galleryImage = this._element.querySelector(".gallery__photo");
    this._trashButton = this._element.querySelector(".gallery__trash");
    this._likeButton = this._element.querySelector(".gallery__like");
    this._galleryImage.src = this._link;
    this._galleryImage.alt = this._name;
    this._element.querySelector(".gallery__element-description").textContent =
      this._name;
    this._setEventListeners();
    return this._element;
  }
}
