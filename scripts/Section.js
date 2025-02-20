export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Método para renderizar todos los elementos iniciales
  renderItems() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }

  // Método para añadir un solo elemento al contenedor
  addItem(element) {
    this._container.prepend(element);
  }
}
