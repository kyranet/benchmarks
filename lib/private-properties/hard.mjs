class HardPrivateClass {
	#value;

	/**
	 * @param {string} value
	 */
	constructor(value) {
		this.#value = value;
	}

	get value() {
		return this.#value;
	}
}

export default function () {
	return new HardPrivateClass('hard').value;
}
