export class UserInfo {
  constructor({ nameSelector, hobbieSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._hobbieElement = document.querySelector(hobbieSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // Método público para obtener la información del usuario
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      hobbie: this._hobbieElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  // Método público para establecer la nueva información del usuario
  setUserInfo({ name, hobbie }) {
    console.log("Datos recibidos en setUserInfo:", { name, hobbie });
    if (name) this._nameElement.textContent = name;
    if (hobbie) this._hobbieElement.textContent = hobbie;
  }

  setUserAvatar(newAvatarUrl) {
    this._avatarElement.src = newAvatarUrl;
  }
}
