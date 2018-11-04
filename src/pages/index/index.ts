/* Webpack imports */
import './index.scss';
import '../../shared/components/tooltip/tooltip.component';

console.log('hello from index');

const element = document.createElement('div');
element.innerHTML = 'Added by js by client';
document.body.appendChild(element);
