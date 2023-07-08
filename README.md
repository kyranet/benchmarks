# Benchmark Suites

This is a personal repository I use to benchmark various things and archive old code so it can be re-run in the future.

To add a new test, simply add a new file in the `tests` directory following [`vitest`'s benchmark reference](https://vitest.dev/api/#bench). You can run it using the name of the directory, for example `tests/email.bench.mjs` can be run with `yarn bench email` or `yarn vitest bench --run email`.
