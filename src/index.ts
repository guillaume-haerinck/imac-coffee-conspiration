// https://www.npmjs.com/package/typings-for-scss-modules-loader

/* Webpack imports */
import './components/tooltip/tooltip.js';
import './index.scss';

console.log('hello from index');

const element = document.createElement('div');
element.innerHTML = 'Added by js by client';
document.body.appendChild(element);
