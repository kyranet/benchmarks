import { Option, program } from 'commander';
import { createHistogram, performance } from 'node:perf_hooks';
import { makeCallback } from './shared/utils.mjs';
import { displayHistogram, displayHistogramDifference, displayUnit } from './shared/histogram.mjs';
import { collect, displayMemoryDifference } from './shared/memory.mjs';

const cli = program
	.name('benchmark')
	.version('0.0.1')
	.summary('A benchmarking tool for comparing two methods')
	.argument('<name>', 'The name of the directory to run')
	.argument('[args...]', 'The arguments to pass to the method')
	.addOption(
		new Option('-t, --times <number>', 'The amount of times to run the suite')
			.default(1e4, '10k times')
			.argParser(Number),
	)
	.addOption(
		new Option('-r, --runs <number>', 'The amount of times to run callback').default(1, 'once').argParser(Number),
	)
	.parse();

const [name, ...args] = cli.args;

/** @type {{times: number, runs: number}} */
const { times, runs } = cli.opts();

const { newMethod } = await import(`./tests/${name}/code.new.mjs`);
const { oldMethod } = await import(`./tests/${name}/code.old.mjs`);

console.log(`Running suite with ${times.toLocaleString()} iterations with ${runs.toLocaleString()} run(s) each...`);

const oldHistogram = createHistogram();
const newHistogram = createHistogram();

const newCallback = makeCallback(newMethod, args);
const oldCallback = makeCallback(oldMethod, args);

let oldReturn;
let newReturn;

const oldCode = performance.timerify(
	() => {
		for (let i = 0; i < runs; i++) oldReturn = oldCallback();
	},
	{ histogram: oldHistogram },
);

const newCode = performance.timerify(
	() => {
		for (let i = 0; i < runs; i++) newReturn = newCallback();
	},
	{ histogram: newHistogram },
);

collect();
const oldMemoryStart = process.memoryUsage();
const oldTimeStart = performance.now();
for (let n = 0; n < times; n++) oldCode();
const oldTimeEnd = performance.now();
const oldMemoryEnd = process.memoryUsage();

collect();
const newMemoryStart = process.memoryUsage();
const newTimeStart = performance.now();
for (let n = 0; n < times; n++) newCode();
const newTimeEnd = performance.now();
const newMemoryEnd = process.memoryUsage();

console.log('Summary:');
console.log('- Old     :', displayHistogram(oldHistogram));
console.log('  Took    :', displayUnit(oldTimeEnd - oldTimeStart));
console.log('  Returned:', oldReturn);
console.log(' ', displayMemoryDifference(oldMemoryEnd, oldMemoryStart));

console.log('- New     :', displayHistogram(newHistogram));
console.log(' ', displayMemoryDifference(newMemoryEnd, newMemoryStart));
console.log('  Took    :', displayUnit(newTimeEnd - newTimeStart));
console.log('  Returned:', newReturn);

console.log();
console.log('- Difference:', displayHistogramDifference(newHistogram, oldHistogram));
console.log('- Version:', process.version);
