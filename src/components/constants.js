import moment from "../images/denis-borovets-iu7MOEd5Pso-unsplash.jpg"
import coffee from "../images/denis-borovets-BJmlFjOilY8-unsplash.jpg"
import upsidedown from "../images/denis-borovets-U7CwcXbKDR8-unsplash.jpg"
import reflection from "../images/denis-borovets-Yz4uaXC-XUY-unsplash.jpg"
import bed from "../images/denis-borovets-RwwKIBFCM-s-unsplash.jpg"
import window from "../images/denis-borovets-vR7TZ25uCLQ-unsplash.jpg"
export class Constants {
  constructor(){
    this.profileEditTrigger = document.querySelector(".profile__edit-button");
    this.newPlacePopupTrigger = document.querySelector(".profile__add-button");
    this.initialCards = [
      {
        name: "Момент",
        link: moment,
      },
      {
        name: "Кофе",
        link: coffee,
      },
      {
        name: "Вверх ногами",
        link: upsidedown,
      },
      {
        name: "Отражение",
        link: reflection,
      },
      {
        name: "Кровать",
        link: bed,
      },
      {
        name: "Окно",
        link: window,
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
