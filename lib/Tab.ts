import { EventEmitter } from 'events';
import { Callback } from './Tabs';

export default class Tab extends EventEmitter {
	el: HTMLElement;
	active: boolean = false;
	id: string = '';
	callback: Callback;
	controls: string;

	constructor(el: HTMLElement, callback: Callback) {
		super();

		this.el = el;
		this.id = el.id;

		this.controls = el.getAttribute('aria-controls')?.trim().split(' ')[0] || '';

		this.active = JSON.parse(el.getAttribute('aria-selected') as string);
		this.callback = callback.bind(this);

		this.handleClick = this.handleClick.bind(this);
	}

	init = () => this.initEvents();

	initEvents = () => this.el.addEventListener('click', this.handleClick);

	/**
	 * Handle click
	 */
	handleClick = () => this.toggle();

	/**
	 * Toggle
	 *
	 * @param {boolean} focus
	 */
	async toggle(focus: boolean = true): Promise<void> {
		// console.info('Tab.handleClick', this.active);

		if (this.active) {
			return;
		}

		await this.callback();

		this.emit('Tab.activate', { controls: this.controls, element: this.el });
		this.activate(focus);
	}

	/**
	 * Activate tab
	 *
	 * @param {boolean} focus
	 * @return void
	 */
	activate(focus: boolean = true): void {
		// console.info('Tab.activate');

		this.active = true;
		this.el.setAttribute('tabindex', '0');
		this.el.setAttribute('aria-selected', 'true');

		this.el.classList.add('is-active');

		if (focus) {
			this.focus();
		}
	}

	/**
	 * Deactivate tab
	 *
	 * @return void
	 */
	deactivate(): void {
		// console.info('Tab.deactivate');

		this.active = false;
		this.el.setAttribute('tabindex', '-1');
		this.el.setAttribute('aria-selected', 'false');

		this.el.classList.remove('is-active');
	}

	/**
	 * Focus tab
	 *
	 * @return void
	 */
	focus = () => this.el.focus();

	/**
	 * Delete tab
	 *
	 * @return void
	 */
	delete = () => this.el.parentElement?.removeChild(this.el);

	destroy(): void {
		this.el.removeAttribute('tabindex');
		this.el.removeAttribute('aria-selected');
		this.el.classList.remove('is-active');

		this.el.removeEventListener('click', this.handleClick);
	}
}
