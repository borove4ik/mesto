export class Api {
    constructor(options) {
        this.options = options;
        this.getInfoResponse = null
        this.getCardsResponse = null
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
      });
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
  }
}