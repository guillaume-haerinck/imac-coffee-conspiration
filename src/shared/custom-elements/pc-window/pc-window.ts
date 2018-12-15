const style = require('!css-loader!sass-loader!./pc-window.scss').toString();
import template from "./pc-window.ejs";
import { environment } from "../../../../environment.js";

export class PCWindow extends HTMLElement {
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
        super(); // Always calls first

        this.attachShadow({ mode: 'open' });
        const templateContainer = document.createElement("template");      
        templateContainer.innerHTML = `<style>${ style }</style>`
        templateContainer.innerHTML += template(environment);
        this.shadowRoot.appendChild(templateContainer.content.cloneNode(true));
    }

    connectedCallback() {
        if (this.hidden) {
            this.style.display = "none";
        }

        // Put the input content in the content div of the template
        this.style.left = "0px";
        this.style.top = "0px";
        if (this.hasAttribute("randomPlace")) {
            this.placeAtRandom();
        }

        // Get attributes
        this._rightWindowId = this.getAttribute("ifRight");
        this._wrongWindowId = this.getAttribute("ifWrong");
        for (const item of this.children) {
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

        this.shadowRoot.children[1].addEventListener("mousedown", this.onMouseDown);
        document.addEventListener("mouseup", this.onMouseUp);
        document.addEventListener("mousemove", this.dragWindow);
        window.addEventListener("resize", (event: UIEvent) => {
            this.style.left = "0px";
            this.style.top = "0px";
        });
        this.addEventListener("mousedown", () => {
            this.putOnTop();
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

        for (const item of this.children) {
            item.removeEventListener("click", this.replaceWindow);
        }
        const destination = document.getElementById(destinationId);
        destination.hidden = false;
        destination.style.display = "grid";
        destination.style.left = this._posX + "px";
        destination.style.top = this._posY + "px";
        this.remove();
    }

    private putOnTop() {
        const windows = document.getElementsByTagName("app-pc-window");
        for (let i = 0; i < windows.length; i++) {
            (windows[i] as HTMLElement).style.zIndex = "auto";
        }
        this.style.zIndex = "10";
    }

    private placeAtRandom() {
        this.style.position = "absolute";
        const posX = Math.floor(Math.random() * Math.floor(window.innerWidth - this.offsetWidth));
        const posY = Math.floor(Math.random() * Math.floor(window.innerHeight - this.offsetHeight));
        this.style.left = posX.toString() + "px";
        this.style.top = posY.toString() + "px";
    }
}

if (!customElements.get("app-pc-window")) {
    customElements.define("app-pc-window", PCWindow);
}

