import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import "./pages/index.css";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import {initialCards, formData} from './components/constants.js'

const userInfo = new UserInfo({
  userName: ".profile__name",
  userInfo: ".profile__description",
});

const editProfileForm = new PopupWithForm('#profile-popup', (inputData) => {
  userInfo.setUserInfo(inputData)
  editProfileForm.close()
})
editProfileForm.setEventListeners()
const profileEditTrigger = document.querySelector(".profile__edit-button");
profileEditTrigger.addEventListener('click', () => {
  editProfileForm.open();
  editProfileForm._setInputValues(userInfo.getUserInfo())
})

const profileFormValidator = new FormValidator(formData, editProfileForm._form);

profileFormValidator.enableValidation();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#gallery__element", () => {
        const photoPopup = new PopupWithImage("#popup-open-card");
        photoPopup.setEventListeners();
        photoPopup.open(item);
      });
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    },
  },
  ".gallery"
);

cardList._renderItems();

const placeEdit = new PopupWithForm('#popup-new-place', (cardData) => {
  const card = new Card(cardData,'#gallery__element', () => {
    const photoPopup = new PopupWithImage("#popup-open-card");
    photoPopup.setEventListeners();
    photoPopup.open(cardData)
  });
  const addedCard = card.createCard()
  cardList.addItem(addedCard)
  placeEdit.close()
})

placeEdit.setEventListeners()

const placeFormValidator = new FormValidator(formData, placeEdit._form);

placeFormValidator.enableValidation();
const newPlacePopupTrigger = document.querySelector(".profile__add-button");
newPlacePopupTrigger.addEventListener('click', placeEdit.open)