'use strict';

// External Modules
import { Response } from '@chris-talman/isomorphic-fetch';

// Types
import { Definition, Json } from './';
export interface BaseConstructorParameters
{
	type: Type;
	message: string;
};
export type Type =
	'rawResponse'
	| 'jsonResponse'
	| 'unexpected'
;

export class RequestError extends Error
{
	public readonly type: Type;
	constructor(parameters: BaseConstructorParameters)
	{
		super(parameters.message);
	};
};

export class RequestJsonError <GenericJsonError extends Json> extends RequestError
{
	public readonly type: 'jsonResponse';
	public readonly json: GenericJsonError;
	public readonly definition: Definition;
	public readonly response: Response;
	constructor(parameters: {json: GenericJsonError, definition: Definition, response: Response})
	{
		const type = 'jsonResponse';
		const superParameters: BaseConstructorParameters =
		{
			type,
			message: 'Request responded with JSON error.'
		};
		super(superParameters);
		this.type = type;
		assignPropertiesFromParameters({target: this, parameters});
	};
};

export class RequestRawError extends RequestError
{
	public readonly type: 'rawResponse';
	public readonly definition: Definition;
	public readonly response: Response;
	constructor(parameters: {definition: Definition, response: Response})
	{
		const type = 'rawResponse';
		const superParameters: BaseConstructorParameters =
		{
			type,
			message: 'Request responded with error.'
		};
		super(superParameters);
		this.type = type;
		assignPropertiesFromParameters({target: this, parameters});
	};
};

/** Assigns parameters properties to target object. */
function assignPropertiesFromParameters ({target, parameters}: {target: object, parameters: object})
{
	const keys = Object.keys(parameters);
	for (let key of keys)
	{
		const value = parameters[key];
		target[key] = value;
	};
};