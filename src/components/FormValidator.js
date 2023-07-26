export class FormValidator {
  constructor(formData, formElement, isEnableSubmit = false) {
    this._isEnableSubmit = isEnableSubmit;
    this._formSelector = formData.formSelector;
    this._inputSelector = formData.inputSelector;
    this._submitButtonSelector = formData.submitButtonSelector;
    this._inactiveButtonClass = formData.inactiveButtonClass;
    this._inputErrorClass = formData.inputErrorClass;
    this._errorClass = formData.errorClass;
    this._popupForm = formElement; 
    this._fieldList = this._popupForm.querySelectorAll(this._inputSelector);
    this._submitButton = this._popupForm.querySelector(this._submitButtonSelector)
  }

  _disableSubmit() {
    this._submitButton.setAttribute("disabled", "");
  }

  _enableSubmit() {
    this._submitButton.removeAttribute("disabled");
  }

  _showError(inputElement) {
    this._errorInput =  this._popupForm.querySelector( 
      `#${inputElement.id}-error` 
    ); 
    this._errorInput.classList.add(this._errorClass); 
    this._errorInput.textContent = inputElement.validationMessage; 
    inputElement.classList.add(this._inputErrorClass); 
  }

  _hideError(inputElement) {
    this._errorInput =  this._popupForm.querySelector( 
      `#${inputElement.id}-error` 
    ); 
    this._errorInput.classList.remove(this._errorClass); 
    this._errorInput.textContent = ""; 
    inputElement.classList.remove(this._inputErrorClass); 
  }

  handleClosedFormValidation () {
    this._fieldList.forEach((input) => {
      this._hideError(input)
    })
    if (this._isEnableSubmit) {
      this._disableSubmit()
    } else {
      this._enableSubmit()
    }
  }

  _hasInvalidInput() {
    return Array.from(this._fieldList).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (!this._hasInvalidInput()) {
      this._enableSubmit();
    } else {
      this._disableSubmit();
    }
  } 

  _validateInput(currentInput) {
    if (currentInput.validity.valid) {
      this._hideError(currentInput);
    } else {
      this._showError(currentInput);
    }
  }

  _setEventListeners() {
    this._fieldList.forEach((currentInput) => {
      currentInput.addEventListener("input", () => {
        this._validateInput(currentInput);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}