

export class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _handleResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        method: "GET",
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    updateProfile(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name,
          about,
        }),
      }).then(this._handleResponse);
    }
  
    addNewCard(name, link) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name,
          link,
        }),
      }).then(this._handleResponse);
    }
  
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    addCardLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    updateAvatarProfile(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ avatar }),
      }).then(this._handleResponse);
    }
  }
  
 
  export const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
      authorization: "5e4a84e5-00a2-42ea-b914-3a4e397e0570",
      "Content-Type": "application/json",
    },
  });