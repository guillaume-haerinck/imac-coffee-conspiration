import '@webcomponents/custom-elements'; // Polyfills for custom elements. Do this import before any code that manipulates the DOM.
import { Overlay } from "./shared/custom-elements/overlay/overlay";

/* Functions */
function blockWebsite(isActivated: boolean) {
    if (isActivated) {
        const overlay = new Overlay();
        overlay.id = "stopit-overlay";
        overlay.innerHTML = `<p>You need Snoopa-Vision to find the truth !</p>
        <p id="snoopa-vision-f11">Press <strong>F11</strong> to put it back.</p>`;
        document.body.appendChild(overlay);
    } else {
        document.getElementById("stopit-overlay").remove();
    }
}

/* Global event listenners */
const isFullScreen = matchMedia("all and (display-mode: fullscreen");
isFullScreen.onchange = (event: Event) => {
    if (!isFullScreen.matches) {
        blockWebsite(true);
    } else {
        blockWebsite(false);
    }
};
