const profileFormElement = document.querySelector("#profile-edit");
const placeFormElement = document.querySelector("#place-edit");
const profilePopup = document.querySelector("#profile-popup");
const popupNewPlace = document.querySelector("#popup-new-place");
const popupCard = document.querySelector("#popup-open-card");
const nameInput = document.querySelector("#input-name");
const jobInput = document.querySelector("#input-bio");
const placeInput = document.querySelector("#input-place");
const linkInput = document.querySelector("#input-link");
const popupTrigger = document.querySelector(".profile__edit-button");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const profileName = document.querySelector(".profile__name");
const jobName = document.querySelector(".profile__description");
const newPlacePopupTrigger = document.querySelector(".profile__add-button");
const cardTemplate = document.querySelector("#gallery__element").content;
const gallery = document.querySelector(".gallery");
const popupPhoto = popupCard.querySelector(".popup__gallery-photo");
const popupText = popupCard.querySelector(".popup__gallery-description");
const initialCards = [
  {
    name: "Момент",
    link: "./images/denis-borovets-iu7MOEd5Pso-unsplash.jpg",
  },
  {
    name: "Кофе",
    link: "./images/denis-borovets-BJmlFjOilY8-unsplash.jpg",
  },
  {
    name: "Вверх ногами",
    link: "./images/denis-borovets-U7CwcXbKDR8-unsplash.jpg",
  },
  {
    name: "Отражение",
    link: "./images/denis-borovets-Yz4uaXC-XUY-unsplash.jpg",
  },
  {
    name: "Кровать",
    link: "./images/denis-borovets-RwwKIBFCM-s-unsplash.jpg",
  },
  {
    name: "Окно",
    link: "./images/denis-borovets-vR7TZ25uCLQ-unsplash.jpg",
  },
];
const formData = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};