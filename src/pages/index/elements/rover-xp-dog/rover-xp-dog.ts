import "./rover-xp-dog.scss"; // Webpack import

export class RoverXpDog {
    private _wrapperId: string;

    constructor(wrapperId: string) {
        this._wrapperId = wrapperId;
    }

    public append() {
        const roverContainer = document.createElement("div");
        roverContainer.innerHTML = "I\'m roveeer";
        document.getElementById(this._wrapperId).appendChild(roverContainer);
    }

    public say(message: string) {
        console.log(message);
    }
}
