class SoftPrivateClass {
	// _value;

	/**
	 * @param {string} value
	 */
	constructor(value) {
		this._value = value;
	}

	get value() {
		return this._value;
	}
}

export function newMethod() {
	return new SoftPrivateClass('old').value;
}
