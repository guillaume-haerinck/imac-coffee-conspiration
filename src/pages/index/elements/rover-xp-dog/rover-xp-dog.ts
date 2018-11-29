import "./rover-xp-dog.scss";
import "../../../../shared/assets/images/rover-xp-dog.gif";
import template from "./rover-xp-dog.html";
import { environment } from "../../../../../environment.js";

export class RoverXpDog {
    private _wrapperId: string;

    constructor(wrapperId: string) {
        this._wrapperId = wrapperId;
    }

    public append() {
        const roverContainer = document.createElement("div");
        roverContainer.className = "rover-xp-dog";
        roverContainer.innerHTML = template;
        document.getElementById(this._wrapperId).appendChild(roverContainer);
    }

    public say(message: string) {
        console.log(message);
    }
}
