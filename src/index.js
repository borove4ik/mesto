import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import "./pages/index.css";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { initialCards, formData } from "./components/constants.js";

const userInfo = new UserInfo({
  userName: ".profile__name",
  userInfo: ".profile__description",
});

const formValidator = new FormValidator(formData);

const hideErrorAndEnableSubmit = (
  formElement,
  submitButton,
  isEnableSubmit
) => {
  const input = formElement.querySelectorAll(formData.inputSelector);

  input.forEach((item) => {
    formValidator.hideError(formData, item, formElement);
  });
  if (submitButton && isEnableSubmit) {
    formValidator.disableSubmit(submitButton)
  } else {
    formValidator.enableSubmit(submitButton)
  }
};

const editProfileForm = new PopupWithForm(
  "#profile-popup",
  (inputData) => {
    userInfo.setUserInfo(inputData);
    editProfileForm.close();
  },
  hideErrorAndEnableSubmit
);

editProfileForm.setEventListeners();

const profileEditTrigger = document.querySelector(".profile__edit-button");

profileEditTrigger.addEventListener("click", () => {
  editProfileForm.open();
  editProfileForm.setInputValues(userInfo.getUserInfo());
});

const placeEdit = new PopupWithForm(
  "#popup-new-place",
  (cardData) => {
    addCard(cardData);
    placeEdit.close();
  },
  hideErrorAndEnableSubmit, true
);

placeEdit.setEventListeners();
formValidator.enableValidation();

const newPlacePopupTrigger = document.querySelector(".profile__add-button");
newPlacePopupTrigger.addEventListener("click", placeEdit.open);

const photoPopup = new PopupWithImage("#popup-open-card");
const addCard = (cardData) => {
  const card = new Card(cardData, "#gallery__element", () => {
    photoPopup.setEventListeners();
    photoPopup.open(cardData);
  });
  const cardElement = card.createCard();
  cardList.addItem(cardElement);
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      addCard(cardData);
    },
  },
  ".gallery"
);

cardList._renderItems();
