class SoftDefinePrivateClass {
	_value;

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

export default function () {
	return new SoftDefinePrivateClass('old').value;
}
