export default class Tab {
	constructor(element, index) {
		this.rootElement = element;
		this.rootElement.index = index;
		this.id = element.id;
	}

	/**
	 * Deactivate tab
	 *
	 * @return void
	 */
	deactivate() {
		// console.info('Tab.deactivate');

		this.rootElement.setAttribute('tabindex', '-1');
		this.rootElement.setAttribute('aria-selected', 'false');
		// this.rootElement.removeEventListener('focus', this.focusEventHandler);
		this.rootElement.classList.remove('is-active');
	}

	/**
	 * Activate tab
	 *
	 * @return void
	 */
	activate() {
		// console.info('Tab.activate');

		this.rootElement.setAttribute('tabindex', 0);
		this.rootElement.setAttribute('aria-selected', true);

		this.rootElement.classList.add('is-active');
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
