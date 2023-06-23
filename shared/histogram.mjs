/**
 * @param {number} nanoseconds
 */
export function displayUnit(nanoseconds) {
	if (nanoseconds < 1_000) return `${nanoseconds.toFixed(3)}ns`;
	if (nanoseconds < 1_000_000) return `${(nanoseconds / 1_000).toFixed(3)}µs`;
	if (nanoseconds < 1_000_000_000) return `${(nanoseconds / 1_000_000).toFixed(3)}ms`;
	return `${(nanoseconds / 1_000_000_000).toFixed(3)}s`;
}

/**
 * @param {string} unit
 */
function padUnit(unit) {
	return unit.padEnd(9, ' ');
}

/**
 * @param {import('node:perf_hooks').RecordableHistogram} histogram
 */
export function displayHistogram(histogram) {
	return `Mean: ${padUnit(displayUnit(histogram.mean))} [Min: ${padUnit(displayUnit(histogram.min))} Max: ${padUnit(
		displayUnit(histogram.max),
	)}] ± ${padUnit(displayUnit(histogram.stddev))}`;
}
