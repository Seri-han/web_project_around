class Api {
  constructor(options) {
    // cuerpo del constructor
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  // 1. Cargar la información del usuario desde el servidor
  getUserInfo() {
    return fetch(this.baseUrl + "/users/me", {
      headers: this.headers,
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        return result;
      });
  }

  // 2. Cargar las tarjetas desde el servidor(Obtener tarjetas iniciales)
  getInitialCards() {
    return fetch(this.baseUrl + "/cards", {
      headers: this.headers,
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        return result;
      });
  }

  // 3. Editar el perfil
  updateUserProfile(name, about) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log("Perfil actualizado:", result);
        return result;
      });
  }

  //4. Agregar una nueva tarjeta
  addNewCard(name, link) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name, link }),
    })
      .then((res) => {
        if (!res.ok) {
          return res
            .json()
            .then((err) =>
              Promise.reject(`Error: ${err.message || res.status}`)
            );
        }
        return res.json();
      })
      .catch((err) => {
        console.error("Error al agregar la tarjeta:", err);
        return Promise.reject(err); // Asegurar que se propague el error
      });
  }

  //5. Alternar "me gusta" en una tarjeta
  toggleLike(cardId, isLiked) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this.headers,
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => {
        console.error("Error al alternar 'me gusta':", err);
        return Promise.reject(err);
      });
  }

  // 6. Actualizar el avatar del usuario
  updateUserAvatar(avatarUrl) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar: avatarUrl }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        console.log("Avatar actualizado:", result);
        return result;
      });
  }

  //7. Eliminar una tarjeta
  removeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }
}

export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "5e4a84e5-00a2-42ea-b914-3a4e397e0570",
    "Content-Type": "application/json",
  },
});
