import EventDispatcher from '@/EventDispatcher';

export default class Tab extends EventDispatcher {
	constructor(element, index) {
		super(['Tab.activate', 'Tab.delete']);

		this.rootElement = element;
		this.rootElement.index = index;
		this.id = element.id;
		this.controls = element.getAttribute('aria-controls');

		this.active = JSON.parse(element.getAttribute('aria-selected'));

		this.toggle = this.toggle.bind(this);
	}

	init() {
		this.initEvents();
	}

	initEvents() {
		this.rootElement.addEventListener('click', this.toggle);
	}

	/**
	 * Toggle
	 *
	 * @param {boolean} focus
	 * @return void
	 */
	toggle(focus = true) {
		// console.info('Tab.toggle', this.active);

		if (this.active) {
			return;
		}

		this.emit('Tab.activate', { controls: this.controls, element: this.rootElement });
		this.activate(focus);
	}

	/**
	 * Activate tab
	 *
	 * @param {boolean} focus
	 * @return void
	 */
	activate(focus = true) {
		// console.info('Tab.activate');

		this.active = true;
		this.rootElement.setAttribute('tabindex', 0);
		this.rootElement.setAttribute('aria-selected', true);

		this.rootElement.classList.add('is-active');

		if (focus) {
			this.focus();
		}
	}

	/**
	 * Deactivate tab
	 *
	 * @return void
	 */
	deactivate() {
		// console.info('Tab.deactivate');

		this.active = false;
		this.rootElement.setAttribute('tabindex', -1);
		this.rootElement.setAttribute('aria-selected', false);

		this.rootElement.classList.remove('is-active');
	}

	/**
	 * Focus tab
	 *
	 * @return void
	 */
	focus() {
		this.rootElement.focus();
	}

	/**
	 * Delete tab
	 *
	 * @return void
	 */
	delete() {
		// console.info('Tab.delete');

		this.emit('Tab.delete', { controls: this.controls, element: this.rootElement });
		this.rootElement.parentElement.removeChild(this.rootElement);
	}

	destroy() {
		this.rootElement.removeAttribute('tabindex');
		this.rootElement.removeAttribute('aria-selected');
		this.rootElement.classList.remove('is-active');

		this.rootElement.removeEventListener('click', this.toggle);
		this.off('Tab.activate', { controls: this.controls, element: this.rootElement });
	}
}
