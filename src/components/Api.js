   export class Api {
    constructor({baseUrl, headers}) {
        this._url = baseUrl;
        this._headers = headers;
        this.getInfoResponse = null;
        this.getCardsResponse = null;
        this.buttonTextChanger = '';
    }

    receiveButtonTextChanger(buttonTextChanger) {
      this.buttonTextChanger = buttonTextChanger
    }

    #onResponse(res) {
        return res.ok ? res.json() : console.log(res.status) 
    }

    getInfo() {
      return fetch(`${this._url}/users/me`, {
        method: "GET",
            headers: this._headers
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
        return fetch(`${this._url}/cards`, {
          method: "GET",
          headers: this._headers
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
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
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
      return fetch(`${this._url}/cards`, {
        method: 'POST', 
        headers: this._headers,
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
      return fetch(`${this._url}/cards/${_id}`, {
        method: 'DELETE', 
        headers: this._headers,
      })
      .then(this.#onResponse)
      .catch((res) => {
        console.log(res.status)
      })
    }

    changeLike(cardId, isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT', 
        headers: this._headers,
    })
    .then((res) => {
      return this.#onResponse(res)
    })
    .catch((res) => {
      console.log(res.status)
    })
  }

  updateAvatar({link}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
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
