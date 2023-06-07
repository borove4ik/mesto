//profileFormElement - редактировать профиль
//profilePopup - общий вместе с оверлеем
//nameInput
//jobInput 
//к функции енаблевалид первое условие - валидити тру и мы убираем с сабмита класс инактив => снимаем дисаблед


//const inputElementList = formData.formSelector.querySelectorAll(formData.inputSelector);
//console.log(inputElementList)

const disableSubmit = () => {
  const submitButtons = document.querySelectorAll(formData.submitButtonSelector);
  submitButtons.forEach((submitButton) => {
    submitButton.setAttribute('disabled', '');
    console.log(submitButton)
  })
}

const enableSubmit = () => {
  const submitButtons = document.querySelectorAll(formData.submitButtonSelector);
  submitButtons.forEach((submitButton) => {
    submitButton.removeAttribute('disabled', '');
    console.log(submitButton, 'enable')
  })
}

const inputElement = document.querySelector(formData.inputSelector);

const showError = (formData, inputElement) => {
  const errorInput = document.querySelector(`#${inputElement.id}-error`);
  errorInput.textContent = inputElement.validationMessage;
  inputElement.classList.add(formData.inputErrorClass);
  
}

const hideError = (formData, inputElement) => {
  const errorInput = document.querySelector(`#${inputElement.id}-error`);
  errorInput.textContent = '';
  inputElement.classList.remove(formData.inputErrorClass);
}

const hasInvalidInput = (inputElementList) => {
  return Array.from(inputElementList).some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (inputElementList) => {
  if (!hasInvalidInput(inputElementList)) {
    enableSubmit();
  } else {
    disableSubmit();
  }
}

const validateInput = (formData, inputElement) => {
 if (inputElement.validity.valid) {
  hideError(formData, inputElement); 
 } else {
  showError(formData, inputElement); 
 }
}

const setEventListeners = (inputElement, formData) => {
  const fieldList = inputElement.querySelectorAll(formData.inputSelector);
  fieldList.forEach((currentInput) => {
    currentInput.addEventListener('input', () => {
      validateInput(formData, currentInput);
      toggleButtonState(fieldList);
    })
  })
}

const enableValidation = (formData) => {
 const popupForm = document.querySelectorAll(formData.formSelector);
  popupForm.forEach((currentForm) => {
  setEventListeners(currentForm, formData);
  currentForm.addEventListener('submit', (evt) => {
   evt.preventDefault;
  })
 })
}

enableValidation(formData);