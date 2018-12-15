import { Overlay } from "./shared/custom-elements/overlay/overlay";

/* Functions */
function blockWebsite(isActivated: boolean) {
    if (isActivated) {
        const overlay = new Overlay();
        overlay.id = "stopit-overlay";
        overlay.innerHTML = "<p>DO NO EXIT FULLSCREEN MOTHERFUCKER</p>";
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
