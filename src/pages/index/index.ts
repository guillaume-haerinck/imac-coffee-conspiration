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

/* Event listenners and function calls */
document.addEventListener('click', (event: MouseEvent) => {
  if (event.srcElement.id === "intro-overlay") {
    tvroom.start(); // Loading scene
    document.getElementById("intro-overlay").remove();
    tvroom.addMainScene()
      .then(() => {
        snoopaVision.init();
      });
  };
});

snoopaVision.container.addEventListener('mouseenter', () => {
  snoopaVision.reveal();
  const overlay = document.getElementById("goto-fullscreen-overlay") as HTMLElement & Overlay;
  overlay.unhide();
}, {once: true});

/* Exports to access elements for inspector and from html */
(window as any).scene = tvroom.scene;
(window as any).THREE = THREE;
