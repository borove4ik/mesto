import { Constants } from "./Constants.js";
import {FormValidator} from "./FormValidator.js";
import {Card} from "./Card.js";

const variables = new Constants();

const {
  formData,
  gallery,
  initialCards,
  jobInput,
  jobName,
  linkInput,
  nameInput,
  newPlacePopupTrigger,
  placeFormElement,
  placeInput,
  popupCard,
  popupPhoto,
  popupText,
  profileFormElement,
  popupNewPlace,
  popupTrigger,
  profileName,
  profilePopup
} = variables;

const formValidator = new FormValidator(formData);

formValidator.enableValidation()

const renderGallery = (cards) => {
  cards.forEach((currentCard) => {
    const card = new Card(currentCard, '#gallery__element')
    .createCard();
    gallery.append(card);
  });
};

const bindCloseButton = (currentPopup) => {
  const closeButton = currentPopup.querySelector(".popup__close-button");
  closeButton.addEventListener("click", () => {
    closePopup(currentPopup);
  });
};

const closeByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

const openPopup = (currentPopup) => {
  currentPopup.classList.add("popup_opened");
  currentPopup.focus();
  document.addEventListener("keydown", closeByEsc);
};

document.querySelectorAll(".popup").forEach((item) => {
  item.addEventListener("click", (evt) => {
    if (evt.target === item) {
      closePopup(item);
    }
  });
});

const hideErrorAndEnableSubmit = (
  currentPopup,
  formElement,
  isEnableSubmit = false
) => {
  const input = currentPopup.querySelectorAll(formData.inputSelector);

  let submitButton;

  input.forEach((item) => {
    formValidator.hideError(formData, item, formElement);

    if (!submitButton) {
      submitButton = item.parentNode.querySelector(".popup__button");
    }
  });

  if (submitButton && isEnableSubmit) {
    formValidator.enableSubmit(submitButton);
  }
};

const renderProfilePopup = (currentPopup) => {
  openPopup(currentPopup);
  bindProfileOutput();
  hideErrorAndEnableSubmit(currentPopup, profileFormElement, true);
};

const renderPlacePopup = (currentPopup) => {
  openPopup(currentPopup);
  hideErrorAndEnableSubmit(currentPopup, placeFormElement);
};

const renderGalleryPopup = (currentPopup, evt) => {
  openPopup(currentPopup);
  generatePhotoPopup(evt);
};

const generatePhotoPopup = (evt) => {
  const imageSrc = evt.target.getAttribute("src");
  const imageAlt = evt.target.getAttribute("alt");
  const targetCard = evt.target.closest(".gallery__element");
  const imageText = targetCard.querySelector(".gallery__element-description");

  popupPhoto.setAttribute("src", imageSrc);
  popupPhoto.setAttribute("alt", imageAlt);
  popupText.textContent = imageText.textContent;
};

const bindProfileOutput = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
};

const closePopup = (currentPopup) => {
  currentPopup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;
  closePopup(profilePopup);
};

const handleCardSubmit = (evt) => {
  evt.preventDefault();
  const card = {
    name: placeInput.value,
    link: linkInput.value,
  };

  const addedCard = new Card(card, '#gallery__element').createCard();
  gallery.prepend(addedCard)
  closePopup(popupNewPlace);
};

const handleGalleryClick = (evt) => {
  if (evt.target.closest(".gallery__trash")) {
    let parent = evt.target.closest(".gallery__trash");

    if (!evt.target.classList.contains("gallery__trash")) {
      parent = parent.closest(".gallery__element");
    }

    parent.remove();
  }
  if (evt.target.closest(".gallery__photo")) {
    renderGalleryPopup(popupCard, evt);
  }
};

renderGallery(initialCards);
bindCloseButton(profilePopup);
bindCloseButton(popupNewPlace);
bindCloseButton(popupCard);

popupTrigger.addEventListener("click", () => renderProfilePopup(profilePopup));
newPlacePopupTrigger.addEventListener("click", () =>
  renderPlacePopup(popupNewPlace, formData)
);
profileFormElement.addEventListener("submit", handleFormSubmit);
placeFormElement.addEventListener("submit", handleCardSubmit);
gallery.addEventListener("click", handleGalleryClick);
