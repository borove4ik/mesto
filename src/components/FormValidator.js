 export class FormValidator {
  constructor(formData) {
    this._formSelector = formData.formSelector;
    this._inputSelector = formData.inputSelector;
    this._submitButtonSelector = formData.submitButtonSelector;
    this._inactiveButtonClass = formData.inactiveButtonClass;
    this._inputErrorClass = formData.inputErrorClass;
    this._errorClass = formData.errorClass;
    this.formData = formData;
  }
  _disableSubmit(submitButton) {
    submitButton.setAttribute("disabled", "");
  };

  enableSubmit(submitButton) {
    submitButton.removeAttribute("disabled");
  };

  _showError(inputElement, currentForm) {
    const errorInput = currentForm.querySelector(`#${inputElement.id}-error`);
    errorInput.classList.add(this._errorClass);
    errorInput.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
    
  };

  hideError(formData, inputElement, currentForm) {
    const errorInput = currentForm.querySelector(`#${inputElement.id}-error`);
    errorInput.classList.remove(formData.errorClass);
    errorInput.textContent = "";
    inputElement.classList.remove(formData.inputErrorClass);
  };

  _hasInvalidInput(fieldList) {
    return Array.from(fieldList).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState(fieldList, submitButton) {
    if (!this._hasInvalidInput(fieldList)) {
      this.enableSubmit(submitButton);
    } else {
     this._disableSubmit(submitButton);
    }
  };

  _validateInput(formData, currentInput, currentForm) {
    if (currentInput.validity.valid) {
      this.hideError(formData, currentInput, currentForm);
    } else {
      this._showError(currentInput, currentForm);
    }
  };

  _setEventListeners(currentForm) {
    const fieldList = currentForm.querySelectorAll(this._inputSelector);
    fieldList.forEach((currentInput) => {
      currentInput.addEventListener("input", (evt) => {
        const form = evt.currentTarget.parentNode;
        const submitButton = form.querySelector('.popup__button')
        this._validateInput(this.formData, currentInput, form);
        this._toggleButtonState(fieldList, submitButton);
      });
    });
  };

  enableValidation() {
    const popupForm = document.querySelectorAll(this._formSelector);
    popupForm.forEach((currentForm) => {
      this._setEventListeners(currentForm);
    });
  };
}

