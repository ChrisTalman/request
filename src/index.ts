'use strict';

// Types
export interface Definition
{
	path: string;
	method: string;
	type?: 'application/json' | 'application/x-www-form-urlencoded';
	auth?: string;
	headers?: DefinitionHeaders;
	body?: DefinitionBody;
	jsonResponseError?: boolean;
	jsonResponseSuccess?: boolean;
	tls?: DefinitionTls;
	queryBody?: string;
};
export interface DefinitionHeaders
{
	[key: string]: string | false;
};
export interface DefinitionBody
{
	[key: string]: any;
};
export interface DefinitionTls
{
	/** Path to public key file. */
	cert: string;
	/** Path to private key file. */
	key: string;
	/** Disallow certificates which are not secured by a certificate authority. Default: true. */
	rejectUnauthorized?: boolean;
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