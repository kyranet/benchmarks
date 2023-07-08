import hard from '#lib/private-properties/hard';
import softDeclare from '#lib/private-properties/soft-declare';
import softDefine from '#lib/private-properties/soft-define';
import { bench, describe } from 'vitest';

describe('private-properties', () => {
	bench('hard private', () => hard());
	bench('soft private (declare)', () => softDeclare());
	bench('soft private (define)', () => softDefine());
});
