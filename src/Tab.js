import EventDispatcher from '@/EventDispatcher';

export default class Tab extends EventDispatcher {
	constructor(element, index) {
		super(['Tab.activate']);

		this.rootElement = element;
		this.rootElement.index = index;
		this.id = element.id;
		this.controls = element.getAttribute('aria-controls');

		this.active = false;

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

		this.emit('Tab.activate', { controls: this.controls });
		this.activate(focus);
	}

	/**
	 * Deactivate tab
	 *
	 * @return void
	 */
	deactivate() {
		// console.info('Tab.deactivate');

		this.active = false;
		this.rootElement.setAttribute('tabindex', '-1');
		this.rootElement.setAttribute('aria-selected', 'false');
		// this.rootElement.removeEventListener('focus', this.focusEventHandler);
		this.rootElement.classList.remove('is-active');
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
		this.rootElement.parentElement.removeChild(this.rootElement);
	}
}
