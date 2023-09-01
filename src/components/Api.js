   export class Api {
    constructor({baseUrl, headers}) {
        this._url = baseUrl;
        this._headers = headers;
        this.getInfoResponse = null;
        this.getCardsResponse = null;
    }

    onResponse(res) {
        return res.ok ? res.json() : console.log(res.status) 
    }

    getInfo() {
      return fetch(`${this._url}/users/me`, {
        method: "GET",
            headers: this._headers
          })
          .then(this.onResponse)
          .then((res) => {
            this.getInfoResponse = res
          return res
          })
          
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
          method: "GET",
          headers: this._headers
            })
            .then(this.onResponse)
            .then((res) => {
              this.getCardsResponse = res
              return res
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
      .then(this.onResponse)
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
      .then(this.onResponse)
    }

    deleteCard({_id}) {
      return fetch(`${this._url}/cards/${_id}`, {
        method: 'DELETE', 
        headers: this._headers,
      })
      .then(this.onResponse)
    }

    changeLike(cardId, isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT', 
        headers: this._headers,
    })
    .then(this.onResponse)
  }

  updateAvatar({link}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(this.onResponse)
  }
}
