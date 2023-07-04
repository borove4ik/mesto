export class Constants {
  constructor() {
    this.profileFormElement = document.querySelector("#profile-edit");
    this.placeFormElement = document.querySelector("#place-edit");
    this.profilePopup = document.querySelector("#profile-popup");
    this.popupNewPlace = document.querySelector("#popup-new-place");
    this.popupCard = document.querySelector("#popup-open-card");
    this.nameInput = document.querySelector("#input-name");
    this.jobInput = document.querySelector("#input-bio");
    this.placeInput = document.querySelector("#input-place");
    this.linkInput = document.querySelector("#input-link");
    this.profilePopupTrigger = document.querySelector(".profile__edit-button");
    this.popupCloseButtons = document.querySelectorAll(".popup__close-button");
    this.profileName = document.querySelector(".profile__name");
    this.jobName = document.querySelector(".profile__description");
    this.newPlacePopupTrigger = document.querySelector(".profile__add-button");
    this.cardTemplate = document.querySelector("#gallery__element").content;
    this.gallery = document.querySelector(".gallery");
    this.initialCards = [
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
    this.formData = {
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    };
  }
}
