/**
 * @param {number[]} array
 */
export default function (array) {
	let highest = 0;
	for (let index = 0; index < array.length; index++) {
		if (array[index] > highest) highest = array[index];
	}

	return highest;
}
