import "./rover-xp-dog.scss";
import template from "./rover-xp-dog.ejs";
import { environment } from "../../../../../environment.js";

export class RoverXpDog {
    static getInstance() {
        if (!RoverXpDog._instance) {
            RoverXpDog._instance = new RoverXpDog();
        }
        return RoverXpDog._instance;
    }

    say(message: string) {
        if (!this._bAppended) {
            this.append();
        }
        this._text.innerHTML = message;
    }

    private append() {
        this._roverContainer = document.createElement("div");
        this._roverContainer.id = "rover-xp-dog";
        this._roverContainer.innerHTML = template(environment);
        document.body.appendChild(this._roverContainer);
        this._text = this._roverContainer.getElementsByClassName("rover-text")[0] as HTMLParagraphElement;
        this._bAppended = true;
    }

    private static _instance: RoverXpDog;
    private _bAppended: boolean;
    private _roverContainer: HTMLDivElement;
    private _text: HTMLParagraphElement;
}
