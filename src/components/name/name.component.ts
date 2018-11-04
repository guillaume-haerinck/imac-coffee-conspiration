import { CustomElement } from '../component.decorator';

@CustomElement({
	selector: 'app-name',
	template: `<div>My name is Inigo Montoya</div>
               <div>You killed my father</div>
               <div>Prepare to die!</div>`,
	style: `:host {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: #009cff;
      padding: 16px;
      border-top: 1px solid black;
      font-size: 24px;
    }`,
	useShadow: true,
})
export class Name extends HTMLElement {
	public connectedCallback() {
		const elm = document.createElement('h3');
		elm.textContent = 'Boo!';
		this.shadowRoot.appendChild(elm);
		console.log('connected callback');
	}

	public disconnectedCallback() {
		console.log('disconnected callback');
	}

	public componentWillMount() {
		console.log('component will mount');
	}

	public componentDidMount() {
		console.log('component did mount');
	}

	public componentWillUnmount() {
		console.log('component will unmount');
	}

	public componentDidUnmount() {
		console.log('component did unmount');
	}
}

window.addEventListener('DOMContentLoaded', () => {
	const element = document.querySelector('app-name');
	setTimeout(() => {
		element.parentNode.removeChild(element);
	}, 2000);
});
