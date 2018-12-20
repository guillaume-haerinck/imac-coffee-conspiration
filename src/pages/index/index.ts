/* 3rd party */
import * as THREE from "three";
const Typed = require("typed.js");

/* custom */
import "../../shared/custom-elements/overlay/overlay";
import "./index.scss";
import { Overlay } from "../../shared/custom-elements/overlay/overlay";
import { TVRoom } from "./elements/tv-room";
import { SnoopaVision } from "./elements/snoopa-vision";


/* Overlay animation */
const introTextAnimation = new Typed('#intro-overlay-text-animation', {
  stringsElement: '#intro-overlay-text',
  typeSpeed: 50
});

/* Create objects */
const tvroom = new TVRoom();
const snoopaVision = new SnoopaVision();
let bSnoopFound = false;

/* Event listenners and function calls */
document.addEventListener('click', (event: MouseEvent) => {
  if (event.srcElement.id === "intro-overlay") {
    tvroom.start(); // Loading scene
    document.getElementById("intro-overlay").remove();
    tvroom.addMainScene()
      .then(() => {
        snoopaVision.init();

        // Update lighing based on snoppa vision position
        const snoopCenterX = snoopaVision.position.left + (snoopaVision.position.width / 2);
        const snoopCenterY = snoopaVision.position.top + (snoopaVision.position.height + 50);
        document.addEventListener("mousemove", (event: MouseEvent) => {
          if (!bSnoopFound) {
            const closeToSnoopXAt0 = Math.abs(snoopCenterX - event.clientX);
            const closeToSnoopYAt0 = Math.abs(snoopCenterY - event.clientY);
            const intensity = 4 - (closeToSnoopXAt0 + closeToSnoopYAt0) * 0.005;
            tvroom.light.intensity = intensity;
          } else {
            tvroom.light.intensity = 3;
          }
        });
      });
  };
});

snoopaVision.container.addEventListener('mouseenter', () => {
  snoopaVision.reveal();
  bSnoopFound = true;
  const overlay = document.getElementById("goto-fullscreen-overlay") as HTMLElement & Overlay;
  overlay.unhide();
  const isFullScreen = matchMedia("all and (display-mode: fullscreen");
  isFullScreen.onchange = (event: Event) => {
    if (isFullScreen.matches) {
      overlay.remove();
      tvroom.changeVideo("invasion-los-angeles.mp4");
      tvroom.moveCameraToTv();
      setTimeout(() => {
        tvroom.videoMute = true;
        window.location.hash = "quizz"; // Change page
      }, 6000);
    }
  }, {once: true};
}, {once: true});


/* Exports to access elements for inspector and from html */
(window as any).scene = tvroom.scene;
(window as any).THREE = THREE;
