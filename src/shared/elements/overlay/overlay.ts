import "./overlay.scss";
import template from "./overlay.ejs";
import { environment } from "../../../../environment.js";
import { isNullOrUndefined } from "util";

export class Overlay {
    private _overlayContainer: HTMLDivElement;

    constructor(text: string, btnText?: string, imageUrl?: string) {
        this._overlayContainer = document.createElement("div");
        this._overlayContainer.className = "overlay";
        environment.overlayText = text;
        this._overlayContainer.innerHTML = template(environment);
        document.body.appendChild(this._overlayContainer);
    }

    changeText() {

    }

    changeBtnText() {

    }

    changeImage() {

    }

    show() {

    }

    hide() {

    }

    destruct() {
        document.body.removeChild(this._overlayContainer);
    }
}