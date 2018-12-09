import "./window.scss";
import template from "./window.ejs";
import { environment } from "../../../../environment.js";

export class Window extends HTMLElement {
    private _rightWindowId: string;
    private _wrongWindowId: string;
    private _rightAwnsers: Element[] = [];
    private _wrongAwnsers: Element[] = [];
    private _posX: number = 0;
    private _posY: number = 0;
    private _posXMouse: number = 0;
    private _posYMouse: number = 0;
    private _isDragged: boolean = false;

    constructor() {
        // Always call super first in constructor
        super();

        if (this.hidden) {
            this.style.display = "none";
        }

        // Put the input content in the content div of the template
        const templateContainer = document.createElement("div");
        templateContainer.innerHTML = template(environment);
        templateContainer.getElementsByClassName("content")[0].innerHTML = this.innerHTML;
        this.innerHTML = templateContainer.innerHTML;
        this.style.left = "0px";
        this.style.top = "0px";
    }

    public connectedCallback() {
        this._rightWindowId = this.getAttribute("ifRight");
        this._wrongWindowId = this.getAttribute("ifWrong");
        const content = this.getElementsByClassName("content");
        for (const item of content[0].children) {
            if (item.hasAttribute("rightAwnser")) {
                this._rightAwnsers.push(item);
            }
            if (item.hasAttribute("wrongAwnser")) {
                this._wrongAwnsers.push(item);
            }
        }

        this._rightAwnsers.forEach((awnser: Element) => {
            awnser.addEventListener("click", this.replaceWindow);
        });

        this._wrongAwnsers.forEach((awnser: Element) => {
            awnser.addEventListener("click", this.replaceWindow);
        });

        this.firstElementChild.addEventListener("mousedown", this.onMouseDown);
        this.firstElementChild.addEventListener("mouseup", this.onMouseUp);
        document.addEventListener("mousemove", this.dragWindow);
        window.addEventListener("resize", (event: UIEvent) => {
            this.style.left = "0px";
            this.style.top = "0px";
        });
    }

    private dragWindow = (event: MouseEvent) => {
        if (this._isDragged) {
            const deltaX = event.clientX - this._posXMouse;
            const deltaY = event.clientY - this._posYMouse;
            this.style.left = this._posX + deltaX + "px";
            this.style.top = this._posY + deltaY + "px";
        }
    }

    private onMouseDown = (event: MouseEvent) => {
        if (!this._isDragged) {
            this._posX = parseInt(this.style.left);
            this._posY = parseInt(this.style.top);
        }
        this._posXMouse = event.clientX;
        this._posYMouse = event.clientY;
        this._isDragged = true;
    }

    private onMouseUp = (event: MouseEvent) => {
        this._posX = parseInt(this.style.left);
        this._posY = parseInt(this.style.top);
        this._isDragged = false;
    }

    private replaceWindow = (event: Event) => {
        let destinationId = null;
        if (event.srcElement.attributes.getNamedItem("rightAwnser")) {
            destinationId = this._rightWindowId;
        } else if (event.srcElement.attributes.getNamedItem("wrongAwnser")) {
            destinationId = this._wrongWindowId;
        }

        const content = this.getElementsByClassName("content");
        for (const item of content[0].children) {
            item.removeEventListener("click", this.replaceWindow);
        }
        const destination = document.getElementById(destinationId);
        destination.hidden = false;
        destination.style.display = "grid";
        destination.style.left = this._posX + "px";
        destination.style.top = this._posY + "px";
        this.replaceWith(destination);
    }
}

customElements.define("app-window", Window);
