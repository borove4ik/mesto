import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import "./index.css";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards, formData } from "../components/constants.js";

const userInfo = new UserInfo({
  userName: ".profile__name",
  userInfo: ".profile__description",
});

const profileFormElement = document.querySelector("#profile-edit");
const placeFormElement = document.querySelector("#place-edit");

const profileFormValidator = new FormValidator(formData, profileFormElement);
const placeFormValidator = new FormValidator(formData, placeFormElement, true);

const hideErrorAndEnableSubmit = (validatorInstance) => {
  validatorInstance.handleClosedFormValidation();
};

const editProfileForm = new PopupWithForm(
  "#profile-popup",
  (inputData) => {
    userInfo.setUserInfo(inputData);
    editProfileForm.close();
  },
  hideErrorAndEnableSubmit,
  profileFormValidator
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
  hideErrorAndEnableSubmit,
  placeFormValidator,
  true
);

placeEdit.setEventListeners();
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

const newPlacePopupTrigger = document.querySelector(".profile__add-button");
newPlacePopupTrigger.addEventListener("click", placeEdit.open);

const photoPopup = new PopupWithImage("#popup-open-card");

const handleCardClick = (cardData) => {
  photoPopup.open(cardData);
};

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    "#gallery__element",
    handleCardClick
  ).createCard();
  photoPopup.setEventListeners();
  return card;
};

const addCard = (cardData) => {
  cardList.addItem(createCard(cardData));
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
