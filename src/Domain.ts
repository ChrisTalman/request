'use strict';

// Internal Modules
import { request } from './Request';

// Types
import { Definition } from './';
export interface ConstructorParameters
{
	path?: string;
	type?: Definition['type'];
	auth?: Auth;
	/** @see Domain.queryBody */
	queryBody?: string;
	tls?: Definition['tls'];
	headers?: Definition['headers'];
	debug?: Definition['debug'];
};
export type Auth = string | false | AuthCallback;
export type AuthCallback = () => string | false;

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
	public headers: ConstructorParameters['headers'];
	public debug?: ConstructorParameters['debug'];
	constructor(parameters: ConstructorParameters)
	{
		if ('queryBody' in parameters && parameters.queryBody.length === 0)
		{
			throw new RequestDomainQueryBodyLengthError();
		};
		this.initialiseProperties(parameters);
	};
	private initialiseProperties(parameters: ConstructorParameters)
	{
		const keys = Object.keys(parameters);
		for (let key of keys)
		{
			const value = parameters[key];
			this[key] = value;
		};
	};
	public request = request;
};

export class RequestDomainQueryBodyLengthError extends Error
{
	constructor()
	{
		super('\'queryBody\' parameter must be string of length greater than zero, or undeclared.');
	};
};