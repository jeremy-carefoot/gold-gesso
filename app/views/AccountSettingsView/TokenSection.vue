<template>
    <div class="setting-section">
        <h2 class="subsection-title">Canvas API Token</h2>
        <p class="subsection-description">
            Connect your Canvas account to sync assignments and course data
        </p>
        
        <UForm
            class="token-form"
            :state="formState"
            @submit="onSubmit"
        >
            <UFormField
                label="Canvas API Token"
                name="canvasToken"
            >
                <UInput
                    v-model="formState.canvasToken"
                    type="password"
                    placeholder="Enter your Canvas API token"
                    class="w-[300px]"
                />
            </UFormField>
            
            <div class="form-actions">
                <UButton 
                    type="submit"
                    :loading="saving"
                    :disabled="!formState.canvasToken"
                >
                    Save Token
                </UButton>
            </div>
        </UForm>
    </div>
</template>

<script setup lang="ts">
import { watchImmediate } from '@vueuse/core';
const { $api } = useNuxtApp();

const formState = ref({
    canvasToken: ''
});

const saving = ref(false);
const toast = useToast();

const { data: tokenData }= useAPI<{ canvas_token: string }>(
    '/api/auth/canvas-token/'
);

const onSubmit = async () => {
    const token = formState.value.canvasToken;
    if (!token) return;

    saving.value = true;

    await $api('/api/auth/canvas-token/', {
        method: 'POST',
        body: {
            canvas_auth_token: token
        }
    }).catch(error => {
        const message = errorMessage(error);
        toast.add({
            title: 'Failed to save Canvas API token',
            description: message,
            color: 'error'
        });
    });

    toast.add({
        title: 'Success',
        description: 'Canvas API token saved successfully',
        color: 'success'
    });

    saving.value = false;
};

watchImmediate(tokenData, data => {
    if (data?.canvas_token) {
        formState.value.canvasToken = data.canvas_token;
    }
});
</script>

<style scoped>
@reference "@/assets/css/main.css";

.token-form {
    @apply space-y-4;
}

.form-actions {
    @apply flex gap-3 mt-6;
}
</style>