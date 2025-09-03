<template>
    <div id="login-page">
        <LoginForm 
            @login="onLogin"
        />
    </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();

const onLogin = (username: string, password: string) => {
    const response = $api('/api/auth/login/', {
        method: 'POST',
        body: {
            username,
            password
        }
    });
    console.log(response);
};
</script>

<style scoped>
@reference "@/assets/css/main.css";

#login-page {
    @apply flex w-screen justify-center py-16;
}
</style>