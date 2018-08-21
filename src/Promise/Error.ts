'use strict';

// External Modules
import { Response } from '@bluecewe/isomorphic-fetch';

// Types
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
        };
        export interface JsonResponse <GenericJsonError extends object>
        {
            type: 'jsonResponse';
            json: GenericJsonError;
        };
        export interface Unexpected
        {
            type: 'unexpected';
            error: Error;
        };
    };
};

export function throwJsonResponseError <GenericJsonError extends object> (json: GenericJsonError)
{
    throw new RequestError <GenericJsonError> ({type: 'jsonResponse', json});
};

export function throwRawResponseError(response: Response)
{
    throw new RequestError({type: 'rawResponse', response});
};

export function throwUnexpected(error: Error)
{
    throw new RequestError({type: 'unexpected', error});
};

export class RequestError <GenericJsonError extends object> extends Error
{
    public definition: ErrorDefinition.Variant <GenericJsonError>;
    constructor(definition: ErrorDefinition.Variant <GenericJsonError>)
    {
		super('Failed.');
        this.definition = definition;
    };
};