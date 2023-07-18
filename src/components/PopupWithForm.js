import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this.handleFormSubmit = handleFormSubmit;
    this._form = this.popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this.submit = this.popup.querySelector(".popup__button");
    this._inputValues = {};
  }

  _setInputValues(fields) {
    Object.keys(fields).forEach((key) => {
      [...this._inputList].find((item) => item.name === key).value = fields[key];
    });
  }

  _getInputValues(evt) {
    evt.preventDefault()
    this._inputList.forEach(item => {
      this._inputValues[item.name] = item.value;
    });
    return this._inputValues
  }

  setEventListeners() {
    super.setEventListeners();
    this.submit.addEventListener("click", (evt) => this.handleFormSubmit(this._getInputValues(evt)));
  }

  open = () => {
    super.open.call(this);
  };

  close() {
    super.close();
    this._form.reset();
  }
}
