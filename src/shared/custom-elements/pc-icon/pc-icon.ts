import "./pc-icon.scss";
import { environment } from "../../../../environment.js";

export class PCIcon extends HTMLElement {
    constructor() { // Can't modify DOM in constructor
        super(); // Always calls first
    }

    connectedCallback() { // Use event listenners here
    }
}

if (!customElements.get("app-pc-icon")) {
    customElements.define("app-pc-icon", PCIcon);
}
