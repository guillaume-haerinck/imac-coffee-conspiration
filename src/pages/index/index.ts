/* 3rd party */
import * as THREE from "three";

/* custom */
import "../../shared/custom-elements/overlay/overlay";
import "./index.scss";
import { Overlay } from "../../shared/custom-elements/overlay/overlay";
import { TVRoom } from "./elements/tv-room";
import { SnoopaVision } from "./elements/snoopa-vision";

/* Create objects */
const tvroom = new TVRoom();
const snoopaVision = new SnoopaVision();

/* Event listenners and function calls */
// Overlays
document.addEventListener('click', (event: MouseEvent) => {
  if (event.srcElement.id === "intro-overlay") {
    document.getElementById("intro-overlay").remove();
    snoopaVision.init();
  };
});

snoopaVision.container.addEventListener('mouseenter', () => {
  snoopaVision.reveal();
  const overlay = document.getElementById("fullscreen-overlay") as HTMLElement & Overlay;
  overlay.unhide();
}, {once: true});

/* Exports to access elements for inspector and from html */
(window as any).scene = tvroom.scene;
(window as any).THREE = THREE;
