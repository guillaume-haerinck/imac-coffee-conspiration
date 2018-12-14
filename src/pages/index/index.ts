/* 3rd party */
import * as THREE from "three";

/* custom */
import "../../shared/custom-elements/overlay/overlay";
import "./index.scss";
import { TVRoom } from "./elements/tv-room";
import { SnoopaVision } from "./elements/snoopa-vision";

/* Create objects */
const tvroom = new TVRoom();
const snoopaVision = new SnoopaVision();

/* Event listenners and function calls */
tvroom.init();
tvroom.animate();

document.addEventListener('mousemove', tvroom.parralax, false);
window.addEventListener("resize", tvroom.resize, true);

// Overlays
document.addEventListener('click', (event: MouseEvent) => {
  if (event.srcElement.id === "intro-overlay") {
    document.getElementById("intro-overlay").remove();
    snoopaVision.init();
  };
});

snoopaVision.snoopaContainer.addEventListener('mouseenter', () => {
  snoopaVision.revealSnoop();
  document.getElementById("fullscreen-overlay").style.display = "grid";
}, {once: true});

/* Exports to access elements for inspector and from html */
(window as any).scene = tvroom.scene;
(window as any).THREE = THREE;
