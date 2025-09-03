<template>
    <div class="page-header-container">
        <img
            :src="GoldGessoLogo"
            class="logo"
        />
        <NuxtLink to="/login">
            <UButton
                label="Login"
                class="h-fit"
            />
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import GoldGessoLogo from '@/assets/images/gold_gesso_logo.png?url';
</script>

<style scoped>
@reference "@/assets/css/main.css";

.page-header-container {
    @apply flex items-center justify-between px-8 h-16 shadow-md;

    .logo {
        @apply h-14 w-auto;
    }
}
</style>
