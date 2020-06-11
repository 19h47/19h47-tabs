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

		const tabs = [...this.$tabList.querySelectorAll('[role="tab"]')];
		const tabPanels = [...this.rootElement.querySelectorAll('[role="tabpanel"]')];

		this.tabs = tabs.map(($element, index) => new Tab($element, index));
		this.tabPanels = tabPanels.map($element => new TabPanel($element));

		this.href = this.options.hash && getHash(window.location.href);

		this.onKeydown = this.onKeydown.bind(this);
		this.onKeyup = this.onKeyup.bind(this);
	}

	init() {
		this.tabs.map(tab => {
			tab.init();

			tab.on('Tab.activate', event => {
				const { controls } = event;

				this.deactivateTabs();
				this.deactivateTabPanels();

				this.tabPanels.find(tabPanel => tabPanel.id === controls).activate();

				if (this.options.hash) {
					window.location.hash = tab.id;
				}
			});

			if (this.href && tab.id === this.href) {
				tab.toggle();
			}

			return true;
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

		const codes = {
			[END]: () => {
				event.preventDefault();
				this.tabs[this.tabs.length - 1].toggle();
			},
			[HOME]: () => {
				event.preventDefault();
				this.tabs[0].toggle();
			},
			[PAGE_UP]: () => this.determineOrientation(event),
			[PAGE_DOWN]: () => this.determineOrientation(event),
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
		// console.log('Tabs.onKeyup');

		const { keyCode: key, target } = event;
		const selected = JSON.parse(target.getAttribute('aria-selected'));

		const codes = {
			[ARROW_LEFT]: () => this.determineOrientation(event),
			[ARROW_RIGHT]: () => this.determineOrientation(event),
			[DELETE]: () => selected && this.determineDeletable(event),
			[BACKSPACE]: () => selected && this.determineDeletable(event),
			default: () => false,
		};

		return (codes[key] || codes.default)();
	}

	/**
	 * Determine orientation
	 *
	 * When a tablist's aria-orientation is set to vertical, only up and down
	 * arrow should function. In all other cases only left and right arrow
	 * function.
	 *
	 * @param obj event
	 */
	determineOrientation(event) {
		// console.info('Tabs.determineOrientation');

		const { keyCode: key } = event;
		const { orientation: vertical } = this.options;
		let proceed = false;

		if (vertical && (key === PAGE_UP || key === PAGE_DOWN)) {
			event.preventDefault();
			proceed = true;
		} else if (key === ARROW_LEFT || key === ARROW_RIGHT) {
			proceed = true;
		}

		if (proceed) {
			this.switchTabOnArrowPress(event);
		}
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
	switchTabOnArrowPress(event) {
		// console.info('Tabs.switchTabOnArrowPress');
		const { target, keyCode: key } = event;

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
		this.tabs.map(tab => tab.deactivate());
	}

	/**
	 * Deactivate tab panels
	 *
	 * @retur void
	 */
	deactivateTabPanels() {
		this.tabPanels.map(tabPanel => tabPanel.deactivate());
	}

	/**
	 * Determine deletable
	 *
	 * Detect if a tab is deletable
	 *
	 * @param  {object} event
	 * @return {boolean}
	 */
	determineDeletable(event) {
		// console.info('Tabs.determineDeletable');

		const { target } = event;

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
			this.tabs[0].toggle();
		} else {
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
	focusEventHandler(event) {
		// console.info('Tabs.focusEventHandler');

		const { target } = event;

		setTimeout(() => {
			this.checkTabFocus(target);
		}, this.options.delay);
	}

	/**
	 * Check tab focus
	 *
	 * Only activate tab on focus if it still has focus after the delay
	 *
	 * @param  {object} target
	 * @return void
	 */
	checkTabFocus(target) {
		// console.info('Tabs.checkTabFocus');

		const focused = document.activeElement;

		if (target === focused) {
			this.tabs[target.index].toggle(false);
		}
	}
}
