export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const baseURLConf = config.public.apiBase as string | undefined;
    const isDev = import.meta.dev;

    const baseURL = (isDev || !baseURLConf) ? '' : baseURLConf;

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