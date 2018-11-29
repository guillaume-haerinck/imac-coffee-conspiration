import "./window.scss";

export class Window extends HTMLElement {
    private _rightWindowId: string;
    private _wrongWindowId: string;
    private _rightAwnsers: Element[] = [];
    private _wrongAwnsers: Element[] = [];

    constructor() {
        // Always call super first in constructor
        super();
    }

    public connectedCallback() {
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
            awnser.addEventListener("click", (event: Event) => {
                console.log("right awnser clicked !");
                this.replaceWindow(this._rightWindowId);
            });
        });

        this._wrongAwnsers.forEach((awnser: Element) => {
            awnser.addEventListener("click", (event: Event) => {
                console.log("wrong awnser clicked !");
            });
        });
    }

    public disconnectedCallback() {
        console.log(this.id + " destructed !");
    }

    private replaceWindow(destinationId: string) {
        for (const item of this.children) {
            item.removeEventListener("click", (event: Event) => {
                console.log("event listenner removed");
            });
        }
        const destination = document.getElementById(destinationId);
        destination.hidden = false;
        this.replaceWith(destination);
    }
}

customElements.define("app-window", Window);
