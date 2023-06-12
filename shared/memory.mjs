/**
 * @param {number} bytes
 */
export function displayBytes(bytes) {
	
	let output = bytes;
	
	if (output < 1024) return `${output} B`;

	output /= 1024;
	if (output < 1024) return `${bytes.toFixed(3)} KB`;

	output /= 1024;
	if (bytes < 1024) return `${bytes.toFixed(3)} MB`;

	output /= 1024;
	return `${bytes.toFixed(3)} GB`;
}

/**
 * @param {number} bytes
 */
export function displayBytesDifference(bytes) {
	if (bytes < 0) return `-${displayBytes(-bytes)}`;
	if (bytes > 0) return `+${displayBytes(bytes)}`;
	return `=`;
}

/**
 * @param {NodeJS.MemoryUsage} memory
 */
export function displayMemory(memory) {
	return [
		`Array Buffers : ${displayBytes(memory.arrayBuffers)}`,
		`External      : ${displayBytes(memory.external)}`,
		`Heap Total    : ${displayBytes(memory.heapTotal)}`,
		`Heap Used     : ${displayBytes(memory.heapUsed)}`,
		`RSS           : ${displayBytes(memory.rss)}`,
	].join('\n');
}

/**
 * @param {string} unit
 */
function padUnit(unit) {
	return unit.padStart(11, ' ');
}

/**
 * @param {NodeJS.MemoryUsage} current
 * @param {NodeJS.MemoryUsage} previous
 */
export function displayMemoryDifference(current, previous) {
	return `Heap [Total: ${padUnit(displayBytesDifference(current.heapTotal - previous.heapTotal))} | Used: ${padUnit(
		displayBytesDifference(current.heapUsed - previous.heapUsed),
	)}]`;
}

export function collect() {
	if (typeof global.gc === 'function') global.gc();
	else throw new ReferenceError('global.gc is not available');
}
