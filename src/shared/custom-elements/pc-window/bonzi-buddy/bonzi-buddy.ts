import "./bonzi-buddy.scss";
import template from "./bonzi-buddy.ejs";
import { environment } from "../../../../../environment.js";

export class BonziBuddy {
    static getInstance() {
        if (!BonziBuddy._instance) {
            BonziBuddy._instance = new BonziBuddy();
        }
        return BonziBuddy._instance;
    }

    say(message: string) {
        if (!this._bAppended) {
            this.append();
        }
        this._text.innerHTML = message;
        var imageNumber = Math.floor((Math.random() * 4) + 1);
        this._gif.src = `${ environment.assetsUrl }images/bonzi-buddy-${ imageNumber }.gif`;

    }

    private append() {
        this._roverContainer = document.createElement("div");
        this._roverContainer.id = "bonzi-buddy";
        this._roverContainer.innerHTML = template(environment);
        document.body.appendChild(this._roverContainer);
        this._text = this._roverContainer.getElementsByClassName("bonzi-text")[0] as HTMLParagraphElement;
        this._gif = this._roverContainer.getElementsByClassName("bonzi-gif")[0] as HTMLImageElement;
        this._bAppended = true;
    }

    private static _instance: BonziBuddy;
    private _bAppended: boolean;
    private _roverContainer: HTMLDivElement;
    private _text: HTMLParagraphElement;
    private _gif: HTMLImageElement;
}
