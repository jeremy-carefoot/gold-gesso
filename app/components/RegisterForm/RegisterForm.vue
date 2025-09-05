<template>
    <UCard class="w-full max-w-md">
        <template #header>
            <h2 class="text-xl font-semibold text-center">
                Register
            </h2>
        </template>
        <UAlert
            v-if="error"
            color="error"
            variant="subtle"
            icon="material-symbols:warning-outline-rounded"
            :title="error"
            class="mb-4"
        />
        <UForm
            :state="formState"
            :validate="validate"
            @submit="onSubmit"
            class="space-y-4"
        >
            <UFormField
                name="username"
                label="Username"
                :error="submitErrors?.username"
                required
            >
                <UInput 
                    v-model="formState.username" 
                    placeholder="Enter your username"
                    size="lg"
                    class="w-full"
                    required
                />
            </UFormField>

            <UFormField
                name="email"
                label="Email"
                :error="submitErrors?.email"
                required
            >
                <UInput 
                    v-model="formState.email" 
                    placeholder="Enter your email"
                    size="lg"
                    class="w-full"
                />
            </UFormField>

            <UFormField
                name="password"
                label="Password"
                :error="submitErrors?.password"
                required
            >
                <UInput 
                    v-model="formState.password" 
                    type="password"
                    placeholder="Enter your password"
                    size="lg"
                    class="w-full"
                    required
                />
            </UFormField>

            <UFormField
                name="password_confirm"
                label="Confirm Password"
                :error="submitErrors?.confirm_password"
                required
            >
                <UInput 
                    v-model="formState.password_confirm" 
                    type="password"
                    placeholder="Confirm your password"
                    size="lg"
                    class="w-full"
                    required
                />
            </UFormField>

            <UFormField
                name="first_name"
                label="First Name"
                :error="submitErrors?.first_name"
            >
                <UInput 
                    v-model="formState.first_name" 
                    placeholder="Enter your first name"
                    size="lg"
                    class="w-full"
                />
            </UFormField>

            <UFormField
                name="last_name"
                label="Last Name"
                :error="submitErrors?.last_name"
            >
                <UInput 
                    v-model="formState.last_name" 
                    placeholder="Enter your last name"
                    size="lg"
                    class="w-full"
                />
            </UFormField>
            
            <UButton 
                type="submit" 
                block 
                size="lg"
                class="mt-6"
                :disabled="submitDisabled"
            >
                Register
            </UButton>
        </UForm>
        
        <template #footer>
            <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-1">
                    <span class="text-gray-600">Already have an account?</span>
                    <ULink 
                        to="/login" 
                        class="text-primary hover:underline font-medium"
                    >
                        Sign In
                    </ULink>
                </div>
            </div>
        </template>
    </UCard>
</template>

<script setup lang="ts">
import type { UserRegisterInfo } from './types';
import { isEmpty } from 'lodash';
import { watchDeep } from '@vueuse/core';

const props = defineProps<{
    error?: string | null;
    submitErrors?: Record<string, string>;
}>();

const formState = ref<UserRegisterInfo>({
    username: '',
    password: '',
    password_confirm: '',
    email: '',
    first_name: '',
    last_name: ''
});

const formErrors = ref<{ name: string; message: string }[]>([]);

const submitDisabled = computed(() => (
    !!formErrors.value.length || !isEmpty(props.submitErrors)
));

const emit = defineEmits<{
    (e: 'register', userInfo: UserRegisterInfo): void;
    (e: 'formEdit', form: UserRegisterInfo): void;
}>();

const validateEmail = (email: string) => {
    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validEmailRegex.test(email);
}

const validate = (state: UserRegisterInfo) => {
    const errors = [];

    if (state.password !== state.password_confirm) {
        const passwordNoMatchError = 'Passwords do not match';
        errors.push(
            { name: 'password', message: passwordNoMatchError},
            { name: 'password_confirm', message: passwordNoMatchError }
        );
    }

    if (state.password.length < 8) {
        errors.push({
            name: 'password',
            message: 'Password must be at least 8 characters long'
        });
    }

    if (!validateEmail(state.email)) {
        errors.push({
            name: 'email',
            message: 'Please provide a valid email'
        });
    }

    formErrors.value = errors;
    return errors;
};

const onSubmit = () => {
    emit('register', formState.value);
};

watchDeep(formState, () => {
    emit('formEdit', formState.value);
});
</script>

<style scoped>
@reference "@/assets/css/main.css";
</style>
