import getHash from 'Utils/getHash';
import direction from 'Utils/direction';

import {
	END,
	HOME,
	LEFT,
	UP,
	RIGHT,
	BACKSPACE,
	DOWN,
	DELETE,
} from '@19h47/keycode';

export default class Tabs {
	constructor(element) {
		this.$cont = element;

		this.$tablist = this.$cont.querySelector('[role="tablist"]');

		this.tabs = [];
		this.pannels = [];

		// Determine whether there should be a delay when user navigates with
		// the arrow keys, default is false
		this.delay = this.$tablist.getAttribute('data-delay') || false;

		this.generateArrays();

		this.href = getHash(window.location.href);
	}


	/**
	 * Generate arrays
	 *
	 * @return void
	 */
	generateArrays() {
		this.tabs = [...this.$tablist.querySelectorAll('[role="tab"]')];
		this.panels = [...this.$cont.querySelectorAll('[role="tabpanel"]')];
	}


	init() {
		// Bind listeners
		this.tabs.map((tab, index) => {
			if (tab.id === this.href) {
				this.activateTab(tab);
			}

			return this.addListeners(tab, index);
		});
	}


	/**
	 * Add listeners
	 *
	 * @param obj DOM object.
	 * @param int index
	 */
	addListeners(tab, index) {
		tab.addEventListener('click', (event) => {
			this.clickEventListener(event);
		});
		tab.addEventListener('keydown', (event) => {
			this.keydownEventListener(event);
		});
		tab.addEventListener('keyup', (event) => {
			this.keyupEventListener(event);
		});

		// Build an array with all tabs (<button>s) in it
		this.tabs[index].index = index;
	}


	/**
	 * Click event listener
	 *
	 * When a tab is clicked, activateTab is fired to activate it
	 *
	 * @param  obj event
	 * @return void
	 */
	clickEventListener(event) {
		const tab = event.target;

		this.activateTab(tab, false);
	}


	/**
	 * Keydown event listener
	 *
	 * Handle keydown on tabs
	 *
	 * @param  obj event
	 * @return void
	 */
	keydownEventListener(event) {
		const key = event.keyCode;

		const codes = {
			[END]: () => {
				event.preventDefault();
				this.activateTab(this.tabs[this.tabs.length - 1]);
			},
			[HOME]: () => {
				event.preventDefault();
				this.activateTab(this.tabs[0]);
			},
			[UP]: () => this.determineOrientation(event),
			[DOWN]: () => this.determineOrientation(event),
			default: () => false,
		};

		return (codes[key] || codes.default)();
	}


	/**
	 * Keyup event listener
	 *
	 * Handle keyup on tabs
	 *
	 * @param  obj event
	 * @return void
	 */
	keyupEventListener(event) {
		const key = event.keyCode;
		const { target } = event;
		const selected = JSON.parse(target.getAttribute('aria-selected'));

		const codes = {
			[LEFT]: () => this.determineOrientation(event),
			[RIGHT]: () => this.determineOrientation(event),
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
		const key = event.keyCode;
		const vertical = 'vertical' === this.$tablist.getAttribute('aria-orientation');
		let proceed = false;

		if (vertical && (key === UP || key === DOWN)) {
			event.preventDefault();
			proceed = true;
		} else if (key === LEFT || key === RIGHT) {
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
	 * @param  obj event
	 * @return void
	 */
	switchTabOnArrowPress(event) {
		const pressed = event.keyCode;

		if (this.delay) {
			this.tabs.map(tab => tab.addEventListener('focus', (e) => {
				this.focusEventHandler(e);
			}));
		}

		if (direction[pressed]) {
			const { target } = event;

			if (target.index !== undefined) {
				if (this.tabs[target.index + direction[pressed]]) {
					this.tabs[target.index + direction[pressed]].focus();
				} else if (pressed === LEFT || pressed === UP) {
					this.focusLastTab();
				} else if (pressed === RIGHT || pressed === DOWN) {
					this.focusFirstTab();
				}
			}
		}
	}


	/**
	 * Activate tab
	 *
	 * Activates any given tab panel
	 *
	 * @param  obj tab
	 * @param  bool setFocus
	 * @return void
	 */
	activateTab(tab, setFocus = true) {
		// Deactivate all other tabs
		this.deactivateTabs();

		// Remove tabindex attribute
		tab.removeAttribute('tabindex');

		// Set the tab as selected
		tab.setAttribute('aria-selected', 'true');

		// Get the value of aria-controls (which is an ID)
		const controls = tab.getAttribute('aria-controls');

		// Remove hidden attribute from tab panel to make it visible
		this.$cont.querySelector(`#${controls}`).removeAttribute('hidden');
		this.$cont.querySelector(`#${controls}`).classList.add('is-active');

		tab.classList.add('is-active');

		window.location.hash = tab.id;

		// Set focus when required
		if (setFocus) {
			tab.focus();
		}
	}


	/**
	 * Deactivate tabs
	 *
	 * Deactivate all tabs and tab panels
	 *
	 * @return void
	 */
	deactivateTabs() {
		this.tabs.map((tab) => {
			tab.setAttribute('tabindex', '-1');
			tab.setAttribute('aria-selected', 'false');
			tab.removeEventListener('focus', this.focusEventHandler);
			return tab.classList.remove('is-active');
		});

		this.panels.map((panel) => {
			panel.setAttribute('hidden', 'hidden');
			return panel.classList.remove('is-active');
		});
	}


	/**
	 * Focus first tab
	 *
	 * Make a guess
	 *
	 * @return
	 */
	focusFirstTab() {
		return this.tabs[0].focus();
	}


	/**
	 * Focus last tab
	 *
	 * Make a guess
	 *
	 * @return
	 */
	focusLastTab() {
		return this.tabs[this.tabs.length - 1].focus();
	}


	/**
	 * Determine deletable
	 *
	 * Detect if a tab is deletable
	 *
	 * @param  obj event
	 * @return bool
	 */
	determineDeletable(event) {
		const { target } = event;

		if (null === target.getAttribute('data-deletable')) {
			return false;
		}

		// Delete target tab
		this.deleteTab(event, target);

		// Update arrays related to tabs widget
		this.generateArrays();

		// Activate the closest tab to the one that was just deleted
		if (0 > target.index - 1) {
			this.activateTab(this.tabs[0]);
		} else {
			this.activateTab(this.tabs[target.index - 1]);
		}

		return true;
	}


	/**
	 * Delete tab
	 *
	 * Deletes a tab and its panel
	 *
	 * @param  obj event
	 * @return
	 */
	deleteTab(event) {
		const { target } = event;
		const panel = this.$cont.querySelector(`#${target.getAttribute('aria-controls')}`);

		target.parentElement.removeChild(target);
		panel.parentElement.removeChild(panel);
	}


	/**
	 * Focus event handler
	 *
	 * @param  obj event
	 * @return void
	 */
	focusEventHandler(event) {
		const { target } = event;

		setTimeout(() => {
			this.checkTabFocus(target);
		}, this.delay);
	}


	/**
	 * Check tab focus
	 *
	 * Only activate tab on focus if it still has focus after the delay
	 *
	 * @param  obj target
	 * @return void
	 */
	checkTabFocus(target) {
		const focused = document.activeElement;

		if (target === focused) {
			this.activateTab(target, false);
		}
	}
}
