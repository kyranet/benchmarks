/**
 *
 * @param {Function} fn The function to run
 * @param {any[]} args The arguments to pass
 * @returns
 */
export function makeCallback(fn, args) {
	if (args.length === 0) return fn;
	if (args.length === 1) return () => fn(args[0]);
	if (args.length === 2) return () => fn(args[0], args[1]);
	if (args.length === 3) return () => fn(args[0], args[1], args[2]);
	if (args.length === 4) return () => fn(args[0], args[1], args[2], args[3]);
	return () => fn(...args);
}
