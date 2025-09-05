<template>
    <UCard class="w-full max-w-md">
        <template #header>
            <h2 class="text-xl font-semibold text-center">
                Sign In
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
            @submit="onSubmit"
            class="space-y-4"
        >
            <UFormField
                name="username"
                label="Username"
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
                name="password"
                label="Password"
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
            
            <UButton 
                type="submit" 
                block 
                size="lg"
                class="mt-6"
            >
                Sign In
            </UButton>
        </UForm>
        
        <template #footer>
            <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-1">
                    <span class="text-gray-600">New user?</span>
                    <ULink 
                        to="/register" 
                        class="text-primary hover:underline font-medium"
                    >
                        Register
                    </ULink>
                </div>
            </div>
        </template>
    </UCard>
</template>

<script setup lang="ts">
defineProps<{
    error?: string | null;
}>();

const formState = ref({
    username: '',
    password: ''
});

const emit = defineEmits<{
    (e: 'login', username: string, password: string): void;
}>();

const onSubmit = () => {
    emit('login', formState.value.username, formState.value.password);
};
</script>

<style scoped>
@reference "@/assets/css/main.css";
</style>