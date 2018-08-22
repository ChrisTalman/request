// Module
declare module '@bluecewe/request'
{
    export type PromiseCallback = <GenericJsonSuccess extends object, GenericJsonError extends object> (definition: Definition) => Promise<Result <GenericJsonSuccess>>;
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
	export class RequestError <GenericJsonError extends object> extends Error
	{
		public definition: ErrorDefinition.Variant <GenericJsonError>;
	}
    export namespace ErrorDefinition
    {
        export type Variant <GenericJsonError extends object> =
            Variants.Unexpected
            | Variants.RawResponse
            | Variants.JsonResponse <GenericJsonError>;
        export namespace Variants
        {
            export interface RawResponse
            {
                type: 'rawResponse';
                response: Response;
            }
            export interface JsonResponse <GenericJsonError extends object>
            {
                type: 'jsonResponse';
                json: GenericJsonError;
            }
            export interface Unexpected
            {
                type: 'unexpected';
                error: Error;
            }
        }
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