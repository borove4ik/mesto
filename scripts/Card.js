export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _handleOpenPopup(evt) {
    this._popupCard = document.querySelector("#popup-open-card");
    this._popupPhoto = this._popupCard.querySelector(".popup__gallery-photo");
    this._popupText = this._popupCard.querySelector(
      ".popup__gallery-description"
    );
    this._popupPhoto.src = evt.target.src;
    this._popupPhoto.alt = evt.target.src;
    this._popupText.textContent = evt.target.alt;
    this._popupCard.classList.add("popup_opened");
    this._handleClosePopup = (evt) => {
      if (evt.key === "Escape") {
        this._popupCard.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleClosePopup);
      }
    };
    document.addEventListener("keydown", this._handleClosePopup);
  }

  _handleDeleteCard() {
    this._card = this.parentNode;
    this._card.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", (evt) => {
      evt.currentTarget.classList.toggle("gallery__like_active");
    });
    this._galleryImage.addEventListener("click", this._handleOpenPopup);
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
    this._setEventListeners(this._element);
    return this._element;
  }
}
