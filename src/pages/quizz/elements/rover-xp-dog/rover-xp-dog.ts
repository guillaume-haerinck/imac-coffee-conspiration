import "./rover-xp-dog.scss";
import template from "./rover-xp-dog.ejs";
import { environment } from "../../../../../environment.js";

export class RoverXpDog {
    private _wrapperId: string;
    private _roverContainer: HTMLDivElement;

    constructor(wrapperId: string) {
        this._wrapperId = wrapperId;
    }

    public append() {
        this._roverContainer = document.createElement("div");
        this._roverContainer.className = "rover-xp-dog";
        this._roverContainer.innerHTML = template(environment);
        document.getElementById(this._wrapperId).appendChild(this._roverContainer);
    }

    public say(message: string) {
        console.log(message);
    }
}
