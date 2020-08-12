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
	logJsonResponseError?: boolean;
	tls?: DefinitionTls;
	queryBody?: string;
	debug?: DefinitionDebug;
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
export interface DefinitionDebug
{
	request?: boolean;
	response?: boolean;
};
export type Json = object | boolean | number | string | null;

// Exports
export { request, Result } from './Request';
export { Domain } from './Domain';
export { guaranteeResultJson } from './GuaranteeJson';
export * from './Error';