// import getHighestHeight from 'Utils/getHighestHeight';
import getHash from 'Utils/getHash';
import keycode from 'src/keycode';
import direction from 'src/direction';

export default class Tabs {
	constructor(element) {
		this.$cont = element;

		this.$tablist = this.$cont.querySelector('[role="tablist"]');

		this.tabs = [];
		this.pannels = [];
		this.delay = this.determineDelay();

		this.generateArrays();

		this.href = getHash(window.location.href);
	}


	/**
	 * Generate arrays
	 *
	 * @return void
	 */
	generateArrays() {
		this.tabs = this.$tablist.querySelectorAll('[role="tab"]');
		this.panels = this.$cont.querySelectorAll('[role="tabpanel"]');
	}


	init() {
		// Bind listeners
		for (let i = 0; i < this.tabs.length; i += 1) {
			this.addListeners(i);
		}
	}

	/**
	 * Add listeners
	 *
	 * @param int index
	 */
	addListeners(index) {
		this.tabs[index].addEventListener('click', (event) => {
			this.clickEventListener(event);
		});
		this.tabs[index].addEventListener('keydown', (event) => {
			this.keydownEventListener(event);
		});
		this.tabs[index].addEventListener('keyup', (event) => {
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

		switch (key) {
			case keycode.END:
				event.preventDefault();

				// Activate last tab
				this.activateTab(this.tabs[this.tabs.length - 1]);
				break;

			case keycode.HOME:
				event.preventDefault();

				// Activate first tab
				this.activateTab(this.tabs[0]);
				break;

			// Up and down are in keydown because we need to prevent page scroll >:)
			case keycode.UP:
			case keycode.DOWN:
				this.determineOrientation(event);
				break;

			default:
				break;
		}
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

		switch (key) {
			case keycode.LEFT:
			case keycode.RIGHT:
				this.determineOrientation(event);
				break;

			case keycode.DELETE:
			case keycode.BACKSPACE:
				this.determineDeletable(event);
				break;
			default:
				break;
		}
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

		if (vertical && (key === keycode.UP || key === keycode.DOWN)) {
			event.preventDefault();
			proceed = true;
		} else if (key === keycode.LEFT || key === keycode.RIGHT) {
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

		for (let i = 0; i < this.tabs.length; i += 1) {
			this.tabs[i].addEventListener('focus', this.focusEventHandler);
		}

		if (direction[pressed]) {
			const { target } = event;

			if (target.index !== undefined) {
				if (this.tabs[target.index + direction[pressed]]) {
					this.tabs[target.index + direction[pressed]].focus();
				} else if (pressed === keycode.LEFT || pressed === keycode.UP) {
					this.focusLastTab();
				} else if (pressed === keycode.RIGHT || pressed === keycode.DOWN) {
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
		for (let i = 0; i < this.tabs.length; i += 1) {
			this.tabs[i].setAttribute('tabindex', '-1');
			this.tabs[i].setAttribute('aria-selected', 'false');
			this.tabs[i].removeEventListener('focus', this.focusEventHandler);
			this.tabs[i].classList.remove('is-active');
		}

		for (let i = 0; i < this.panels.length; i += 1) {
			this.panels[i].setAttribute('hidden', 'hidden');
			this.panels[i].classList.remove('is-active');
		}
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

		// If tab is not active
		if ('true' !== target.getAttribute('aria-selected')) return false;

		if (null !== target.getAttribute('data-deletable')) {
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

		return false;
	}


	/**
	 * Delete tab
	 *
	 * Deletes a tab and its panel
	 *
	 * @param  obj event
	 * @return {[type]}       [description]
	 */
	deleteTab(event) {
		const { target } = event;
		const panel = this.$cont.querySelector(`#${target.getAttribute('aria-controls')}`);

		target.parentElement.removeChild(target);
		panel.parentElement.removeChild(panel);
	}


	/**
	 * Determine delay
	 *
	 * Determine whether there should be a delay when user navigates with the
	 * arrow keys
	 *
	 * @return delay
	 */
	determineDelay() {
		const hasDelay = this.$tablist.hasAttribute('data-delay');
		this.delay = 0;

		if (hasDelay) {
			const delayValue = this.$tablist.getAttribute('data-delay');
			// If no value is specified, default to 300ms
			this.delay = delayValue || 300;
		}

		return this.delay;
	}

	/**
	 * Focus event handler
	 *
	 * @param  obj event
	 * @return void
	 */
	focusEventHandler(event) {
		const { target } = event;

		setTimeout(this.checkTabFocus, this.delay, target);
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
