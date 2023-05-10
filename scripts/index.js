let formElement = document.querySelector('.popup__form');
let popupWindow = document.querySelector('.popup');
let nameInput = document.querySelector('#input-name');
let jobInput = document.querySelector('#input-bio');
let popupTrigger = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let jobName = document.querySelector('.profile__description');



function formClose () {
  popupWindow.classList.remove('popup_opened')
}

function formOpen () {
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
  popupWindow.classList.add ('popup_opened')
}

popupTrigger.addEventListener('click', formOpen);

popupClose.addEventListener('click', formClose);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;
  formClose ()
}

formElement.addEventListener('submit', handleFormSubmit);



