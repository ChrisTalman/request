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
    queryBody?: boolean;
};
export type Auth = string | AuthCallback;

export default class Domain
{
    public path: string;
    public type: Definition['type'];
    public auth: ConstructorParameters['auth'];
    /** Place body into query string, instead of body itself, for GET and HEAD method requests. */
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