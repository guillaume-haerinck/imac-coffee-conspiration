import "./quizz.scss";
import "../../shared/custom-elements/pc-window/pc-window";
import { PCWindow } from "../../shared/custom-elements/pc-window/pc-window";
import { RoverXpDog } from "./elements/rover-xp-dog/rover-xp-dog";

const pcWindow1 = document.getElementById('q-test1') as PCWindow & HTMLElement;
pcWindow1.getMe();

/* Exports to access elements inside html */
(window as any).RoverXpDog = new RoverXpDog("background-wrapper");
