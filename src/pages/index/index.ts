/* Webpack imports */
import './index.scss';
import '../../shared/components/tooltip/tooltip.component';
import '../../shared/components/question/question.component';
import { RoverXpDog } from './elements/rover-xp-dog/rover-xp-dog';

/* Exports to access elements inside html */
(window as any).RoverXpDog = RoverXpDog;
