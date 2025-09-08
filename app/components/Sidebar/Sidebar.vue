<template>
    <aside class="sidebar">
        <nav>
            <ul>
                <li
                    v-for="item in items"
                    :key="item.id"
                >
                    <button 
                        @click="$emit('selectSection', item.id)"
                        :class="{ active: activeSection === item.id }"
                        class="sidebar-item"
                    >
                        <UIcon
                            :name="item.icon"
                            class="sidebar-icon"
                        />
                        {{ item.label }}
                    </button>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import type { SidebarProps } from './types';

defineProps<SidebarProps>();

defineEmits<{
    (e: 'selectSection', section: string): void;
}>();
</script>

<style scoped>
@reference "@/assets/css/main.css";

.sidebar {
    @apply w-64 bg-white border-r border-gray-200 p-4;
}

.sidebar nav ul {
    @apply space-y-1;
}

.sidebar-item {
    @apply w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors;
}

.sidebar-item.active {
    @apply bg-primary-50 text-primary-700 hover:bg-primary-100;
}

.sidebar-icon {
    @apply size-5;
}
</style>