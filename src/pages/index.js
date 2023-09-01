import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import "./index.css";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { formData } from "../utils/constants.js";
import { PopupDeleteConfirm } from "../components/PopupDeleteConfirm.js"
import { Api } from '../components/Api.js' 

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-73',
  headers: {
    authorization: '25e7eed6-78e7-4fdc-b7c0-c962e01ad60d',
    'Content-Type': 'application/json'
  }
})

const photoPopup = new PopupWithImage("#popup-open-card");

const handleCardClick = (cardData) => {
  photoPopup.open(cardData);
};

const confirmPopup = new PopupDeleteConfirm('#delete-confirm')

confirmPopup.setEventListeners()

const handleLikePost = (instance) => {
  api.changeLike(instance._id, instance.isLiked())
  .then((res) => {
    return api.onResponse(res)
  })
  .then(dataCardFromServer => {
    instance.setLikesData(dataCardFromServer)
  })
  .catch((res) => {
    console.log(res.status)
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
 

  return card;
};

photoPopup.setEventListeners();



const userInfo = new UserInfo({
  userName: ".profile__name",
  userInfo: ".profile__description",
  userAvatar: ".profile__avatar"
});
const pageData = Promise.all([api.getInfo(), api.getCards()])
.then ((res) => {return res})
.then((res) => {
    userInfo.setUserInfo({
      inputName: res[0].name,
      inputInfo: res[0].about,
      userAvatar: res[0].avatar
    })
    return res
  })
  .catch((res) => {
    console.log(res.status)
  })
  
  const feed = pageData.then((pageData) => {
  const cardList = new Section(
    {
      items: pageData[1],
      renderer: (cardData) => {
        cardList.addItem(getCardLayout(cardData, pageData[0]._id))
      }
    }, 
    ".gallery"
  )
  cardList.renderItems()
  return cardList
})

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
    api.setInfo(inputData)
    .then((res) => {
      return api.onResponse(res)
    })
    .then(() =>{
      userInfo.setUserInfo(inputData)
      editProfileForm.close()
    })
    .catch((res) => {
      console.log(res.status)
    })
    .finally(() => {
      editProfileForm.resetDeployRequestStatus()
    })
    
    
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
  (formData) => {
      api.setCard(formData)
      .then(api.onResponse)
      .then((cardData)=>{
        feed.then((data) => {
          data.addItem(getCardLayout(cardData, api.getInfoResponse._id))
          placeEdit.close()
        })
      })
      .catch((res) => {
        console.log(res.status)
      })
      .finally(() => {
        placeEdit.resetDeployRequestStatus()
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
    api.updateAvatar(inputData)
    .then((res) => {
      return api.onResponse(res)
    })
    .then((userData) => {
      userInfo.setUserInfo({
        inputName: userData.name, 
        inputInfo: userData.about, 
        userAvatar: userData.avatar})
        avatarUpdate.close()
    })
    .catch((res) => {
      console.log(res.status)
    })
    .finally(() => {
      avatarUpdate.resetDeployRequestStatus()
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
