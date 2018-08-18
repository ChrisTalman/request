declare module '@bluecewe/request/browser'
{
	export function promise <GenericJsonSuccess extends object, GenericJsonError extends object> (definition: Definition): Result <GenericJsonSuccess>;
}

declare module '@bluecewe/request/node'
{
	export default function(): boolean;
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