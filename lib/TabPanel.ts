export default class TabPanel {
	el: HTMLElement;
	id: string;

	constructor(el: HTMLElement) {
		this.el = el;
		this.id = el.id;
	}

	deactivate() {
		this.el.setAttribute('hidden', 'true');
		this.el.classList.remove('is-active');
	}

	activate() {
		// console.info('TabPanel.activate', this.id);

		this.el.removeAttribute('hidden');
		this.el.classList.add('is-active');
	}

	delete = () => this.el.parentElement?.removeChild(this.el);

	destroy() {
		this.el.removeAttribute('hidden');
		this.el.classList.remove('is-active');
	}
}
