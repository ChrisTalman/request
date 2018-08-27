'use strict';

// Internal Modules
import promise from './Promise';

// Types
import { Definition } from './';
export type AuthCallback = () => string;
export interface ConstructorParameters
{
    path?: string;
    type?: Definition['type'];
    auth?: Auth;
	/** @see Domain.queryBody */
    queryBody?: string;
};
export type Auth = string | AuthCallback;

export default class Domain
{
    public path: string;
    public type: Definition['type'];
    public auth: ConstructorParameters['auth'];
	/** If provided, in cases of GET and HEAD requests, inserts the request body into the query string using the given string as the parameter name. Otherwise, normally, the request body would be inserted into the request as a standard body. */
	public queryBody: ConstructorParameters['queryBody'];
    constructor(parameters: ConstructorParameters)
    {
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
    public promise = promise;
};