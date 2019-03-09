// import getHighestHeight from 'Utils/getHighestHeight';
import getHash from 'Utils/getHash';

export default class Tabs {
	constructor(element) {
		this.$cont = element;

		this.$nav = this.$cont.querySelector('.js-nav');
		this.$content = this.$cont.querySelector('.js-content');

		this.buttons = this.$cont.querySelectorAll('.js-button');
		this.panels = Array.from(this.$content.children);

		this.count = Math.max(this.buttons.length, this.panels.length);
		this.href = getHash(window.location.href);
	}

	init() {
		this.initEvents();
	}

	initEvents() {
		window.addEventListener('resize', this.onResize);

		if (window.location.hash) {
			const hash = window.location.hash.substring(1);

			for (let i = 0; i < this.count; i += 1) {
				if (this.buttons[i].getAttribute('data-name') === hash) {
					this.toggle(this.buttons[i]);
				}
			}
		}

		for (let i = 0; i < this.count; i += 1) {
			this.buttons[i].addEventListener('click', () => {
				this.toggle(this.buttons[i]);
			});

			this.buttons[i].addEventListener('focus', () => {
				this.toggle(this.buttons[i]);
			});
		}
	}

	/**
	 * Toggle
	 *
	 * @param
	 * @return
	 */
	toggle(element) {
		this.closeAll();

		return this.open(element);
	}

	closeAll() {
		for (let i = 0; i < this.count; i += 1) {
			this.buttons[i].setAttribute('aria-selected', false);

			this.buttons[i].classList.remove('is-active');
			this.panels[i].classList.remove('is-active');
		}
	}

	/**
	 * Open
	 *
	 * @param
	 * @return
	 */
	open(element) {
		const current = element.getAttribute('data-name');
		element.setAttribute('aria-selected', true);

		this.$content.querySelector(`[data-name=${current}]`).classList.add('is-active');

		return element.classList.add('is-active');
	}
}
