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
  closeButton.addEventListener("click", () => {
    closePopup(currentPopup);
  }
  );
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

const hideErrorAndEnableSubmit = (currentPopup, formElement, isEnableSubmit = false) => {
  const input = currentPopup.querySelectorAll(formData.inputSelector);
  
  let submitButton;
  
  input.forEach((item) => {
    hideError(formData, item, formElement);

    if (!submitButton) {
      submitButton = item.parentNode.querySelector('.popup__button');
    }
  });

  if (submitButton && isEnableSubmit) {
    enableSubmit(submitButton);
  }
}

const renderProfilePopup = (currentPopup) => {
  openPopup(currentPopup);
  bindProfileOutput();
  hideErrorAndEnableSubmit(currentPopup, profileFormElement, true);
};

const renderPlacePopup = (currentPopup, formData) => {
  openPopup(currentPopup);
  hideErrorAndEnableSubmit(currentPopup, placeFormElement)
  
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
  gallery.prepend(createCard(card));
  closePopup(popupCard);
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
