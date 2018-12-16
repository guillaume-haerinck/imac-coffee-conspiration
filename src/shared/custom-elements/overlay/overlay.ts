import "./overlay.scss";

export class Overlay extends HTMLElement {
    constructor() {
        super(); // Always calls first
    }

    connectedCallback() {
        if (this.hidden) {
            this.style.display = "none";
        }
    }

    unhide() {
        this.style.display = "grid";
    }

    hide() {
        this.style.display = "none";
    }
}

if (!customElements.get("app-overlay")) {
    customElements.define("app-overlay", Overlay);
}