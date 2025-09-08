<template>
    <UDropdownMenu
        :items="items"
    >
        <div class="account-icon-container">
            <UIcon
                name="i-heroicons-user-circle"
                class="account-icon"
            />
        </div>

        <template #account="{ item }: { item: DropdownMenuItem }">
            <div class="text-left">
                <p>
                    Signed in as
                </p>
                <p class="truncate font-medium text-gray-900">
                    {{ item.label }}
                </p>
            </div>
        </template>

        <template #item="{ item }">
            <div class="flex items-center gap-1 cursor-pointer">
                <span class="truncate">{{ item.label }}</span>

                <UIcon
                    v-if="item.icon"
                    :name="item.icon"
                    class="size-4 text-gray-400 ms-auto"
                />
            </div>
        </template>
    </UDropdownMenu>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

const { data } = useAuth(); 

const emit = defineEmits<{
    (e: 'account'): void;
    (e: 'signOut'): void;
}>();

const items = computed<DropdownMenuItem[]>(() => [
    [{
        label: data.value?.username || '',
        slot: 'account' as const,
        icon: null,
        disabled: true
    }],
    [
        {
            label: 'Account',
            icon: 'i-material-symbols-settings',
            onSelect() {
                emit('account')
            },
        },
        {
            label: 'Sign out',
            icon: 'i-heroicons-arrow-left-on-rectangle',
            onSelect() {
                emit('signOut')
            },
        }
    ],
]);
</script>

<style scoped>
@reference "@/assets/css/main.css";

.account-icon-container {
    @apply bg-gray-50 rounded-full size-10;

    .account-icon {
        @apply size-10 text-primary-500 cursor-pointer;
    }
}
</style>
