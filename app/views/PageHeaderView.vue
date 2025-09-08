<template>
    <div class="page-header-container">
        <NuxtLink to="/">
            <img
                :src="GoldGessoLogo"
                class="logo"
            />
        </NuxtLink>
        <ClientOnly>
            <AccountDropdown
                v-if="status === 'authenticated'"
                @account="toAccount"
                @sign-out="onSignOut"
            />
            <NuxtLink
                v-else-if="status === 'unauthenticated'"
                to="/login"
            >
                <UButton
                    label="Login"
                    class="h-fit"
                />
            </NuxtLink>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import GoldGessoLogo from '@/assets/images/gold_gesso_logo.png';
import AccountDropdown from '@/components/AccountDropdown/AccountDropdown.vue';

const { status, signOut } = useAuth();

const onSignOut = async () => {
    await signOut({ callbackUrl: '/login' })
        .catch(error => {});
}

const toAccount = () => {
    navigateTo('/account');
}
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
