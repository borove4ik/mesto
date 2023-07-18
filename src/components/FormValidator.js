export class FormValidator {
  constructor(formData, currentForm) {
    this._formSelector = formData.formSelector;
    this._inputSelector = formData.inputSelector;
    this._submitButtonSelector = formData.submitButtonSelector;
    this._inactiveButtonClass = formData.inactiveButtonClass;
    this._inputErrorClass = formData.inputErrorClass;
    this._errorClass = formData.errorClass;
    this._formData = formData;
    this._currentForm = currentForm;
    this._inputList =  this._currentForm.querySelectorAll(this._inputSelector);
    this._submitButton =  this._currentForm.querySelector(
      this._submitButtonSelector
    );
  }
  _disableSubmit() {
    this._submitButton.setAttribute("disabled", "");
  }

  enableSubmit() {
    this._submitButton.removeAttribute("disabled");
  }

  _showError(inputElement) {
    this._errorInput =  this._currentForm.querySelector(
      `#${inputElement.id}-error`
    );
    this._errorInput.classList.add(this._errorClass);
    this._errorInput.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
  }

  hideError(inputElement) {
    this._errorInput =  this._currentForm.querySelector(
      `#${inputElement.id}-error`
    );
    this._errorInput.classList.remove(this._formData.errorClass);
    this._errorInput.textContent = "";
    inputElement.classList.remove(this._formData.inputErrorClass);
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (!this._hasInvalidInput()) {
      this.enableSubmit();
    } else {
      this._disableSubmit();
    }
  }

  _validateInput(currentInput) {
    if (currentInput.validity.valid) {
      this.hideError(currentInput);
    } else {
      this._showError(currentInput);
    }
  }

  _setInputEventListener(evt) {
    this._validateInput(evt.currentTarget);
    this._toggleButtonState();
  }

  _setEventListeners() {
    this._inputList.forEach((currentInput) => {
      currentInput.addEventListener("input", this._setInputEventListener.bind(this));
    });
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this.hideError(inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
