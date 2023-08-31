export class Api {
    constructor(options) {
        this.options = options;
        this.getInfoResponse = null;
        this.getCardsResponse = null;
        this.buttonTextChanger = ''
    }

    receiveButtonTextChanger(buttonTextChanger) {
      this.buttonTextChanger = buttonTextChanger
    }

    #onResponse(res) {
        return res.ok ? res.json() : console.log(res.status) 
    }

    getInfo() {
      return fetch('https://nomoreparties.co/v1/cohort-73/users/me', {
        method: "GET",
            headers: {'authorization': '25e7eed6-78e7-4fdc-b7c0-c962e01ad60d'}
          })
          .then(this.#onResponse)
          .then((res) => {
            this.getInfoResponse = res
          return res
          })
          .catch((res) => {
            console.log(res.status)
          })
    }

    getCards() {
        return fetch('https://nomoreparties.co/v1/cohort-73/cards', {
          method: "GET",
          headers: {'authorization': '25e7eed6-78e7-4fdc-b7c0-c962e01ad60d'}
            })
            .then(this.#onResponse)
            .then((res) => {
              this.getCardsResponse = res
              return res
            })
            .catch((res) => {
              console.log(res.status)
            })
      }

    setInfo({inputName, inputInfo}) {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-73/users/me', {
        method: 'PATCH',
        headers: {
          authorization: '25e7eed6-78e7-4fdc-b7c0-c962e01ad60d',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: inputName,
          about: inputInfo
        })
       
      })
      .then(this.#onResponse)
      .catch((res) => {
        console.log(res.status)
      })
      .finally(this.buttonTextChanger());
    } 

    setCard({name, link}) {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-73/cards', {
        method: 'POST', 
        headers: {
          authorization: '25e7eed6-78e7-4fdc-b7c0-c962e01ad60d',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(this.#onResponse)
      .catch((res) => {
        console.log(res.status)
      })
      .finally(this.buttonTextChanger())
    }

    deleteCard({_id}) {
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-73/cards/${_id}`, {
        method: 'DELETE', 
        headers: {
          authorization: '25e7eed6-78e7-4fdc-b7c0-c962e01ad60d',
          'Content-Type': 'application/json'
        },
      })
      .then(this.#onResponse)
      .catch((res) => {
        console.log(res.status)
      })
    }

    changeLike(cardId, isLiked) {
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-73/cards/${cardId}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT', 
        headers: {
          authorization: '25e7eed6-78e7-4fdc-b7c0-c962e01ad60d',
          'Content-Type': 'application/json'
        }
    })
    .then((res) => {
      return this.#onResponse(res)
    })
    .catch((res) => {
      console.log(res.status)
    })
  }

  updateAvatar({link}) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-73/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '25e7eed6-78e7-4fdc-b7c0-c962e01ad60d',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
    .then((res) => {
      return this.#onResponse(res)
    })
    .catch((res) => {
      console.log(res.status)
    })
    .finally(this.buttonTextChanger())
  }
}