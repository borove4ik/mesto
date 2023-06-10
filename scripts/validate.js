const disableSubmit = (formData) => {
  const submitButtons = document.querySelectorAll(
    formData.submitButtonSelector
  );
  submitButtons.forEach((submitButton) => {
    submitButton.setAttribute("disabled", "");
  });
};

const enableSubmit = (formData) => {
  const submitButtons = document.querySelectorAll(
    formData.submitButtonSelector
  );
  submitButtons.forEach((submitButton) => {
    submitButton.removeAttribute("disabled", "");
  });
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

const hasInvalidInput = (inputElementList) => {
  return Array.from(inputElementList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputElementList, formData) => {
  if (!hasInvalidInput(inputElementList)) {
    enableSubmit(formData);
  } else {
    disableSubmit(formData);
  }
};

const validateInput = (formData, inputElement, currentForm) => {
  if (inputElement.validity.valid) {
    hideError(formData, inputElement, currentForm);
  } else {
    showError(formData, inputElement, currentForm);
  }
};

const setEventListeners = (inputElement, formData) => {
  const fieldList = inputElement.querySelectorAll(formData.inputSelector);
  fieldList.forEach((currentInput) => {
    currentInput.addEventListener("input", () => {
      validateInput(formData, currentInput, inputElement);
      toggleButtonState(fieldList, formData);
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
