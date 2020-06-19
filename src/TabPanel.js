export default class TabPanel {
	constructor(element) {
		this.rootElement = element;
		this.id = element.id;
	}

	deactivate() {
		this.rootElement.setAttribute('hidden', 'hidden');
		this.rootElement.classList.remove('is-active');
	}

	activate() {
		// console.info('TabPanel.activate', this.id);

		this.rootElement.removeAttribute('hidden');
		this.rootElement.classList.add('is-active');
	}

	delete() {
		this.rootElement.parentElement.removeChild(this.rootElement);
	}

	destroy() {
		this.rootElement.removeAttribute('hidden');
		this.rootElement.classList.remove('is-active');
	}
}
