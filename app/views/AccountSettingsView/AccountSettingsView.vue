<template>
    <div class="account-settings-container">
        <Sidebar 
            :items="sidebarItems"
            :activeSection="activeSection"
            @select-section="activeSection = $event"
        />

        <main class="main-content">
            <TokenSection v-if="activeSection === 'api-tokens'" />
        </main>
    </div>
</template>

<script setup lang="ts">
import type { SidebarItem } from '~/components/Sidebar/types';
import TokenSection from './TokenSection.vue';

const activeSection = ref('api-tokens');

const sidebarItems: SidebarItem[] = [
    {
        id: 'api-tokens',
        label: 'API Tokens',
        icon: 'i-heroicons-key'
    },
    // {
    //     id: 'profile',
    //     label: 'Profile',
    //     icon: 'i-heroicons-user'
    // },
    // {
    //     id: 'preferences',
    //     label: 'Preferences',
    //     icon: 'i-heroicons-cog-6-tooth'
    // }
];
</script>

<style scoped>
@reference "@/assets/css/main.css";

.account-settings-container {
    @apply flex min-h-screen bg-gray-50 border-t border-t-gray-200;
}

.main-content {
    @apply flex-1 p-8;
}

.content-section {
    @apply max-w-4xl;
}

.section-title {
    @apply text-3xl font-bold text-gray-900 mb-2;
}

.section-description {
    @apply text-gray-600 mb-8;
}
</style>