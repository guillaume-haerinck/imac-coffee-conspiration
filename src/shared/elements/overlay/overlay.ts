import "./overlay.scss";
import template from "./overlay.ejs";
import { environment } from "../../../../environment.js";
import { isNullOrUndefined } from "util";

export class Overlay {
    private _overlayContainer: HTMLDivElement;
    private _text: HTMLDivElement;
    private _image: HTMLImageElement;

    constructor(text: string, imageUrl?: string) {
        this._overlayContainer = document.createElement("div");
        this._overlayContainer.className = "overlay";
        environment.overlayText = text;
        if (!isNullOrUndefined(imageUrl)) {
            environment.overlayImageUrl = imageUrl;
        }
        this._overlayContainer.innerHTML = template(environment);
        document.body.appendChild(this._overlayContainer);
    }

    changeText() {

    }

    destruct() {
        document.body.removeChild(this._overlayContainer);
    }
}