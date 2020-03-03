'use strict';

// External Modules
import { Result } from './Request';

/** If `result.json` is *not* `undefined`, returns it, otherwise throws error. */
export function guaranteeResultJson <GenericJson extends object> (result: Result <GenericJson>)
{
	if (result.json === undefined) throw new Error(`Expected 'result.json' to not be 'undefined', but got 'undefined'`);
	const { json } = result;
	return json;
};