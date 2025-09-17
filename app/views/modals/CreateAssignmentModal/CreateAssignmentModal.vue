<template>
    <UModal
        title="Create Assignment"
        :close="{ class: 'cursor-pointer' }"
    >
        <template #body>
            <VisuallyHidden>
                <DialogDescription>
                    Create a new custom assignment that will be added to your dashboard.
                </DialogDescription>
            </VisuallyHidden>
            <UAlert
                v-if="formError"
                color="error"
                variant="subtle"
                icon="material-symbols:warning-outline-rounded"
                :title="formError"
                class="mb-4"
            />
            <UForm
                :state="formState"
                @submit="onCreate"
                class="space-y-4"
            >
                <UFormField
                    name="name"
                    label="Assignment Name"
                    required
                >
                    <UInput 
                        v-model="formState.name" 
                        placeholder="Enter assignment name"
                        size="lg"
                        class="w-full"
                        required
                    />
                </UFormField>
                <UFormField
                    name="course_ref"
                    label="Course"
                    required
                >
                    <USelect
                        v-model="formState.course_ref" 
                        :items="courses"
                        value-key="id"
                        size="lg"
                        class="w-full"
                    />
                </UFormField>
                <UFormField
                    name="grading_type"
                    label="Grading Type (optional)"
                >
                    <USelect
                        v-model="formState.grading_type" 
                        :items="gradingTypes"
                        value-key="id"
                        size="lg"
                        class="w-full"
                    />
                </UFormField>
                <UFormField
                    name="due_at"
                    label="Due Date (optional)"
                >
                    <DatetimePicker
                        v-model="formState.due_at"
                        class="w-[160px]"
                    />
                    <UButton
                        v-if="formState.due_at"
                        variant="ghost"
                        icon="material-symbols:close"
                        class="ml-2 rounded-full"
                        @click="formState.due_at = undefined"
                    />
                </UFormField>
                <UFormField
                    name="description"
                    label="Description (optional)"
                >
                    <UTextarea
                        v-model="formState.description" 
                        placeholder="Enter assignment description"
                        size="lg"
                        class="w-full"
                    />
                </UFormField>
                
                <UButton 
                    type="submit" 
                    block 
                    size="lg"
                    class="mt-6"
                    :disabled="loading"
                >
                    Create
                </UButton>
            </UForm>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import { DialogDescription, VisuallyHidden } from 'reka-ui';
import type { CreateAssignmentModalProps, NewAssignment } from './types';
import _ from 'lodash';
import { GradingTypeMeta } from '~/constants/meta';

const props = defineProps<CreateAssignmentModalProps>();

const emit = defineEmits<{
    (e: 'close', success?: boolean): void
}>();

const { courses } = toRefs(props);

const { $api } = useNuxtApp();
const toast = useToast();

const loading = ref<boolean>(false);
const formError = ref<string>();
const formState = ref<NewAssignment>({
    name: '',
    description: '',
    course_ref: _.first(courses.value)?.id ?? 0,
    is_submitted: false
});

const gradingTypes = computed(() => _.map(GradingTypeMeta, (meta, key) => ({
    id: key,
    label: meta.label
})));

const onCreate = async () => {
    loading.value = true;
    try {
        await $api('/api/data/create-assignment/', {
            method: 'POST',
            body: formState.value
        });
    } catch (error) {
        const message = errorMessage(error);
        formError.value = message;
        loading.value = false;
        return;
    }

    toast.add({
        title: 'Created Assignment',
        description: `Assignment "${formState.value.name}" created`,
        color: 'primary'
    });

    loading.value = false;
    emit('close', true);
};
</script>

<style scoped>
@reference "@/assets/css/main.css";
</style>
