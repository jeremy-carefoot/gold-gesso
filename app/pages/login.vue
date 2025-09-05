<template>
    <div id="login-page">
        <LoginForm 
            :error="loginError"
            @login="onLogin"
        />
    </div>
</template>

<script setup lang="ts">
import { watchImmediate } from '@vueuse/core';
import { LoginErrorMap } from '~/constants/errorMaps';

const { signIn, status } = useAuth();

const loginError = ref<string | null>(null);

const onLogin = async (username: string, password: string) => {
    loginError.value = null; 

    await signIn(
        { username, password },
        { callbackUrl: '/' }
    ).catch(error => {
        loginError.value = errorMessage(error, LoginErrorMap)
    });
};

watchImmediate(status, () => {
    if (status.value === 'authenticated') {
        navigateTo('/');
    }
});
</script>

<style scoped>
@reference "@/assets/css/main.css";

#login-page {
    @apply flex w-screen justify-center py-16;
}
</style>