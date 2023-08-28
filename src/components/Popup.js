export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.popup = document.querySelector(this._popupSelector);
    this._closeButton = this.popup.querySelector(".popup__close-button");
  }

  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this.popup.classList.add("popup_opened");
  }

  close() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleOverlayClose = (evt) => {
    if (evt.target === this.popup) {
      this.close();
    }
  } 

  _handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        this.close()
      }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close.bind(this));
    this.popup.addEventListener('mousedown', this._handleOverlayClose);
  }
}