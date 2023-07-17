import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._galleryPhoto = this.popup.querySelector(".popup__gallery-photo");
    this._description = this.popup.querySelector(".popup__gallery-description");
  }

  open({link, name}) {
    super.open.call(this);
    this._galleryPhoto.src = link;
    this._galleryPhoto.alt = name;
    this._description.textContent = name;
  }
}