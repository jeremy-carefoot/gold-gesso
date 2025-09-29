<template>
    <DashboardView
        v-if="status === 'authenticated'"
    />
</template>

<script setup lang="ts">
import DashboardView from '~/views/DashboardView.vue';
import { watchImmediate } from '@vueuse/core';

const { status } = useAuth();

watchImmediate(status, () => {
    if (status.value === 'unauthenticated') {
        navigateTo('/login');
    }
});
</script>

<style scoped>
</style>