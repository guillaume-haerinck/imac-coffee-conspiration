import "./random-screen.scss";
import template from "./random-screen.ejs";
import { environment } from "../../../../environment.js";

export class RandomScreen extends HTMLElement {

    constructor() {
        // Always call super first in constructor
        super();

        if (this.hidden) {
            this.style.display = "none";
        }
    }

    public connectedCallback() {

    }

    // public disconnectedCallback() {}

}

customElements.define("app-random-screen", Window);
