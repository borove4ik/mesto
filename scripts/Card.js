export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _setEventListeners(likeButton) {
    likeButton.addEventListener("click", (evt) => {
      evt.currentTarget.classList.toggle("gallery__like_active");
    });
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
    .content
    .querySelector(".gallery__element")
    .cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".gallery__like");
    this._element.querySelector(".gallery__photo").src = this._link;
    this._element.querySelector(".gallery__photo").alt = this._name;
    this._element.querySelector(".gallery__element-description").textContent = this._name;
    this._setEventListeners(this._likeButton);
    return this._element
  }
  
}

