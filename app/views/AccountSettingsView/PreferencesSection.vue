<template>
    <div class="setting-section">
        <h2 class="subsection-title">Clear Course/Assignment Data</h2>
        <p class="subsection-description">
            Starting a new semester? Clear all course and assignment data
        </p>
        <UButton
            :loading="loading"
            @click="onDataClear"
        >
            Clear Data
        </UButton>
    </div>
</template>

<script setup lang="ts">
import ConfirmationModal from '../modals/CreateAssignmentModal/ConfirmationModal.vue';
const { $api } = useNuxtApp();
const overlay = useOverlay();
const toast = useToast();

const loading = ref<boolean>(false);
const confirmationModal = overlay.create(ConfirmationModal);

const clearData = async () => { 
    loading.value = true;
    try {
        await $api('/api/data/delete-all/', {
            method: 'DELETE'
        });
    } catch (error) {
        const message = errorMessage(error);
        toast.add({
            title: 'Could Not Clear Data',
            description: message,
            color: 'error'
        });
        loading.value = false;
        return;
    }

    toast.add({
        title: 'Successfully Cleared Data',
        description: 'Course and assignment data has been reset.',
        color: 'success'
    });
    loading.value = false;
};

const onDataClear = async () => {
    const modalInstance = confirmationModal.open({
        title: 'Clear Course/Assignment Data',
        description: 'Are you sure you would like to continue? This will remove all your assignment data.'
    });

    const result = await modalInstance.result;

    if (result) {
        clearData();
    }
};
</script>

<style scoped>
@reference "@/assets/css/main.css";
</style>