const profileFormElement = document.querySelector("#profile-edit");
const placeFormElement = document.querySelector("#place-edit");
const profilePopup = document.querySelector("#profile-popup");
const popupNewPlace = document.querySelector("#popup-new-place");
const popupCard = document.querySelector("#popup-open-card");
const nameInput = document.querySelector("#input-name");
const jobInput = document.querySelector("#input-bio");
const placeInput = document.querySelector("#input-place");
const linkInput = document.querySelector("#input-link");
const popupTrigger = document.querySelector(".profile__edit-button");
const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const profileName = document.querySelector(".profile__name");
const jobName = document.querySelector(".profile__description");
const newPlacePopupTrigger = document.querySelector(".profile__add-button");
const cardTemplate = document.querySelector("#gallery__element").content;
const gallery = document.querySelector(".gallery");
const popupPhoto = popupCard.querySelector(".popup__gallery-photo");
const popupText = popupCard.querySelector(".popup__gallery-description");
const initialCards = [
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

const createCard = (cardContent) => {
  const card = cardTemplate.querySelector(".gallery__element").cloneNode(true);
  const likeButton = card.querySelector(".gallery__like");
  const galleryPhoto = card.querySelector(".gallery__photo");
  
  card.querySelector(".gallery__element-description").textContent =
    cardContent.name;

  galleryPhoto.src = cardContent.link;
  galleryPhoto.alt = cardContent.name;

  likeButton.addEventListener("click", (evt) => {
    evt.currentTarget.classList.toggle("gallery__like_active");
  });
  return card;
};

const renderGallery = (cards) => {
  cards.forEach((currentCard) => {
    gallery.append(createCard(currentCard));
  });
};

const bindCloseButton = (currentPopup) => {
  const closeButton = currentPopup.querySelector(".popup__close-button");
  closeButton.addEventListener("click", () => closePopup(currentPopup));
}

const openPopup = (currentPopup) => {
  currentPopup.classList.add("popup_opened");
}

const renderPopup = (currentPopup, evt) => {
  openPopup(currentPopup)
if (currentPopup.id === "profile-popup") {
    bindProfileOutput();
  } else if (currentPopup.id === "popup-open-card") {
    generatePhotoPopup(evt);
   }
  }
  
  const generatePhotoPopup = (evt) => { 
   const imageSrc = evt.target.getAttribute("src");
    const imageAlt = evt.target.getAttribute("alt");
    const targetCard = evt.target.closest(".gallery__element");
    const imageText = targetCard.querySelector(".gallery__element-description");

    popupPhoto.setAttribute("src", imageSrc);
    popupPhoto.setAttribute("alt", imageAlt);
    popupText.textContent = imageText.textContent;
  }

const bindProfileOutput = () => {
  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;
};

const closePopup = (currentPopup) => {
  currentPopup.classList.remove("popup_opened");
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;
  closePopup(profilePopup);
  profileFormElement.reset();
};

const handleCardSubmit = (evt) => {
  evt.preventDefault();
  const card = {
    name: placeInput.value,
    link: linkInput.value,
  };
  gallery.prepend(createCard(card));
  closePopup(popupNewPlace);
  placeFormElement.reset();
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
    renderPopup(popupCard, evt);
  }
};

renderGallery(initialCards);
bindCloseButton (profilePopup);
bindCloseButton (popupNewPlace);
bindCloseButton (popupCard);

popupTrigger.addEventListener("click", () => renderPopup(profilePopup));
newPlacePopupTrigger.addEventListener("click", () => renderPopup(popupNewPlace));
profileFormElement.addEventListener("submit", handleFormSubmit);
placeFormElement.addEventListener("submit", handleCardSubmit);
gallery.addEventListener("click", handleGalleryClick);
