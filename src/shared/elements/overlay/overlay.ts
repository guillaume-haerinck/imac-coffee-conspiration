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

        if (!isNullOrUndefined(btnText)) {
            this.createButton(btnText);
        }

        if (!isNullOrUndefined(imageUrl)) {
            this.createImage(imageUrl);
        }
    }

    changeText(text: string) {
        this._overlayContainer.querySelector("#overlay-text").innerHTML = text;
    }

    changeBtnText(text: string) {
        const btn = this._overlayContainer.querySelector("#overlay-btn") as HTMLButtonElement;
        if (isNullOrUndefined(btn)) {
            this.createButton(text);
        } else {
            btn.innerHTML = text;
        }
    }

    changeImage(imageUrl: string) {
        const img = this._overlayContainer.querySelector("#overlay-img") as HTMLImageElement;
        if (isNullOrUndefined(imageUrl)) {
            this.createImage(imageUrl);
        } else {
            img.src = imageUrl;
        }
    }

    show() {
        this._overlayContainer.style.display = "grid";
    }

    hide() {
        this._overlayContainer.style.display = "none";
    }

    destruct() {
        document.body.removeChild(this._overlayContainer);
    }

    removeImage() {
        const img = this._overlayContainer.querySelector("#overlay-img") as HTMLImageElement;
        img.remove();
    }

    removeBtn() {
        const btn = this._overlayContainer.querySelector("#overlay-btn") as HTMLButtonElement;
        btn.remove;
    }

    private createButton(text: string) {
        let btn = document.createElement("button");
        btn.innerHTML = text;
        btn.id = "overlay-btn";
        this._overlayContainer.appendChild(btn);
    }

    private createImage(imageUrl: string) {
        let img = document.createElement("img");
        img.id = "overlay-img";
        img.src = imageUrl;
        this._overlayContainer.appendChild(img);
    }
}