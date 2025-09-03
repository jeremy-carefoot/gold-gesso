<template>
    <div id="login-page">
        <LoginForm 
            :error="loginError"
            @login="onLogin"
        />
    </div>
</template>

<script setup lang="ts">
import { LoginErrorMap } from '~/constants/errorMaps';

const { $api } = useNuxtApp();

const loginError = ref<string | null>(null);

const onLogin = async (username: string, password: string) => {
    loginError.value = null; 

    const response = await $api('/api/auth/login/', {
        method: 'POST',
        body: {
            username,
            password
        }
    }).catch(error => {
        loginError.value = errorMessage(error, LoginErrorMap);
    });
};
</script>

<style scoped>
@reference "@/assets/css/main.css";

#login-page {
    @apply flex w-screen justify-center py-16;
}
</style>