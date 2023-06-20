const template = document.createElement("template");
template.innerHTML = `
<div class="bg-slate-400 w-9 h-9">
test
</div>
`;

class TestThing extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define("pop-up", TestThing);
export default template;
