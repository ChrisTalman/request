'use strict';

// Types
export interface Definition
{
    path: string;
    method: string;
	type?: 'application/json' | 'application/x-www-form-urlencoded';
    auth?: string;
	headers?: DefinitionHeaders;
    body: DefinitionBody;
    jsonResponseError?: boolean;
    jsonResponseSuccess?: boolean;
};
export interface DefinitionHeaders
{
    [key: string]: any;
};
export interface DefinitionBody
{
    [key: string]: any;
};

// Promise
import promise from './Promise';
export { promise };

// Result
import { Result } from './Promise';
export { Result };

// Errors
export * from './Promise/Error';

// Domain
import Domain from './Domain';
export { Domain };