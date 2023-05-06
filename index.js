let formElement = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__form_input_name');
let jobInput = document.querySelector('.popup__form_input_bio');
let popupTrigger = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close-button');

popupTrigger.addEventListener('click', function () {
  formElement.classList.add ('popup_opened')
});

popupClose.addEventListener('click', function () {
  formElement.classList.remove('popup_opened')
})

function handleFormSubmit (evt) {
  evt.preventDefault();
  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  formElement.classList.remove('popup_opened')
}

formElement.addEventListener('submit', handleFormSubmit);



