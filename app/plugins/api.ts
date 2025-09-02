export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const baseURL = config.public.apiBase as string | undefined;

    if (!baseURL) {
        console.error('Error: Base API url not provided');
        return {};
    }

    const api = $fetch.create({
        baseURL,
        onRequest({ request, options, error }) {
            // Add any custom on request events here
        },
        onResponse({ response }) {
            // Add any custom on response events here (could be debugging)
        },
        async onResponseError({ response }) {
            // Add api error handling here
        }
    })

    return {
        provide: {
            api
        }
    }
});