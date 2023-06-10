const disableSubmit = (submitButton) => {
  submitButton.setAttribute("disabled", "");
};

const enableSubmit = (submitButton) => {   
  submitButton.removeAttribute("disabled");
};

const showError = (formData, inputElement, currentForm) => {
  const errorInput = currentForm.querySelector(`#${inputElement.id}-error`);
  errorInput.classList.add(formData.errorClass);
  errorInput.textContent = inputElement.validationMessage;
  inputElement.classList.add(formData.inputErrorClass);
};

const hideError = (formData, inputElement, currentForm) => {
  const errorInput = currentForm.querySelector(`#${inputElement.id}-error`);
  errorInput.classList.remove(formData.errorClass);
  errorInput.textContent = "";
  inputElement.classList.remove(formData.inputErrorClass);
};

const hasInvalidInput = (fieldList) => {
  return Array.from(fieldList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (fieldList, submitButton) => {
  if (!hasInvalidInput(fieldList)) {
    enableSubmit(submitButton);
  } else {
    disableSubmit(submitButton);
  }
};

const validateInput = (formData, currentInput, currentForm) => {
  if (currentInput.validity.valid) {
    hideError(formData, currentInput, currentForm);
  } else {
    showError(formData, currentInput, currentForm);
  }
};

const setEventListeners = (currentForm, formData) => {
  const fieldList = currentForm.querySelectorAll(formData.inputSelector);
  
  fieldList.forEach((currentInput) => {
    currentInput.addEventListener("input", (evt) => {
      const form = evt.currentTarget.parentNode;
      const submitButton = form.querySelector('.popup__button')
      validateInput(formData, currentInput, form);
      toggleButtonState(fieldList, submitButton);
    });
  });
};

const enableValidation = (formData) => {
  const popupForm = document.querySelectorAll(formData.formSelector);
  popupForm.forEach((currentForm) => {
    setEventListeners(currentForm, formData);
  });
};

enableValidation(formData);