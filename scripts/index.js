const profileFormElement = document.querySelector('#profile-edit');
const placeFormElement = document.querySelector('#place-edit');
const popupWindow = document.querySelector('.popup');
const popupNewPlace = document.querySelector('.popup__new-place')
const nameInput = document.querySelector('#input-name');
const jobInput = document.querySelector('#input-bio');
const placeInput = document.querySelector('#input-place');
const linkInput = document.querySelector('#input-link');
const popupTrigger = document.querySelector('.profile__edit-button');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const jobName = document.querySelector('.profile__description');
const newPlacePopupTrigger = document.querySelector('.profile__add-button');
const initialCards = [
  {
    name: 'Момент',
    link: './images/denis-borovets-iu7MOEd5Pso-unsplash.jpg'
  },
  {
    name: 'Кофе',
    link: './images/denis-borovets-BJmlFjOilY8-unsplash.jpg'
  },
  {
    name: 'Вверх ногами',
    link: './images/denis-borovets-U7CwcXbKDR8-unsplash.jpg'
  },
  {
    name: 'Отражение',
    link: './images/denis-borovets-Yz4uaXC-XUY-unsplash.jpg'
  },
  {
    name: 'Кровать',
    link: './images/denis-borovets-RwwKIBFCM-s-unsplash.jpg'
  },
  {
    name: 'Окно',
    link: './images/denis-borovets-vR7TZ25uCLQ-unsplash.jpg'
  }
]
const cardTemplate = document.querySelector('#gallery__element').content
const gallery = document.querySelector('.gallery');

let trashButtons;

const renderCard = (cardContent) => {
  const card = cardTemplate.querySelector(".gallery__element").cloneNode(true);
  const likeButton = card.querySelector('.gallery__like')

  card.querySelector(".gallery__element-description").textContent = cardContent.name;
  card.querySelector(".gallery__photo").src = cardContent.link;
  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle('gallery__like_active')
  })
  gallery.prepend(card);
};

function preRenderGallery (cards) {
  cards.forEach(currentCard => {
    renderCard(currentCard)
  });
  trashButtons = document.querySelectorAll('.gallery__trash');
}
preRenderGallery(initialCards)

function popupClose () {
  document.querySelectorAll('.popup').forEach(item => item.classList.remove('popup_opened'))
}

function formOpen () {
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
  popupWindow.classList.add ('popup_opened')
}

function closePlacePopup () {
  popupNewPlace.classList.remove('popup_opened');
}

function openPlacePopup () {
  popupNewPlace.classList.add ('popup_opened')
}

popupTrigger.addEventListener('click', formOpen);

popupCloseButtons.forEach(popupCloseButton => {
  popupCloseButton.addEventListener('click', popupClose);
})

newPlacePopupTrigger.addEventListener('click', openPlacePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;
  popupClose()
}

function handleCardSubmit (evt) {
  evt.preventDefault();
  let card = {
    name: placeInput.value,
    link: linkInput.value
  }
  renderCard (card)
  popupClose()
}

function removePhoto(evt) {
  if (!evt.target.closest('.gallery__trash')){
    return;
  }

  let parent = evt.target.parentElement;
  
  if (!evt.target.classList.contains('gallery__trash')) {
    parent = parent.parentElement
  }

  parent.remove();

}

profileFormElement.addEventListener('submit', handleFormSubmit);
placeFormElement.addEventListener('submit', handleCardSubmit);
gallery.addEventListener('click', removePhoto)

