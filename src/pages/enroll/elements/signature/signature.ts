import "./signature.scss";
import { environment } from "../../../../../environment.js";

export class Signature {
    constructor(wrapperId: string, destinationImgId: string) {
        this._wrapperId = wrapperId;
        this._imageId = destinationImgId;
        this._canvas = document.createElement("canvas");
        this._canvas.id = "signature-canvas";
        this._canvas.width = 300;
        this._canvas.height = 150;
        this._context = this._canvas.getContext("2d");
        
        this._context.strokeStyle = "black";
        this._context.lineJoin = "round";
        this._context.lineCap = "round";
        this._context.lineWidth = 2;
        this._context.fillStyle = "transparent";
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._bDrawing = false;
        this._lastX = 0;
        this._lastY = 0;

        // Add to html
        document.getElementById(wrapperId).appendChild(this._canvas);
        this.addEventListenners();
    }

    private draw(x: number, y: number) {
        if (!this._bDrawing) return; // stop the fn from running when they are not moused down
        this._context.beginPath();
        // start from
        this._context.moveTo(this._lastX, this._lastY);
        // go to
        this._context.lineTo(x, y);
        this._context.stroke();
        [this._lastX, this._lastY] = [x, y];
      }
      
    private openSignature() {
        const imageURL = this._canvas.toDataURL("image/png");
        const img = document.getElementById(this._imageId) as HTMLImageElement;
        img.src = imageURL;
    }

    private addEventListenners() {
        //Init Drawing
        this._canvas.addEventListener("mousedown", e => {
            this._bDrawing = true;
            [this._lastX, this._lastY] = [e.offsetX, e.offsetY];
        });
        this._canvas.addEventListener("touchstart", e => {
            if (e.touches && e.touches.length == 1) {
                this._bDrawing = true;
                let touch = e.touches[0] as any;
                let touchX = touch.pageX - touch.target.offsetLeft;
                let touchY = touch.pageY - touch.target.offsetTop;
                [this._lastX, this._lastY] = [touchX, touchY];
                e.preventDefault();
            }
        });
        
        //Begin Drawing
        this._canvas.addEventListener("mousemove", e => {
            this.draw(e.offsetX, e.offsetY);
        });
        this._canvas.addEventListener("touchmove", e => {
            if (e.touches && e.touches.length == 1) {
                let touch = e.touches[0] as any;
                let touchX = touch.pageX - touch.target.offsetLeft;
                let touchY = touch.pageY - touch.target.offsetTop;
                this.draw(touchX, touchY);
            }
        });
        
        //End Drawing
        this._canvas.addEventListener("mouseup", () => {
            this._bDrawing = false;
            this.openSignature();
        });
        this._canvas.addEventListener('mouseout', () => this._bDrawing = false);
        this._canvas.addEventListener("touchend", () => this._bDrawing = false);
    }

    /* Private members */
    _wrapperId: string;
    _imageId: string;
    _canvas: HTMLCanvasElement;
    _context: CanvasRenderingContext2D;
    _lastX: number;
    _lastY: number;
    _bDrawing: boolean;
}