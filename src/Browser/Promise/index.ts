'use strict';

// Internal Modules
import { Domain } from '../';
import
{
    throwUnexpected,
    throwJsonResponseError,
    throwRawResponseError
} from './Error';

// Types
import { Definition } from '../';

export default async function <GenericJsonSuccess extends object, GenericJsonError extends object> (definition: Definition)
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
    handleBody(definition, type, options);
	let request: Request;
    try
    {
        request = new Request(definition.path, options);
    }
    catch (error)
    {
        throwUnexpected(error);
        return;
    };
    let response: Response;
    try
    {
        response = await fetch(request);
    }
    catch (error)
    {
        throwUnexpected(error);
        return;
    };
    if (!response.ok)
    {
        if (definition.jsonResponseError)
        {
            let json: GenericJsonError;
            try
            {
                json = await response.json();
            }
            catch (error)
            {
                throwUnexpected(error);
                return;
            };
            throwJsonResponseError(json);
        }
        else
        {
            throwRawResponseError(response);
        };
        return;
    };
    if (definition.jsonResponseSuccess)
    {
        let json: GenericJsonSuccess;
        try
        {
            json = await response.json();
        }
        catch (error)
        {
            throwUnexpected(error);
            return;
        };
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

function handleBody(definition: Definition, type: Definition['type'], options: RequestInit)
{
    if (definition.body)
    {
        if (type === 'application/json')
        {
            let json: string;
            try
            {
                json = JSON.stringify(definition.body);
            }
            catch (error)
            {
                throwUnexpected(error);
                return;
            };
            options.body = json;
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
            options.body = form;
        };
    };
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