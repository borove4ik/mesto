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

const bindCloseButton = (currentPopup, formElement, formData) => {
  const closeButton = currentPopup.querySelector(".popup__close-button");
  closeButton.addEventListener("click", () => {
    closePopup(currentPopup, formElement);
    const input = currentPopup.querySelectorAll(formData.inputSelector) ;
    input.forEach((item) => {
      hideError(formData, item);
      enableSubmit(formData);
    });
  }
  );
};


const bindClosePopupCardButton = (currentPopup) => {
  const bindClosePopupCard = currentPopup.querySelector(
    "#pop-close-photo-button"
  );
  bindClosePopupCard.addEventListener("click", () =>
    closePopupCard(currentPopup)
  );
};

const closeByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    const input = openedPopup.querySelectorAll(formData.inputSelector)
    closePopup(openedPopup);
    input.forEach((item) => {
      hideError(formData, item);
      enableSubmit(formData);
    });
  }
};

const closePopupCardByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopupCard(openedPopup);
  }
};

const openPopup = (currentPopup) => {
  currentPopup.classList.add("popup_opened");
  currentPopup.focus();
  currentPopup.id === "popup-open-card"
    ? document.addEventListener("keydown", closePopupCardByEsc)
    : document.addEventListener("keydown", closeByEsc);
};

document.querySelectorAll(".popup").forEach((item) => {
  if (item.id === "popup-open-card") {
    item.addEventListener("click", (evt) => {
      if (evt.target === item) {
        closePopupCard(item);
      }
    });
  } else {
    item.addEventListener("click", (evt) => {
      if (evt.target === item) {
        const inputList = item.querySelectorAll(formData.inputSelector);
        closePopup(item);
        inputList.forEach((input) => {
          hideError(formData, input);
          enableSubmit(formData);
        });
      }
    });
  }
});

const renderProfilePopup = (currentPopup) => {
  openPopup(currentPopup);
  bindProfileOutput();
};

const renderPlacePopup = (currentPopup, formData) => {
  openPopup(currentPopup);
  disableSubmit(formData);
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

const closePopupCard = (currentPopup) => {
  currentPopup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupCardByEsc);
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;
  closePopup(profilePopup, profileFormElement);
  popupReset(profilePopup, profileFormElement);
};

const handleCardSubmit = (evt) => {
  evt.preventDefault();
  const card = {
    name: placeInput.value,
    link: linkInput.value,
  };
  gallery.prepend(createCard(card));
  closePopup(popupNewPlace, placeFormElement);
  popupReset(popupNewPlace, placeFormElement);
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
bindCloseButton(profilePopup, profileFormElement, formData);
bindCloseButton(popupNewPlace, placeFormElement, formData);
bindClosePopupCardButton(popupCard);

popupTrigger.addEventListener("click", () => renderProfilePopup(profilePopup));
newPlacePopupTrigger.addEventListener("click", () =>
  renderPlacePopup(popupNewPlace, formData)
);
profileFormElement.addEventListener("submit", handleFormSubmit);
placeFormElement.addEventListener("submit", handleCardSubmit);
gallery.addEventListener("click", handleGalleryClick);
