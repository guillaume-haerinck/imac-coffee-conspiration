/* Webpack imports */
import "./rover-xp-dog.scss";
import "../../../../shared/assets/images/rover-xp-dog.gif";

/* Typescript imports */
import { environment } from "../../../../../environment.js";

export class RoverXpDog {
    private _wrapperId: string;

    constructor(wrapperId: string) {
        this._wrapperId = wrapperId;
    }

    public append() {
        const roverContainer = document.createElement("div");
        roverContainer.innerHTML = "I\'m roveeer";
        const img = document.createElement("img");
        img.src = environment.builtAssetsPath + "/images/rover-xp-dog.gif";
        roverContainer.appendChild(img);
        document.getElementById(this._wrapperId).appendChild(roverContainer);
    }

    public say(message: string) {
        console.log(message);
    }
}
