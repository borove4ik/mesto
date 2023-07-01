export class FormValidator {
  constructor(formData, currentPopup) {
    this._formSelector = formData.formSelector;
    this._inputSelector = formData.inputSelector;
    this._submitButtonSelector = formData.submitButtonSelector;
    this._inactiveButtonClass = formData.inactiveButtonClass;
    this._inputErrorClass = formData.inputErrorClass;
    this._errorClass = formData.errorClass;
    this._formData = formData;
    this._currentPopup = document.querySelector(`#${currentPopup.id}`);
    this._popupForm = this._currentPopup.querySelector(this._formSelector);
    this._inputList = this._popupForm.querySelectorAll(this._inputSelector);
    this._submitButton = this._popupForm.querySelector(
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
    this._errorInput = this._popupForm.querySelector(
      `#${inputElement.id}-error`
    );
    this._errorInput.classList.add(this._errorClass);
    this._errorInput.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
  }

  hideError(inputElement) {
    this._errorInput = this._popupForm.querySelector(
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

  _setEventListeners() {
    this._inputList.forEach((currentInput) => {
      currentInput.addEventListener("input", () => {
        this._validateInput(currentInput);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    if (this._popupForm.id === "place-edit") {
      this._popupForm.reset();
    }
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this.hideError(inputElement);
      inputElement.removeEventListener("input", () => {
        this._validateInput(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
    this.resetValidation();
  }
}
