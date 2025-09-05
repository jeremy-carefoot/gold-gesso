<template>
    <DashboardView
        v-if="status === 'authenticated'"
    />
</template>

<script setup lang="ts">
import DashboardView from '~/views/DashboardView.vue';

const { status } = useAuth();
</script>

<style scoped>
</style>