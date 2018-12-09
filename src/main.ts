/* Functions */
function blockWebsite(isActivated: boolean) {
    console.log("DO NOT EXIT");
}

/* Global event listenners */
const isFullScreen = matchMedia("all and (display-mode: fullscreen");
isFullScreen.onchange = (event: Event) => {
    if (!isFullScreen.matches) {
        blockWebsite(true);
    } else {
        // blockWebsite(false);
    }
};
