import { readdir } from 'node:fs/promises';
import { createHistogram, performance } from 'node:perf_hooks';
import process from 'node:process';
import { Option, program } from 'commander';
import { args } from './config.mjs';
import { displayHistogram, displayUnit } from './shared/histogram.mjs';
import { collect, displayMemoryDifference } from './shared/memory.mjs';
import { makeCallback } from './shared/utils.mjs';

const cli = program
	.name('benchmark')
	.version('0.0.1')
	.summary('A benchmarking tool for comparing two methods')
	.addOption(
		new Option('-t, --times <number>', 'The amount of times to run the suite')
			.default(1e4, '10k times')
			.argParser(Number),
	)
	.addOption(
		new Option('-r, --runs <number>', 'The amount of times to run callback').default(1, 'once').argParser(Number),
	)
	.parse();

/** @type {{times: number, runs: number}} */
const { times, runs } = cli.opts();

const results = [];

const eventsPath = new URL('tests/', import.meta.url);
const eventFiles = await readdir(eventsPath).then(files => files.filter(file => file.endsWith('.mjs')));

console.log(`Running suite with ${times.toLocaleString()} iterations with ${runs.toLocaleString()} run(s) each...`);

for (const file of eventFiles) {
	const fn = (await import(new URL(file, eventsPath).toString())).default;

	if (!fn) continue;

	const histogram = createHistogram();

	const callbackFunction = makeCallback(fn, args);

	let returnValue = callbackFunction();

	const code = performance.timerify(
		() => {
			for (let i = 0; i < runs; i++) callbackFunction();
		},
		{ histogram: histogram },
	);

	collect();
	const memoryStart = process.memoryUsage();
	const timeStart = performance.now();

	for (let n = 0; n < times; n++) code();

	const timeEnd = performance.now();
	const memoryEnd = process.memoryUsage();

	results.push({ histogram, returnValue, time: timeEnd - timeStart, memoryStart, memoryEnd, name: file });
}

results
	.sort((a, b) => a.time - b.time)
	.forEach(({ histogram, time, returnValue, memoryEnd, memoryStart, name }) => {
		console.log('Summary:');
		console.log(`- ${name}     :`, displayHistogram(histogram));
		console.log('  Took    :', displayUnit(time));
		console.log('  Returned:', returnValue);
		console.log(' ', displayMemoryDifference(memoryEnd, memoryStart));
	});

console.log();
console.log('- Version:', process.version);
