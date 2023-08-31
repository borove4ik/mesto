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
    this.buttonTextContent = this.submit.textContent;
    console.log(this.buttonTextContent)
    this._inputValues = {};
    this.validatorInstance =validatorInstance;
  }

  setInputValues(fields) {
    Object.keys(fields).forEach((key) => {
      [...this.inputList].find((item) => item.name === key).value = fields[key];
    });
  }

  deployRequestStatus() {
    this.submit.textContent = 'Сохранение...'
    console.log('меняю текст кнопки')
  }

resetDeployRequestStatus = () => {
  console.log('меняю текст кнопки на исходный')
  this.submit.textContent = this.buttonTextContent;
}

  _getInputValues() {
    this.inputList.forEach((item) => {
      this._inputValues[item.name] = item.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.submit.addEventListener("click", (evt) =>{
      evt.preventDefault();
      this.deployRequestStatus()
      this.handleFormSubmit(this._getInputValues(evt))
    }
    );
  }

  open = () => {
    super.open.call(this);
  };

  close = () => {
    super.close();
    this.form.reset();
    this.hideErrorAndEnableSubmit(this.validatorInstance);
  }
}
