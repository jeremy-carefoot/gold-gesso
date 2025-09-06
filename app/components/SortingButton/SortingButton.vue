<template>
    <UButton
        :label="label"
        :leading-icon="sortIcon"
        color="neutral"
        variant="ghost"
    />
</template>

<script setup lang="ts">
const props = defineProps<{
    label?: string;
    sortDirection: false | 'asc' | 'desc';
}>();

const sortIcon = computed(() => {
    switch(props.sortDirection) {
        case 'asc':
            return 'basil:arrow-up-outline';
        case 'desc':
            return 'basil:arrow-down-outline';
        default:
            return 'basil:sort-outline';
    };
});
</script>