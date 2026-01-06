<template>
    <UModal
        :title="title"
        :close="{ class: 'cursor-pointer' }"
    >
        <template #body>
            {{ description }}
        </template>
        <template #footer>
            <UButton @click="$emit('close', true)">
                Continue
            </UButton>
            <UButton
                color="neutral"
                @click="$emit('close', false)"
            >
                Cancel
            </UButton>
        </template>
    </UModal>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    title: string;
    description?: string;
}>(), {
    description: 'Are you sure you would like to proceed? This cannot be undone.'
});

defineEmits<{
    (e: 'close', success?: boolean): void
}>();
</script>