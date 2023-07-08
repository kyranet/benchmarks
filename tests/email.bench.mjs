import index from '#lib/email/index';
import split from '#lib/email/split';
import { bench, describe } from 'vitest';

describe('email', () => {
	bench('index', () => index('contact@skyra.pw'));
	bench('split', () => split('contact@skyra.pw'));
});
