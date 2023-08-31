import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import "./index.css";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { formData } from "../components/constants.js";
import { PopupDeleteConfirm } from "../components/PopupDeleteConfirm.js"
import { Api } from '../components/Api.js' 

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-73',
  headers: {
    authorization: '25e7eed6-78e7-4fdc-b7c0-c962e01ad60d',
    'Content-Type': 'application/json'
  }
})

const pageData = Promise.all([api.getInfo(), api.getCards()])

const photoPopup = new PopupWithImage("#popup-open-card");

const handleCardClick = (cardData) => {
  photoPopup.open(cardData);
};

const confirmPopup = new PopupDeleteConfirm('#delete-confirm')

confirmPopup.setEventListeners()

const handleLikePost = (instance) => {
  api.changeLike(instance._id, instance.isLiked())
  .then(dataCardFromServer => {
    instance.setLikesData(dataCardFromServer)
  })
}

const getCardLayout = (cardData, userId) => {
  const card = new Card(
    cardData,
    "#gallery__element",
    handleCardClick, (cardId, cardElement) => {
      confirmPopup.open(cardId, cardElement)
    }, handleLikePost,
    userId
  ).createCard();
  photoPopup.setEventListeners();

  return card;
};


const feed = pageData
.then(([userData, initialCards]) => {
  const cardList = new Section(
    {
      items: initialCards,
      renderer: (cardData) => {
        cardList.addItem(getCardLayout(cardData, userData._id));
      },
    },
    ".gallery"
  );
  
  cardList._renderItems();
  return cardList
})

const userInfo = new UserInfo({
  userName: ".profile__name",
  userInfo: ".profile__description",
  userAvatar: ".profile__avatar"
});

pageData
.then(([userData]) => {
  userInfo.getUserInfo({
    inputName: userData.name,
    inputInfo: userData.about,
    userAvatar: userData.avatar
  })
})
.catch((err) => console.log(err))

const profileFormElement = document.querySelector("#profile-edit");
const placeFormElement = document.querySelector("#place-edit");
const avatarFormElement = document.querySelector("#avatar-edit")

const avatarFormValidator = new FormValidator(formData, avatarFormElement, true);
const profileFormValidator = new FormValidator(formData, profileFormElement);
const placeFormValidator = new FormValidator(formData, placeFormElement, true);

const hideErrorAndEnableSubmit = (validatorInstance) => {
  validatorInstance.handleClosedFormValidation();
};

const editProfileForm = new PopupWithForm(
  "#profile-popup",
  (inputData) => {
    api.receiveButtonTextChanger(editProfileForm.resetDeployRequestStatus)
    api.receiveCloseFormMethod(editProfileForm.close)
    api.setInfo(inputData);
    userInfo.getUserInfo(inputData);
    
  },
  hideErrorAndEnableSubmit,
  profileFormValidator
);

editProfileForm.setEventListeners();

const profileEditTrigger = document.querySelector(".profile__edit-button");

profileEditTrigger.addEventListener("click", () => {
  editProfileForm.open();
  editProfileForm.setInputValues(userInfo.setUserInfo());
});

const placeEdit = new PopupWithForm(
  "#popup-new-place",
  (formData) => {
    pageData.then(() => {
      api.receiveButtonTextChanger(placeEdit.resetDeployRequestStatus)
      api.receiveCloseFormMethod(placeEdit.close)
      api.setCard(formData)
      .then( (cardData) => {
        feed.then((data) => {
          data.addItem(getCardLayout(cardData, api.getInfoResponse._id))
          api.closeForm()
        })
      }) 
    })
    
  },
  hideErrorAndEnableSubmit,
  placeFormValidator,
  true
);

const avatarUpdate = new PopupWithForm(
  "#popup-avatar",
  (inputData) => {
   pageData.then(() => {
    api.receiveCloseFormMethod(avatarUpdate.close)
    api.receiveButtonTextChanger(avatarUpdate.resetDeployRequestStatus)
    api.updateAvatar(inputData)
    .then((userData) => {
      userInfo.getUserInfo({
        inputName: userData.name, 
        inputInfo: userData.about, 
        userAvatar: userData.avatar})
    })
   })
  },
  hideErrorAndEnableSubmit,
  avatarFormValidator,
  true
)

placeEdit.setEventListeners();
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const newPlacePopupTrigger = document.querySelector(".profile__add-button");
newPlacePopupTrigger.addEventListener("click", placeEdit.open);

const avatarEditTrigger = document.querySelector('.profile__avatar-edit');
avatarEditTrigger.addEventListener('click', avatarUpdate.open)

avatarUpdate.setEventListeners()
