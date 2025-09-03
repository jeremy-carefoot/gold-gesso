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

const { signIn } = useAuth();

const loginError = ref<string | null>(null);

const onLogin = async (username: string, password: string) => {
    loginError.value = null; 

    const result = await signIn({ username, password })
        .catch(error => {
            loginError.value = errorMessage(error, LoginErrorMap)
        });
    
    // TODO handle redirect if successful
};
</script>

<style scoped>
@reference "@/assets/css/main.css";

#login-page {
    @apply flex w-screen justify-center py-16;
}
</style>