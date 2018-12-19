const style = require('!css-loader!sass-loader!./pc-window.scss').toString();
import template from "./pc-window.ejs";
import { environment } from "../../../../environment.js";
import { PCWindowOptions } from "./pc-window-options";
import { RoverXpDog } from "./rover-xp-dog/rover-xp-dog";

export class PCWindow extends HTMLElement {
    constructor() { // Can't modify DOM in constructor
        super(); // Always calls first
    }

    /* Public methods */
    hide() {
        this.style.display = "none";
    }

    unhide() {
        this.style.display = "grid";
    }

    connectedCallback() { // Use event listenners here
        this.create();
        this.handleAttributes();
        this._rightAwnsers.forEach((awnser: HTMLElement) => {
            awnser.addEventListener("click", this.replaceWindow);
        });
        this._wrongAwnsers.forEach((awnser: HTMLElement) => {
            awnser.addEventListener("click", this.replaceWindow);
        });

        this.shadowRoot.children[1].addEventListener("mousedown", this.onMouseDown); // Title bar
        document.addEventListener("mouseup", this.onMouseUp);
        document.addEventListener("mousemove", this.dragWindow);
        this.addEventListener("mousedown", (event: MouseEvent) => {
            this.putOnTop();
        });
    }

    /* Private methods */
    private create() {
        const options = this.handleTemplateVariables();
        this.attachShadow({ mode: 'open' });
        const templateContainer = document.createElement("template");
        templateContainer.innerHTML = `<style>${ style }</style>`;
        this.style.left = "0px";
        this.style.top = "0px";
        environment.pcWindowOptions = options;
        templateContainer.innerHTML += template(environment);
        this.shadowRoot.appendChild(templateContainer.content.cloneNode(true));
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
        destination.style.zIndex = this.style.zIndex;
        this.hide();
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
        const posX = Math.floor(Math.random() * Math.floor(window.innerWidth - 400));
        const posY = Math.floor(Math.random() * Math.floor(window.innerHeight - 500));
        this.style.left = posX.toString() + "px";
        this.style.top = posY.toString() + "px";
    }

    private handleTemplateVariables(): PCWindowOptions {
        let options: PCWindowOptions = {
            bMenu: false,
            controls: {
                full: false,
                help: false,
            }
        };

        if (this.hasAttribute("menu")) {
            options.bMenu = true;
        } else {
            options.bMenu = false;
        }
        if (this.hasAttribute("rover")) {
            options.controls.help = true;
        }
        return options;
    }

    private handleAttributes() {
        if (this.hidden) {
            this.style.display = "none";
        }

        if (this.hasAttribute("randomPlace")) {
            this.placeAtRandom();
        }

        const controls = this.shadowRoot.querySelectorAll(".control");
        for (let i = 0; i < controls.length; i++) {
            if(controls[i].hasAttribute("close")) {
                controls[i].addEventListener("mousedown", () => {
                    const audio = new Audio(environment.assetsUrl + "audio/windows-error.mp3");
                    audio.play();
                });
            }
        }

        if (this.hasAttribute("rover")) {
            const text = this.getAttribute("rover");
            const rover = RoverXpDog.getInstance();
            for (let i = 0; i < controls.length; i++) {
                if(controls[i].hasAttribute("rover")) {
                    controls[i].addEventListener("mousedown", () => {
                        if (text !== "") {
                            rover.say(text);
                        } else {
                            // TODO random message
                            rover.say("Hello world");
                        }
                    });
                }
            }
        }

        this._rightWindowId = this.getAttribute("ifRight");
        this._wrongWindowId = this.getAttribute("ifWrong");

        for (const item of this.children) {
            // Top level
            if (item.hasAttribute("rightAwnser")) {
                this._rightAwnsers.push(item);
            }
            if (item.hasAttribute("wrongAwnser")) {
                this._wrongAwnsers.push(item);
            }

            // Nested level 1
            for (const childrenItem of item.children) {
                if (childrenItem.hasAttribute("rightAwnser")) {
                    this._rightAwnsers.push(childrenItem);
                }
                if (childrenItem.hasAttribute("wrongAwnser")) {
                    this._wrongAwnsers.push(childrenItem);
                }

                // Nested level 2
                for (const childrenOfChildrenItem of childrenItem.children) {
                    if (childrenOfChildrenItem.hasAttribute("rightAwnser")) {
                        this._rightAwnsers.push(childrenOfChildrenItem);
                    }
                    if (childrenOfChildrenItem.hasAttribute("wrongAwnser")) {
                        this._wrongAwnsers.push(childrenOfChildrenItem);
                    }
                }
            }
        }
    }

    /* Private members */
    private _rightWindowId: string;
    private _wrongWindowId: string;
    private _rightAwnsers: Element[] = [];
    private _wrongAwnsers: Element[] = [];
    private _posX: number = 0;
    private _posY: number = 0;
    private _posXMouse: number = 0;
    private _posYMouse: number = 0;
    private _isDragged: boolean = false;
}

if (!customElements.get("app-pc-window")) {
    customElements.define("app-pc-window", PCWindow);
}
