<template>
    <div class="content-section">
        <h1 class="section-title">API Tokens</h1>
        <p class="section-description">Manage your external service integrations</p>
        
        <div class="token-section">
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
    </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();

const formState = ref({
    canvasToken: ''
});

const saving = ref(false);
const toast = useToast();

const { data: tokenData }= useAPI<{ has_canvas_token: boolean }>(
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

watch(tokenData, data => {
    if (data?.has_canvas_token) {
        // Set filler content to indicate there is a token set
        formState.value.canvasToken = 'a'.repeat(30);
    }
});
</script>

<style scoped>
@reference "@/assets/css/main.css";

.content-section {
    @apply max-w-4xl;
}

.section-title {
    @apply text-3xl font-bold text-gray-900 mb-2;
}

.section-description {
    @apply text-gray-600 mb-8;
}

.token-section {
    @apply bg-white rounded-lg border border-gray-200 p-6;
}

.subsection-title {
    @apply text-lg font-semibold text-gray-900 mb-2;
}

.subsection-description {
    @apply text-sm text-gray-600 mb-6;
}

.token-form {
    @apply space-y-4;
}

.form-actions {
    @apply flex gap-3 mt-6;
}
</style>