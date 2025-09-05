export default defineNuxtPlugin((nuxtApp) => {
    const isDev = import.meta.dev;
    const config = useRuntimeConfig();

    const baseURLConf = config.public.apiBase as string | undefined;
    const baseURL = (isDev || !baseURLConf) ? '' : baseURLConf;

    const csrfToken = useCookie('csrftoken');
    const { token: authToken } = useAuth();

    const api = $fetch.create({
        baseURL,
        async onRequest({ options }) {
            const authHeaders: Record<string, string> = {};

            if (authToken.value) {
                authHeaders['Authorization'] = authToken.value;
            } if (csrfToken.value) {
                authHeaders['X-CSRFToken'] = csrfToken.value;
            }

            options.headers = {
                ...options.headers,
                ...authHeaders
            }
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