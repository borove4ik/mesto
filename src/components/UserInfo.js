export class UserInfo {
  constructor({userName, userInfo, userAvatar}) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
    this._userAvatar = document.querySelector(userAvatar)
  }

  setUserInfo() {
    return {
      inputName: this._userName.textContent,
      inputInfo: this._userInfo.textContent
    }
  }

  getUserInfo({inputName, inputInfo, userAvatar}) {
    this._userName.textContent = inputName || this._userName.textContent;
    this._userInfo.textContent = inputInfo || this._userInfo.textContent; 
    this._userAvatar.src = userAvatar || this._userAvatar.src
  }
}