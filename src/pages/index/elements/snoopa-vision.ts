import { environment } from "../../../../environment.js";

export class SnoopaVision {
    snoopaContainer: HTMLDivElement;
    snoopaImage: HTMLImageElement;
    snoopaPosition: ClientRect | DOMRect;

    constructor() {
        this.snoopaContainer = document.createElement("div");
    }

    init() {
        this.snoopaContainer.className = "snoopa-vision";
        this.snoopaContainer.innerHTML = `<img src=${environment.assetsUrl}images/snoopa-vision.png>`;
        this.snoopaImage = this.snoopaContainer.firstElementChild as HTMLImageElement;
        this.placeSnoopAtRandom();
        this.snoopaContainer.style.opacity = "0";
        document.body.appendChild(this.snoopaContainer);
        this.snoopaPosition = this.snoopaContainer.getBoundingClientRect();
      }
      
      updateSnoopHints = (event: MouseEvent) => {
        // TODO client x and y and snoopa container position
        //console.log("snoopposition: " + snoopaPosition.right);
        //console.log("mouseX: " + event.clientX);
      }
      
      revealSnoop = () => {
        const audio = new Audio(environment.assetsUrl + "/audio/snoopa-vision.mp3");
        audio.play();
        this.snoopaContainer.style.opacity = "100";
        document.removeEventListener("mousemove", this.updateSnoopHints);
      }

      private placeSnoopAtRandom() {
        this.snoopaContainer.style.position = "absolute";
        this.snoopaContainer.style.width = "150px";
        this.snoopaImage.style.width = "150px";
        this.snoopaImage.style.maxHeight = "200px";
        const posX = Math.floor(Math.random() * Math.floor(window.innerWidth - 150));
        const posY = Math.floor(Math.random() * Math.floor(window.innerHeight - 200));
        this.snoopaContainer.style.left = posX.toString() + "px";
        this.snoopaContainer.style.top = posY.toString() + "px";
      }
}