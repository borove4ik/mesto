let formElement = document.querySelector('.popup__form');
let popupWindow = document.querySelector('.popup');
let nameInput = document.querySelector('#input-name');
let jobInput = document.querySelector('#input-bio');
let popupTrigger = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let jobName = document.querySelector('.profile__description');
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
const gallery = document.querySelector('.gallery')

const renderCard = (cardContent) => {
  const card = cardTemplate.querySelector('.gallery__element').cloneNode(true)
  card.querySelector('.gallery__element-description').textContent = cardContent.name
  card.querySelector('.gallery__photo').src = cardContent.link
  gallery.append(card)
}

function preRenderGallery (cards) {
  cards.forEach(currentCard => {
    renderCard(currentCard)
  });
}
preRenderGallery(initialCards)

function formClose () {
  popupWindow.classList.remove('popup_opened')
}

function formOpen () {
  nameInput.value = profileName.textContent;
  jobInput.value = jobName.textContent;
  popupWindow.classList.add ('popup_opened')
}

popupTrigger.addEventListener('click', formOpen);

popupClose.addEventListener('click', formClose);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  jobName.textContent = jobInput.value;
  formClose ()
}

formElement.addEventListener('submit', handleFormSubmit);



