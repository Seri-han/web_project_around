export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
}

_handleResponse(res) {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Error: ${res.status}`)
}

getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers,
        }).then(this._handleResponse);
}

getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this_headers,
        body: JSON.stringify(data),
        }).then(this._handleResponse);
}
}