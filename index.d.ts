// External Modules
import { Response } from '@bluecewe/isomorphic-fetch';

// Module
declare module '@bluecewe/request'
{
    export type PromiseCallback = <GenericJsonSuccess extends object> (definition: Definition) => Promise<Result <GenericJsonSuccess>>;
	export const promise: PromiseCallback;
    // Domain
    export class Domain
    {
        public path: string;
        public type: Definition['type'];
        public auth: ConstructorParameters['auth'];
        constructor(parameters: ConstructorParameters);
        public promise: PromiseCallback;
    }
    export type AuthCallback = () => string;
    export interface ConstructorParameters
    {
        path?: string;
        type?: Definition['type'];
        auth?: Auth;
    }
    export type Auth = string | AuthCallback;
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
    body: DefinitionBody;
    jsonResponseError?: boolean;
    jsonResponseSuccess?: boolean;
}
export interface DefinitionHeaders
{
    [key: string]: any;
}
export interface DefinitionBody
{
    [key: string]: any;
}

// Result
export class Result <GenericJsonSuccess extends object>
{
    public response: Response;
    public json?: GenericJsonSuccess;
}