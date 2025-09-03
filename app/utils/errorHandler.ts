import { FetchError } from 'ofetch';
import { BaseFetchErrorMap, type ErrorMap } from '~/constants/errorMaps';

const DefaultErrorMessage = "Something went wrong...";

export const errorMessage = (
    error: unknown,
    httpErrorMap?: ErrorMap
) => {
    if (error instanceof FetchError) {
        const combinedMap = { ...BaseFetchErrorMap, ...httpErrorMap };
        const matchedMessage = combinedMap[error.statusCode ?? 0];
        return matchedMessage ?? DefaultErrorMessage;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return DefaultErrorMessage;
};