# Benchmark Suites

This is a personal repository I use to benchmark various things and archive old code so it can be re-run in the future.

To add a new test, simply add a new directory in the `tests` directory containing two files, `code.old.mjs` and `code.new.mjs`. You can run it using the name of the directory, for example `tests/email/code.{old,new}.mjs` can be run with `yarn start email` or `node --expose-gc . email`.
