

export class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteCLick, handleLikePost, userId) {
    this.data = data
    this._imageName = this.data.name;
    this._imageLink = this.data.link;
    this.ownerId = this.data.owner._id; 
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._id = this.data._id;
    this.handleDeleteCLick = handleDeleteCLick;
    this._handleLikePost = handleLikePost
    this.userId = userId;
    
  }

  deleteClick = () => {
    this.handleDeleteCLick(this._id, this._element)
  }

isLiked(){
 
  return this.data.likes.some((item) => {
   
    return item._id === this.userId
  })
}

  getLikeInfo() {
   this.cardLikeCounter.textContent = this.data.likes.length;

    if(this.isLiked()){
        this._likeButton.classList.add("gallery__like_active");
    }
    else {
      this._likeButton.classList.remove("gallery__like_active");
    }
  }

  _setEventListeners() {
    this._galleryTrash.addEventListener("click", this.deleteClick);
    this.photo.addEventListener("click", () => {
      this._handleCardClick({ name: this._imageName, link: this._imageLink });
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLikePost(this)
    })
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__element")
      .cloneNode(true);
    return cardElement;
  }

setLikesData(data) {
  this.data.likes = data.likes;
  this.getLikeInfo()
}

  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".gallery__like");
    this.cardLikeCounter = this._element.querySelector('.gallery__like-counter');
    this._galleryTrash = this._element.querySelector(".gallery__trash");
    this.photo = this._element.querySelector(".gallery__photo");
    this.photo.src = this._imageLink;
    this.photo.alt = this._imageName;
    this._element.querySelector(".gallery__element-description").textContent =
      this._imageName;
    if (this.userId !== this.ownerId) {
      this._galleryTrash.classList.add('gallery__trash_hidden')
    }  
    this.getLikeInfo()
    this._setEventListeners();

    
    return this._element;
  }

}
