import "./pc-icon.scss";
import { environment } from "../../../../environment.js";

export class PCIcon extends HTMLElement {
    constructor() { // Can't modify DOM in constructor
        super(); // Always calls first
    }

    connectedCallback() { // Use event listenners here
        if (this.hidden) { this.style.display = "none"; }
        /*
        document.addEventListener("click", (event: MouseEvent) => { 
            if (this.contains(event.target as Node)) {
                this.style.backgroundColor = "red";
            } else {
                this.style.backgroundColor = "unset";
            }
        });
        */
    }

    unhide() { this.style.display = "grid"; }
    hide() { this.style.display = "none"; }
}

if (!customElements.get("app-pc-icon")) {
    customElements.define("app-pc-icon", PCIcon);
}
