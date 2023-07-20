import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(
    popup,
    handleFormSubmit,
    hideErrorAndEnableSubmit,
    isEnableSubmit = false
  ) {
    super(popup);
    this.form = this.popup.querySelector(".popup__form");
    this.handleFormSubmit = handleFormSubmit;
    this.hideErrorAndEnableSubmit = hideErrorAndEnableSubmit;
    this.isEnableSubmit = isEnableSubmit;
    this.inputList = this.form.querySelectorAll(".popup__input");
    this.submit = this.popup.querySelector(".popup__button");
    this._inputValues = {};
  }

  setInputValues(fields) {
    Object.keys(fields).forEach((key) => {
      [...this.inputList].find((item) => item.name === key).value = fields[key];
    });
  }

  _getInputValues(evt) {
    evt.preventDefault();
    this.inputList.forEach((item) => {
      this._inputValues[item.name] = item.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.submit.addEventListener("click", (evt) =>
      this.handleFormSubmit(this._getInputValues(evt))
    );
  }

  open = () => {
    super.open.call(this);
  };

  close() {
    super.close();
    this.form.reset();
    this.hideErrorAndEnableSubmit(this.form, this.submit, this.isEnableSubmit);
  }
}
