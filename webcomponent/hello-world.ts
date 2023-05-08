customElements.define(
  "hello-world",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<h1>Hello world</h1>`;
    }
  }
)
