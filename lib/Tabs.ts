import getHash from './utils/getHash';
import { hash, delay } from './config';
import TabPanel from './TabPanel';
import Tab from './Tab';

interface Options {
	hash: boolean;
	callback?: Callback;
	delay: number;
}

export type Callback = () => void;

const optionsDefault = {
	hash,
	delay,
	callback() { },
};

export default class Tabs {
	el: HTMLElement;
	$tabList: HTMLElement | null;
	current: number = 0;
	tabPanels: TabPanel[] = [];
	tabs: Tab[] = [];
	href: string = '';
	options: Options;

	constructor(el: HTMLElement, options = {}) {
		this.el = el;

		this.$tabList = this.el.querySelector('[role="tablist"]') as HTMLElement;

		this.options = { ...optionsDefault, ...options };

		this.href = (this.options.hash && getHash(window.location.hash)) || '';
	}

	init() {
		// console.log('Tabs.init');

		// @ts-ignore
		this.tabs = [...this.$tabList.querySelectorAll('[role="tab"]')].map(
			// @ts-ignore
			$element => new Tab($element, this.options.callback),
		);

		this.tabs.forEach((tab, index) => {
			this.tabPanels.push(
				new TabPanel(this.el.querySelector(`#${tab.controls}[role="tabpanel"]`) as HTMLElement)
			);
			tab.init();

			tab.el.addEventListener('Tab.activate', () => {
				// console.info('Tab.activate');
				this.current = index;

				this.deactivateTabs();
				this.deactivateTabPanels();
				// @ts-ignore
				this.tabPanels.find(tabPanel => tabPanel.id === tab.controls).activate();

				if (this.options.hash) {
					this.href = tab.id;
					window.location.hash = tab.id;
				}
			});

			if (tab.active || tab.id === this.href || this.current === index) {
				this.deactivateTabs();
				this.deactivateTabPanels();

				tab.activate(false);
				// @ts-ignore
				this.tabPanels.find(tabPanel => tabPanel.id === tab.controls).activate();
			}
		});

		this.initEvents();
	}

	initEvents() {
		this.$tabList?.addEventListener('keydown', this.handleKeydown);
	}

	/**
	 * Keydown event listener
	 *
	 * Handle keydown on tabs
	 *
	 * @param  { KeyboardEvent} event
	 * @return void
	 */
	handleKeydown = (event: KeyboardEvent) => {
		// console.log('Tabs.handleKeydown');

		const { key, code, target } = event;

		const selected = JSON.parse(
			(target as HTMLElement).getAttribute('aria-selected') as string,
		);

		const previous = () => {
			this.current = 0 > this.current - 1 ? this.tabs.length - 1 : this.current - 1;
			this.tabs[this.current].focus();

			if (this.options.delay) {
				setTimeout(() => {
					this.tabs[this.current].toggle(false);
				}, this.options.delay);
			}
		};
		const next = () => {
			this.current = this.current + 1 > this.tabs.length - 1 ? 0 : this.current + 1;
			this.tabs[this.current].focus();

			if (this.options.delay) {
				setTimeout(() => {
					this.tabs[this.current].toggle(false);
				}, this.options.delay);
			}
		};

		// My first
		const first = () => {
			event.preventDefault();

			this.current = 0;
			this.tabs[this.current].toggle();
		};

		// My last
		const last = () => {
			event.preventDefault();

			this.current = this.tabs.length - 1;
			this.tabs[this.current].toggle();
		};

		// My everything
		const codes: any = {
			ArrowUp: previous,
			ArrowLeft: previous,
			ArrowDown: next,
			ArrowRight: next,
			End: last,
			Home: first,
			PageUp: first,
			PageDown: last,
			Delete: () => selected && this.delete(event),
			Backspace: () => selected && this.delete(event),
			default: () => false,
		};

		return (codes[key || code] || codes.default)();
	}

	/**
	 * Deactivate tabs
	 *
	 * @return void
	 */
	deactivateTabs = () => this.tabs.forEach(tab => tab.deactivate());

	/**
	 * Deactivate tab panels
	 *
	 * @return void
	 */
	deactivateTabPanels = () => this.tabPanels.forEach(tabPanel => tabPanel.deactivate());

	/**
	 * Delete
	 *
	 * @param  {KeyboardEvent} event
	 *
	 * @return {boolean}
	 */
	delete({ target }: KeyboardEvent): boolean {
		// console.info('Tabs.delete');

		if (null === (target as HTMLElement).getAttribute('data-deletable')) {
			return false;
		}

		this.tabs[this.current].delete();
		this.tabPanels[this.current].delete();

		this.tabs.splice(this.current, 1);
		this.tabPanels.splice(this.current, 1);

		// Activate the closest tab to the one that was just deleted
		if (0 > this.current - 1) {
			this.current = 0;
		} else {
			this.current = this.current - 1;
		}

		this.tabs[this.current].toggle();

		return true;
	}

	destroy(): void {
		this.$tabList?.removeEventListener('keydown', this.handleKeydown);

		this.tabs.forEach(tab => tab.destroy());
		this.tabPanels.forEach(tabPanel => tabPanel.destroy());

		this.tabs = [];
		this.tabPanels = [];
	}

	/**
	 * Create
	 */
	create = () => this.init();
}
