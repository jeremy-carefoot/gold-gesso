import type { UseFetchOptions } from 'nuxt/app'

export type SyncApiOptions = {
    onUpdate?: () => void
};

export const useSyncAPI = <T>(
    url: string,
    options?: UseFetchOptions<T> & SyncApiOptions,
) => {
    const { $api } = useNuxtApp();

    // Data from DB
    const cachedFetch = useAPI<T>(`${url}/cached/`, options);

    // Request to sync with external API and refresh cached data (client side only)
    onMounted(() => {
        $api(`${url}/update/`, {
            onResponse({ response }) {
                if (response.status !== 200) {
                    console.error(`Could not sync cached data: ${url}`);
                    return;
                }

                cachedFetch.refresh();

                if (options?.onUpdate) {
                    options.onUpdate();
                }
            }
        });
    });

    return cachedFetch;
};