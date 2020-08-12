'use strict';

// Internal Modules
import { Domain } from './Domain';

// Types
import { Definition } from './';
export type Category = 'request' | 'response';

export function debug({message, category, definition, domain}: {message: Array <any>, category: Category, definition: Definition, domain: Domain})
{
	const debug = domain.debug ?? definition.debug;
	if
	(
		(category === 'request' && debug?.request !== true)
		||
		(category === 'response' && debug?.response !== true)
	)
	{
		return;
	};
	console.log('[Request] [Debug]:', ... message);
};