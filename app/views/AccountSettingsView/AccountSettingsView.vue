<template>
    <div class="account-settings-container">
        <Sidebar 
            :items="sidebarItems"
            :activeSection="activeSectionId"
            @select-section="updateSection"
        />

        <main class="main-content">
            <div class="content-section">
                <h1 class="section-title">{{ activeSection.label }}</h1>
                <p class="section-description">{{ activeSection.description }}</p>
                <component :is="activeSection.section" />
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import type { SidebarItem } from '~/components/Sidebar/types';
import TokenSection from './TokenSection.vue';
import PreferencesSection from './PreferencesSection.vue';
import type { Component } from 'vue';

type SettingsSection = {
    description: string;
    section: Component;
};

type SidebarEntry = SidebarItem & SettingsSection;

const sidebarItems: SidebarEntry[] = [
    {
        id: 'api-tokens',
        label: 'API Tokens',
        icon: 'i-heroicons-key',
        description: 'Manage your external service integrations',
        section: TokenSection
    },
    {
        id: 'preferences',
        label: 'Preferences',
        icon: 'i-heroicons-cog-6-tooth',
        description: 'Manage your account preferences',
        section: PreferencesSection
    }
];

const activeSection = shallowRef<SidebarEntry>(sidebarItems[0]!);
const activeSectionId = computed(() => activeSection.value.id);

const updateSection = (newId: string) => {
    activeSection.value = sidebarItems.find(s => s.id === newId) ?? sidebarItems[0]!;
};
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

<style>
@reference "@/assets/css/main.css";

.setting-section {
    @apply bg-white rounded-lg border border-gray-200 p-6;
}

.subsection-title {
    @apply text-lg font-semibold text-gray-900 mb-2;
}

.subsection-description {
    @apply text-sm text-gray-600 mb-6;
}
</style>