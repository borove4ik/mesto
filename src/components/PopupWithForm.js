import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(
    popup,
    handleFormSubmit,
    hideErrorAndEnableSubmit,
    validatorInstance
  ) {
    super(popup);
    
    this.form = this.popup.querySelector(".popup__form");
    this.handleFormSubmit = handleFormSubmit;
    this.hideErrorAndEnableSubmit = hideErrorAndEnableSubmit;
    this.inputList = this.form.querySelectorAll(".popup__input");
    this.submit = this.popup.querySelector(".popup__button");
    this.buttonTextContent = this.submit.value;
    this._inputValues = {};
    this.validatorInstance =validatorInstance;
  }

  setInputValues(fields) {
    Object.keys(fields).forEach((key) => {
      [...this.inputList].find((item) => item.name === key).value = fields[key];
    });
  }

  deployRequestStatus() {
    this.submit.value = 'Сохранение...'
  }

resetDeployRequestStatus() {
  this.submit.value = this.buttonTextContent;
}

  _getInputValues(evt) {
    evt.preventDefault();
    this.deployRequestStatus()
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
    this.resetDeployRequestStatus();
    this.form.reset();
    this.hideErrorAndEnableSubmit(this.validatorInstance);
  }
}
