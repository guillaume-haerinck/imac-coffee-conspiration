import "./agent-card.scss";
import template from "./agent-card.ejs";
import { environment } from "../../../../../environment.js";

export class AgentCard {
    constructor(wrapperId: string) {
        this._wrapperId = wrapperId;
    }

    /* Setters */
    set firstname(text: string) { this._firstname.innerHTML = text; }

    /* Public methods */
    public append() {
        this._cardContainer = document.createElement("div");
        this._cardContainer.id = "agent-card";
        this._cardContainer.innerHTML = template(environment);
        document.getElementById(this._wrapperId).appendChild(this._cardContainer);

        // Init values
        this._firstname = document.getElementById("badge-fname");
    }

    public revealLastName() {
        document.getElementById("lastname").hidden = false;
    }

    public revealBirthDate() {
        document.getElementById("birthdate").hidden = false;
    }

    /* Private members */
    private _wrapperId: string;
    private _cardContainer: HTMLDivElement;

    private _firstname: HTMLSpanElement;
}
