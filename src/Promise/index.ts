'use strict';

// To Do: It may be useful to throw a module-specific RequestError for JSON parse errors (i.e. response.json(), JSON.stringify()). Otherwise, it might be difficult for users to distinguish between a JSON error and other errors.

// External Modules
import { fetch, Headers, Request, RequestInit, Response, URLSearchParams } from '@bluecewe/isomorphic-fetch';

// Internal Modules
import { Domain } from '../';
import
{
    RequestRawError,
	RequestJsonError
} from './Error';

// Types
import { Definition } from '../';

// Constants
const QUERY_BODY_METHODS =
[
    'GET',
    'HEAD'
];

export default async function <GenericJsonSuccess extends object> (definition: Definition)
{
	const domain: Domain = this instanceof Domain ? this : null;
    parseDefinition(definition);
    const headers = new Headers();
    const options: RequestInit =
    {
        method: definition.method,
        headers
    };
    handleAuth(definition, domain, headers);
    const type = handleType(definition, domain, headers);
    handleHeaders(definition, headers);
    const body = handleBody(definition, domain, type, options);
	const url = generateUrl({definition, domain, body});
	const request = new Request(url, options);
    const response = await fetch(request);
    if (!response.ok)
    {
        if (definition.jsonResponseError)
        {
            const json = await response.json();
            throw new RequestJsonError({json, response});
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

function handleAuth(definition: Definition, domain: Domain, headers: Headers)
{
    let auth: string;
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
    };
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

function handleHeaders(definition: Definition, headers: Headers)
{
    if (definition.headers)
    {
        const keys = Object.keys(definition.headers);
        for (let key of keys)
        {
            const value = definition.headers[key];
            headers.set(key, value);
        };
    };
};

function handleBody(definition: Definition, domain: Domain, type: Definition['type'], options: RequestInit)
{
    if (definition.body)
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
        if (!domain || !domain.queryBody)
        {
            options.body = body;
        };
        return body;
    };
};

function generateUrl({definition, domain, body}: {definition: Definition, domain: Domain, body: string | URLSearchParams})
{
    const path = domain && typeof domain.path === 'string' ? domain.path + definition.path : definition.path;
    const queryBodyEnabled = QUERY_BODY_METHODS.includes(definition.method) && domain && typeof domain.queryBody === 'string';
    const queryBodyString = queryBodyEnabled && typeof body === 'string' ? JSON.stringify(body) : body.toString();
    const query = queryBodyEnabled ? '?' + domain.queryBody + '=' + queryBodyString : '';
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

export class Result <GenericJsonSuccess extends object>
{
    public response: Response;
    public json?: GenericJsonSuccess;
    constructor({response, json}: {response: Response, json?: GenericJsonSuccess})
    {
        this.response = response;
        if (json)
        {
            this.json = json;
        };
    };
};