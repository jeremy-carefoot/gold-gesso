import type { UseFetchOptions } from 'nuxt/app'

export const useSyncAPI = <T>(
    url: string,
    options?: UseFetchOptions<T>,
) => {
    const { $api } = useNuxtApp();

    // Data from DB
    const cachedFetch = useAPI<T>(`${url}/cached`, options);

    // Request to sync with external API and refresh cached data
    $api(`${url}/update`, {
        onResponse({ response }) {
            if (response.status !== 200) {
                console.error(`Could not sync cached data: ${url}`);
                return;
            }

            cachedFetch.refresh();
        }
    });

    return cachedFetch;
};