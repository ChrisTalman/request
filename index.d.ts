// External Modules
import { Response } from '@ChrisTalman/isomorphic-fetch';

// Module
declare module '@ChrisTalman/request'
{
	// Request
	export type RequestFunction = <GenericJsonSuccess> (definition: Definition) => Promise<Result <GenericJsonSuccess>>;
	export const request: RequestFunction;
	// Domain
	export class Domain
	{
		public path: string;
		public type: Definition['type'];
		public auth: ConstructorParameters['auth'];
		/**
			If provided, guarantees a query string parameter containing the body as stringified JSON, for GET and HEAD requests. The given string is used as the parameter name.
			If unprovided, the request body will be the standard request body, and will throw an exception for GET and HEAD requests.
		*/
		public queryBody: ConstructorParameters['queryBody'];
		public tls: ConstructorParameters['tls'];
		public request: RequestFunction;
		public headers?: DefinitionHeaders;
		constructor(parameters: ConstructorParameters);
	}
	export interface ConstructorParameters
	{
		path?: string;
		type?: Definition['type'];
		auth?: Auth;
		/** @see Domain.queryBody */
		queryBody?: string;
		tls?: Definition['tls'];
		headers?: DefinitionHeaders;
	}
	export type Auth = string | AuthCallback;
	/**
		string: token value for Authorization header
		false: Authorization header will not be sent
	*/
	export type AuthCallback = () => string | false;
	// Request Error
	export type RequestErrorType =
		'rawResponse'
		| 'jsonResponse'
		| 'unexpected'
	;
	export class RequestError extends Error
	{
		public readonly type: RequestErrorType;
	}
	export class RequestJsonError <GenericJsonError extends object> extends RequestError
	{
		public readonly type: 'jsonResponse';
		public readonly json: GenericJsonError;
		public readonly response: Response;
	}
	export class RequestRawError extends RequestError
	{
		public readonly type: 'rawResponse';
		public readonly response: Response;
	}
}

// Definition
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
	/** @see Domain.queryBody */
	queryBody?: string;
}
export interface DefinitionHeaders
{
	[key: string]: string | false;
}
export interface DefinitionBody
{
	[key: string]: any;
}
export interface DefinitionTls
{
	/** Path to public key file. */
	cert: string;
	/** Path to private key file. */
	key: string;
	/** Disallow certificates which are not secured by a certificate authority. Default: true. */
	rejectUnauthorized?: boolean;
}

// Result
export class Result <GenericJsonSuccess>
{
	public response: Response;
	public json?: GenericJsonSuccess;
}