import "./quizz.scss";
import "../../shared/custom-elements/window/window";
import { Window } from "../../shared/custom-elements/window/window";
import { RoverXpDog } from "./elements/rover-xp-dog/rover-xp-dog";

const window1 = document.getElementById('q-test1') as Window & HTMLElement;
window1.getMe();

/* Exports to access elements inside html */
(window as any).RoverXpDog = new RoverXpDog("background-wrapper");
