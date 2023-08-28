

export class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteCLick, handleLikePost) {
    this.data = data
    this._imageName = this.data.name;
    this._imageLink = this.data.link;
    this.ownerId = this.data.owner._id; 
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._id = this.data._id;
    this.handleDeleteCLick = handleDeleteCLick;
    this._handleLikePost = handleLikePost
    
  }

  deleteClick = () => {
    this.handleDeleteCLick(this._id, this._element)
  }

  _handleLikeClick = () => {
    this._likeButton.classList.toggle("gallery__like_active");
  };

  getLikeInfo() {
   const cardLikeCounter = this._element.querySelector('.gallery__like-counter');
   cardLikeCounter.textContent = this.data.likes.length;

    const isLiked = this.data.likes.some((item) => {
      return item === this.ownerId
    })

    if(isLiked){
        this._likeButton.classList.add("gallery__like_active")
    }
    else {
      this._likeButton.classList.remove("gallery__like_active")
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeClick);
    this._galleryTrash.addEventListener("click", this.deleteClick);
    this.photo.addEventListener("click", () => {
      this._handleCardClick({ name: this._imageName, link: this._imageLink });
    });
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__element")
      .cloneNode(true);
    return cardElement;
  }

  createCard(userId) {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".gallery__like");
    this._galleryTrash = this._element.querySelector(".gallery__trash");
    this._element.querySelector(".gallery__photo").src = this._imageLink;
    this._element.querySelector(".gallery__photo").alt = this._imageName;
    this.photo = this._element.querySelector(".gallery__photo");
    this._element.querySelector(".gallery__element-description").textContent =
      this._imageName;
    if (userId !== this.ownerId) {
      this._galleryTrash.classList.add('gallery__trash_hidden')
    }  
    this.getLikeInfo()
    this._setEventListeners();

    this._likeButton.addEventListener('click', () => {
      this._handleLikePost(this)
    })
    return this._element;
  }


}
