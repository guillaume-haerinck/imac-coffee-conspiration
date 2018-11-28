/* Webpack imports */
import "./index.scss";
import "../../shared/custom-elements/window/window";

/* Typescript imports */
import { RoverXpDog } from "./elements/rover-xp-dog/rover-xp-dog";

/* Exports to access elements inside html */
(window as any).RoverXpDog = new RoverXpDog("background-wrapper");
