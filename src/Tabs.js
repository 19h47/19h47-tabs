import { hash, delay } from '@/config';
import TabPanel from '@/TabPanel';
import Tab from '@/Tab';
import getHash from 'Utils/getHash';
import direction from 'Utils/direction';

import {
	BACKSPACE,
	HOME,
	END,
	ARROW_RIGHT,
	ARROW_LEFT,
	PAGE_UP,
	PAGE_DOWN,
	DELETE,
} from '@19h47/keycode';

const defaults = { hash, delay };

export default class Tabs {
	constructor(element, options = {}) {
		this.rootElement = element;

		this.$tabList = this.rootElement.querySelector('[role="tablist"]');

		this.options = { ...defaults, ...options };
		this.options.orientation = 'vertical' === this.$tabList.getAttribute('aria-orientation');

		this.href = (this.options.hash && getHash(window.location.hash)) || false;
		this.current = 0;

		this.onKeydown = this.onKeydown.bind(this);
		this.onKeyup = this.onKeyup.bind(this);
	}

	init() {
		this.tabs = [...this.$tabList.querySelectorAll('[role="tab"]')].map(
			($element, index) => new Tab($element, index),
		);
		this.tabPanels = [...this.rootElement.querySelectorAll('[role="tabpanel"]')].map(
			$element => new TabPanel($element),
		);

		this.tabs.forEach((tab, index) => {
			tab.init();

			tab.on('Tab.activate', () => {
				// console.info('Tab.activate');
				this.current = index;

				this.deactivateTabs();
				this.deactivateTabPanels();

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
				this.tabPanels.find(tabPanel => tabPanel.id === tab.controls).activate();
			}
		});

		this.initEvents();
	}

	initEvents() {
		this.$tabList.addEventListener('keyup', this.onKeyup);
		this.$tabList.addEventListener('keydown', this.onKeydown);
	}

	/**
	 * Keydown event listener
	 *
	 * Handle keydown on tabs
	 *
	 * @param  obj event
	 * @return void
	 */
	onKeydown(event) {
		// console.log('Tabs.onKeydown');

		const { keyCode: key } = event;

		// My first
		const first = () => {
			event.preventDefault();

			this.current = 0;
			this.tabs[0].toggle();
		};

		// My last
		const last = () => {
			event.preventDefault();

			this.current = this.tabs.length - 1;
			this.tabs[this.tabs.length - 1].toggle();
		};

		// My everything
		const codes = {
			[END]: last,
			[HOME]: first,
			[PAGE_UP]: () => {
				if ('vertical' === this.options.orientation) {
					event.preventDefault();
					this.switchTabOnArrowPress(event);
				}
			},
			[PAGE_DOWN]: () => {
				if ('vertical' === this.options.orientation) {
					event.preventDefault();
					this.switchTabOnArrowPress(event);
				}
			},
			default: () => false,
		};

		return (codes[key] || codes.default)();
	}

	/**
	 * Keyup event listener
	 *
	 * Handle keyup on tabs
	 *
	 * @param {object} event
	 * @return void
	 */
	onKeyup(event) {
		// console.info('Tabs.onKeyup');

		const { keyCode: key, target } = event;
		const selected = JSON.parse(target.getAttribute('aria-selected'));

		const codes = {
			[ARROW_LEFT]: () => this.switchTabOnArrowPress(event),
			[ARROW_RIGHT]: () => this.switchTabOnArrowPress(event),
			[DELETE]: () => selected && this.determineDeletable(event),
			[BACKSPACE]: () => selected && this.determineDeletable(event),
			default: () => false,
		};

		return (codes[key] || codes.default)();
	}

	/**
	 * Switch tab on arrow press
	 *
	 * Either focus the next, previous, first, or last tab depening on key
	 * pressed
	 *
	 * @param  {object} event
	 * @return void
	 */
	switchTabOnArrowPress({ target, keyCode: key }) {
		// console.info('Tabs.switchTabOnArrowPress');

		if (this.options.delay) {
			this.tabs.map(tab =>
				tab.rootElement.addEventListener('focus', e => {
					this.focusEventHandler(e);
				}),
			);
		}

		if (direction[key] && target.index !== undefined) {
			if (this.tabs[target.index + direction[key]]) {
				this.tabs[target.index + direction[key]].focus();
			} else if (key === ARROW_LEFT || key === PAGE_UP) {
				this.tabs[this.tabs.length - 1].focus();
			} else if (key === ARROW_RIGHT || key === PAGE_DOWN) {
				this.tabs[0].focus();
			}
		}
	}

	/**
	 * Deactivate tabs
	 *
	 * @return void
	 */
	deactivateTabs() {
		this.tabs.forEach(tab => tab.deactivate());
	}

	/**
	 * Deactivate tab panels
	 *
	 * @retur void
	 */
	deactivateTabPanels() {
		this.tabPanels.forEach(tabPanel => tabPanel.deactivate());
	}

	/**
	 * Determine deletable
	 *
	 * Detect if a tab is deletable
	 *
	 * @param  {object} event
	 * @return {boolean}
	 */
	determineDeletable({ target }) {
		// console.info('Tabs.determineDeletable');

		if (null === target.getAttribute('data-deletable')) {
			return false;
		}

		this.tabs[target.index].delete();
		this.tabPanels[target.index].delete();

		//
		this.tabs.splice(target.index, 1);
		this.tabPanels.splice(target.index, 1);

		// Activate the closest tab to the one that was just deleted
		if (0 > target.index - 1) {
			this.current = 0;
			this.tabs[0].toggle();
		} else {
			this.current = target.index - 1;
			this.tabs[target.index - 1].toggle();
		}

		return true;
	}

	/**
	 * Focus event handler
	 *
	 * @param  {object} event
	 * @return void
	 */
	focusEventHandler({ target }) {
		// console.info('Tabs.focusEventHandler');

		setTimeout(() => {
			if (target === document.activeElement) {
				this.tabs[target.index].toggle(false);
			}
		}, this.options.delay);
	}

	destroy() {
		this.$tabList.removeEventListener('keyup', this.onKeyup);
		this.$tabList.removeEventListener('keydown', this.onKeydown);

		this.tabs.forEach(tab => tab.destroy());
		this.tabPanels.forEach(tabPanel => tabPanel.destroy());

		this.tabs = [];
		this.tabPanels = [];
	}

	create() {
		this.init();
	}
}
