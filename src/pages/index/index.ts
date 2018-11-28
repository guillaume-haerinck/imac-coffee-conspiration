/* Webpack imports */
import './index.scss';
import '../../shared/components/tooltip/tooltip.component';
import '../../shared/components/question/question.component';
import { RoverXpDog } from './elements/rover-xp-dog/rover-xp-dog';

document.getElementById('test').addEventListener('click', () => {
    RoverXpDog.addRover();
});
