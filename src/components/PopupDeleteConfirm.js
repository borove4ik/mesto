import { Popup } from "./Popup.js";
import { api } from "../pages/index.js";

export class PopupDeleteConfirm extends Popup{
    constructor(popup) {
        super(popup);
        this.cardId = ''
        this.card =''
        this.deleteButton = this.popup.querySelector('.popup__button')
     } 
 
     open(cardId, cardElement) {
        super.open()
        this.cardId = cardId
        this.card = cardElement
    }

    deleteButtonHandleClick = () => {
        api.deleteCard({_id: this.cardId})
        .then(() => {
            this.card.remove()
            this.close()
          })
          .catch(api.onResponse)
    }

    setEventListeners() {
        super.setEventListeners();
        this.deleteButton.addEventListener('click', this.deleteButtonHandleClick)
    }
}