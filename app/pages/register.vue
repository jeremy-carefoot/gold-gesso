<template>
    <div id="register-page">
        <RegisterForm 
            :error="registerError"
            :submit-errors="registerSubmitErrors"
            @register="onRegister"
            @form-edit="onEdit"
        />
    </div>
</template>

<script setup lang="ts">
import RegisterForm from '~/components/RegisterForm/RegisterForm.vue';
import { watchImmediate } from '@vueuse/core';
import type { UserRegisterInfo } from '~/components/RegisterForm/types';
import { FetchError } from 'ofetch';

const { status, signUp } = useAuth();

const registerError = ref<string | null>(null);
const registerSubmitErrors = ref<Record<string, string>>({});

const onRegister = async (userInfo: UserRegisterInfo) => {
    registerError.value = null;
    
    await signUp(
        userInfo,
        { callbackUrl: '/' }
    ).catch(async error => {
        // On bad request, handle form field errors
        if (error instanceof FetchError
            && error.status === 400
        ) {
            registerSubmitErrors.value = getFieldErrors(error.data);
            return;
        }
        registerError.value = errorMessage(error);
    });
};

// Reset any submission errors when the form is edited
const onEdit = () => {
    registerSubmitErrors.value = {};
};

watchImmediate(status, () => {
    if (status.value === 'authenticated') {
        navigateTo('/');
    }
});
</script>

<style scoped>
@reference "@/assets/css/main.css";

#register-page {
    @apply flex w-screen justify-center py-16;
}
</style>
