import { Constants } from "./Constants.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

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
  profileFormElement,
  popupNewPlace,
  popupTrigger,
  profileName,
  profilePopup,
} = variables;

const createCard = (currentCard) => {
  const card = new Card(currentCard, "#gallery__element").createCard();
  return card;
};

const renderGallery = (cards) => {
  cards.forEach((currentCard) => {
    gallery.append(createCard(currentCard));
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
  item.addEventListener("mousedown", (evt) => {
    if (evt.target === item) {
      closePopup(item);
    }
  });
});

const createValidator = (currentPopup) => {
  new FormValidator(formData, currentPopup).enableValidation();
};

const renderProfilePopup = (currentPopup) => {
  openPopup(currentPopup);
  bindProfileOutput();
  createValidator(currentPopup);
};

const renderPlacePopup = (currentPopup) => {
  openPopup(currentPopup);
  createValidator(currentPopup);
};

const bindProfileOutput = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
};

const closePopup = (currentPopup) => {
  currentPopup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;
  closePopup(profilePopup);
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const card = {
    name: placeInput.value,
    link: linkInput.value,
  };

  gallery.prepend(createCard(card));
  closePopup(popupNewPlace);
};

renderGallery(initialCards);
bindCloseButton(profilePopup);
bindCloseButton(popupNewPlace);
bindCloseButton(popupCard);

popupTrigger.addEventListener("click", () => renderProfilePopup(profilePopup));
newPlacePopupTrigger.addEventListener("click", () =>
  renderPlacePopup(popupNewPlace, formData)
);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
placeFormElement.addEventListener("submit", handleCardFormSubmit);
