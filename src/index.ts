// https://www.npmjs.com/package/typings-for-scss-modules-loader

/* Webpack imports */
import './index.scss';

/* Typescript imports */
import { HowtoTooltip } from './components/tooltip/tooltip';
import { Name } from './components/name/name.component';

console.log('hello from index');

const element = document.createElement('div');
element.innerHTML = 'Added by js by client';
document.body.appendChild(element);

window.customElements.define('app-howto-tooltip', HowtoTooltip);
window.customElements.define('app-name', Name);
