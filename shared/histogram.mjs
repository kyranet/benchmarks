/**
 * @param {number} number
 */
function round(number) {
	return Math.round(number * 1_000) / 1_000;
}

/**
 * @param {number} nanoseconds
 */
export function displayUnit(nanoseconds) {
	if (nanoseconds < 1_000) return `${(nanoseconds).toFixed(3)}ns`;
	if (nanoseconds < 1_000_000) return `${(nanoseconds / 1_000).toFixed(3)}µs`;
	if (nanoseconds < 1_000_000_000) return `${(nanoseconds / 1_000_000).toFixed(3)}ms`;
	return `${(nanoseconds / 1_000_000_000).toFixed(3)}s`;
}

/**
 * @param {string} unit
 */
function padUnit(unit) {
	return unit.padStart(9, ' ');
}

/**
 * @param {import('node:perf_hooks').RecordableHistogram} histogram
 */
export function displayHistogram(histogram) {
	return `${padUnit(displayUnit(histogram.mean))} [${padUnit(displayUnit(histogram.min))}...${padUnit(displayUnit(histogram.max))}] ± ${padUnit(displayUnit(histogram.stddev))}`;
}

/**
 * @param {import('node:perf_hooks').RecordableHistogram} newHistogram
 * @param {import('node:perf_hooks').RecordableHistogram} oldHistogram
 */
export function displayHistogramDifference(newHistogram, oldHistogram) {
	return `${round((newHistogram.mean / oldHistogram.mean) * 100)}%`
}
