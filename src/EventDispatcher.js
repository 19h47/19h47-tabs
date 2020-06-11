export default class EventDispatcher {
	constructor(events) {
		this.listeners = new Map();
		this.events = events;
	}

	/**
	 * Registers listener function to be executed once event occurs.
	 *
	 * @param {string} eventName Name of the event to listen for.
	 * @param {function} handler Handler to be executed once event occurs.
	 */
	on(eventName, handler) {
		let handlers = this.listeners.get(eventName);

		if (!handlers) {
			handlers = new Set();
			this.listeners.set(eventName, handlers);
		}

		// Set.add ignores handler if it has been already registered.
		handlers.add(handler);
	}

	/**
	 * Registers listener function to be executed only first time when event occurs.
	 *
	 * @param {string} eventName Name of the event to listen for.
	 * @param {function} handler Handler to be executed once event occurs.
	 */
	once(eventName, handler) {
		const once = parameters => {
			this.off(eventName, once);

			handler.call(this, parameters);
		};

		this.on(eventName, once);
	}

	/**
	 * Removes registered listener for the specified event.
	 *
	 * @param {string} eventName Name of the event to remove listener for.
	 * @param {function} handler Handler to remove, so it won't be executed next time event occurs.
	 */
	off(eventName, handler) {
		const handlers = this.listeners.get(eventName);

		if (!handlers) {
			return;
		}

		handlers.delete(handler);

		if (!handlers.size) {
			this.listeners.delete(eventName);
		}
	}

	/**
	 * Removes all registered listeners for the specified event.
	 *
	 * @param {string=} eventName Name of the event to remove all listeners for.
	 */
	offAll(eventName) {
		if ('undefined' === typeof eventName) {
			return this.listeners.clear();
		}

		const handlers = this.listeners.get(eventName);

		if (!handlers) {
			return false;
		}

		handlers.clear();

		return this.listeners.delete(eventName);
	}

	/**
	 * Checks if there are any listeners that listen for the specified event.
	 *
	 * @param {string} eventName Name of the event to check listeners for.
	 * @returns {boolean}
	 */
	hasListeners(eventName) {
		return this.listeners.has(eventName);
	}

	/**
	 * Emits specified event so that all registered handlers will be called
	 * with the specified parameters.
	 *
	 * @param {string} eventName Name of the event to call handlers for.
	 * @param {Object=} parameters Optional parameters that will be passed to every registered
	 * handler.
	 */
	emit(eventName, parameters) {
		const handlers = this.listeners.get(eventName);

		if (!handlers) {
			return;
		}

		handlers.forEach(handler => handler.call(this, parameters));
	}
}
