// Module
declare module '@bluecewe/request'
{
	export const promise: PromiseCallback;
    export const Domain: Domain;
}

// Promise
export type PromiseCallback = <GenericJsonSuccess extends object, GenericJsonError extends object> (definition: Definition) => Result <GenericJsonSuccess>;

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

// Domain
export type AuthCallback = () => string;
export interface ConstructorParameters
{
    path?: string;
    type?: Definition['type'];
    auth?: Auth;
}
export type Auth = string | AuthCallback;
export default class Domain
{
    public path: string;
    public type: Definition['type'];
    public auth: ConstructorParameters['auth'];
    constructor(parameters: ConstructorParameters);
    public promise: PromiseCallback;
}