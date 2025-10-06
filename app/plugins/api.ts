export default defineNuxtPlugin((nuxtApp) => {
    const csrfToken = useCookie('csrftoken');
    const { token: authToken } = useAuth();

    const api = $fetch.create({
        async onRequest({ request, options }) { 
            const authHeaders: Record<string, string> = {};

            if (authToken.value) {
                authHeaders['Authorization'] = authToken.value;
            } if (csrfToken.value) {
                authHeaders['X-CSRFToken'] = csrfToken.value;
            }

            options.headers = {
                ...options.headers,
                ...authHeaders
            };
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