<template>
    <AccountSettingsView
        v-if="status === 'authenticated'"
    />
</template>

<script setup lang="ts">
import AccountSettingsView from '@/views/AccountSettingsView/AccountSettingsView.vue';
import { watchImmediate } from '@vueuse/core';

const { status } = useAuth();

watchImmediate(status, () => {
    if (status.value === 'unauthenticated') {
        navigateTo('/login');
    }
});
</script>