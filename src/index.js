import { Constants } from "./components/Constants.js";
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import "./pages/index.css";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";

const variables = new Constants();

const {
  formData,
  initialCards,
  newPlacePopupTrigger,
  profileEditTrigger,
} = variables;

const userInfo = new UserInfo({
  userName: ".profile__name",
  userInfo: ".profile__description",
});

const editProfileForm = new PopupWithForm('#profile-popup', (evt) => {
  evt.preventDefault()
  userInfo.setUserInfo(editProfileForm._getInputValues())
  editProfileForm.close()
})
editProfileForm.setEventListeners()

profileEditTrigger.addEventListener('click', () => {
  editProfileForm.open();
  editProfileForm._setInputValues(userInfo.getUserInfo())
})

const formValidator = new FormValidator(formData);

formValidator.enableValidation();

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

const placeEdit = new PopupWithForm('#popup-new-place', (evt) => {
  evt.preventDefault()
  
  const cardData = placeEdit._getInputValues()
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

newPlacePopupTrigger.addEventListener('click', placeEdit.open)