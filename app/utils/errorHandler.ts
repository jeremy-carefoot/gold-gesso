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

export const getFieldErrors = (errorData: unknown): Record<string, string> => {
    if (
        errorData
        && typeof errorData === 'object' 
        && !Array.isArray(errorData)
    ) {
        return Object.entries(errorData).reduce((acc, [key, value]) => {
            if (Array.isArray(value)) {
                acc[key] = value.join(', ');
            } else if (typeof value === 'string') {
                acc[key] = value;
            }
            return acc;
        }, {} as Record<string, string>);
    }
  
    return {};
  };