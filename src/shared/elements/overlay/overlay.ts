import "./overlay.scss";
import { environment } from "../../../../environment.js";

export class Overlay {
    private _overlayContainer: HTMLDivElement;
    private _text: HTMLDivElement;
    private _image: HTMLImageElement;

    constructor(text: string, imageUrl?: string) {
        this._overlayContainer = document.createElement("div");
        this._overlayContainer.className = "overlay";
        document.body.appendChild(this._overlayContainer);
    }

    changeText() {

    }

    destruct() {
        document.body.removeChild(this._overlayContainer);
    }
}