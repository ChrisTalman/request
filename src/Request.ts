'use strict';

// To Do: It may be useful to throw a module-specific RequestError for JSON parse errors (i.e. response.json(), JSON.stringify()). Otherwise, it might be difficult for users to distinguish between a JSON error and other errors.

// External Modules
import { fetch, Headers, Request, RequestInit, Response, URLSearchParams } from '@chris-talman/isomorphic-fetch';

// Internal Modules
import { Domain } from './Domain';
import { RequestRawError, RequestJsonError } from './Error';
import { debug } from './Debug';

// Types
import { Definition, Json } from './';

// Constants
const QUERY_BODY_METHODS =
[
	'GET',
	'HEAD'
];

export async function request <GenericJsonSuccess extends Json> (definition: Definition)
{
	const domain: Domain = this instanceof Domain ? this : null;
	parseDefinition(definition);
	const headers = new Headers();
	const options: RequestInit =
	{
		method: definition.method,
		headers
	};
	handleTls({definition, domain, options});
	handleAuth(definition, domain, headers);
	const type = handleType(definition, domain, headers);
	handleHeaders(definition, domain, headers);
	const body = handleBody(definition, domain, type, options);
	const url = generateUrl({definition, domain, body});
	const request = new Request(url, options);
	debug({message: ['URL:', url], category: 'request', definition, domain});
	debug({message: ['Options:', options], category: 'request', definition, domain});
	debug({message: ['Request:', request], category: 'request', definition, domain});
	const response = await fetch(request);
	debug({message: ['Response:', response], category: 'response', definition, domain});
	if (!response.ok)
	{
		if (definition.jsonResponseError)
		{
			const json = await response.json();
			const error = new RequestJsonError({json, response});
			if (definition.logJsonResponseError)
			{
				console.error(error);
			};
			throw error;
		}
		else
		{
			throw new RequestRawError({response});
		};
		return;
	};
	if (definition.jsonResponseSuccess)
	{
		const json: GenericJsonSuccess = await response.json();
		const result = new Result <GenericJsonSuccess> ({response, json});
		return result;
	};
	const result = new Result <GenericJsonSuccess> ({response});
	return result;
};

function handleTls({definition, domain, options}: {definition: Definition, domain: Domain, options: RequestInit})
{
	const tls = definition.tls || (domain && domain.tls);
	if (!tls) return;
	const tlsKeys = Object.keys(tls);
	for (let key of tlsKeys)
	{
		if (key === 'rejectUnauthorized') continue;
		options[key] = tls[key];
	};
	const { rejectUnauthorized } = tls;
	if (rejectUnauthorized === false)
	{
		let https: any;
		try
		{
			https = require('https');
		}
		catch (error)
		{
			// Catch and suppress require() missing in browser.
			return;
		};
		const { Agent } = https;
		const agent = new Agent({rejectUnauthorized: false});
		options.agent = agent;
	};
};

function handleAuth(definition: Definition, domain: Domain, headers: Headers)
{
	let auth: string | false;
	if (definition.auth)
	{
		auth = definition.auth;
	}
	else if (domain && domain.auth)
	{
		if (typeof domain.auth === 'string')
		{
			auth = domain.auth;
		}
		else
		{
			auth = domain.auth(); // Consideration: It might be useful to encapsulate this callback in a try catch block, to handle user errors smoothly.
		};
	}
	else
	{
		return;
	};
	if (auth === false) return;
	headers.set('Authorization', auth);
};

function handleType(definition: Definition, domain: Domain, headers: Headers)
{
	let type: Definition['type'];
	if (definition.type)
	{
		type = definition.type;
	}
	else if (domain && domain.type)
	{
		type = domain.type;
	};
	headers.set('Content-Type', type);
	return type;
};

function handleHeaders(definition: Definition, domain: Domain, headers: Headers)
{
	if (domain && domain.headers)
	{
		const keys = Object.keys(domain.headers);
		for (let key of keys)
		{
			const value = domain.headers[key];
			if (value !== false)
			{
				headers.set(key, value);
			};
		};
	};
	if (definition.headers)
	{
		const keys = Object.keys(definition.headers);
		for (let key of keys)
		{
			const value = definition.headers[key];
			if (value !== false)
			{
				headers.set(key, value);
			};
		};
	};
};

function handleBody(definition: Definition, domain: Domain, type: Definition['type'], options: RequestInit)
{
	if ('body' in definition)
	{
		let body: string | URLSearchParams;
		if (type === 'application/json')
		{
			const json = JSON.stringify(definition.body);
			body = json;
		}
		else if (type === 'application/x-www-form-urlencoded')
		{
			const form = new URLSearchParams();
			const keys = Object.keys(definition.body);
			for (let key of keys)
			{
				const value = definition.body[key];
				form.set(key, value);
			};
			body = form;
		};
		const definitionQueryBody = definition.queryBody;
		const domainQueryBody = domain && domain.queryBody;
		const isBodyMethod = (!definitionQueryBody && !domainQueryBody) || !QUERY_BODY_METHODS.includes(definition.method);
		if (isBodyMethod)
		{
			options.body = body;
		};
		return body;
	};
};

function generateUrl({definition, domain, body}: {definition: Definition, domain: Domain, body: string | URLSearchParams})
{
	const path = domain && typeof domain.path === 'string' ? domain.path + definition.path : definition.path;
	const queryBodyName = definition.queryBody || (domain && domain.queryBody);
	const queryBodyEnabled = typeof queryBodyName === 'string';
	let queryBodyString: string;
	if ('body' in definition && QUERY_BODY_METHODS.includes(definition.method) && queryBodyEnabled)
	{
		if (typeof body === 'string')
		{
			queryBodyString = queryBodyName + '=' + encodeURIComponent(body);
		}
		else
		{
			queryBodyString = body.toString();
		};
	};
	const query = typeof queryBodyString === 'string' ? '?' + queryBodyString : '';
	const url = path + query;
	return url;
};

function parseDefinition(definition: Definition)
{
	if (typeof definition.type !== 'string')
	{
		definition.type = 'application/json';
	};
};

export class Result <GenericJsonSuccess extends Json>
{
	public response: Response;
	public json?: GenericJsonSuccess;
	constructor({response, json}: {response: Response, json?: GenericJsonSuccess})
	{
		this.response = response;
		if (typeof json !== undefined) this.json = json;
	};
};