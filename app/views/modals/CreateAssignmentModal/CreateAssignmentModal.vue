<template>
    <UModal
        title="Create Assignment"
        aria-describedby="Create a new custom assignment that will be added to your dashboard."
    >
        <template #body>
            <DialogContent
                aria-describedby="Create a new custom assignment that will be added to your dashboard."
            >
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
                        name="description"
                        label="Description (Optional)"
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
                    >
                        Create
                    </UButton>
                </UForm>
            </DialogContent>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import { DialogContent } from 'reka-ui';
import type { CreateAssignmentModalProps, NewAssignment } from './types';
import _ from 'lodash';

const props = defineProps<CreateAssignmentModalProps>();

const emit = defineEmits<{
    (e: 'close', success?: boolean): void
}>();

const { courses } = toRefs(props);

const { $api } = useNuxtApp();
const toast = useToast();

const formError = ref<string>();
const formState = ref<NewAssignment>({
    name: '',
    description: '',
    course_ref: _.first(courses.value)?.id ?? 0,
    is_submitted: false
});

const onCreate = async () => {
    try {
        await $api('/api/data/create-assignment/', {
            method: 'POST',
            body: formState.value
        });
    } catch (error) {
        const message = errorMessage(error);
        formError.value = message;
        return;
    }

    toast.add({
        title: 'Created Assignment',
        description: `Assignment "${formState.value.name}" created`,
        color: 'primary'
    });

    emit('close', true);
};
</script>

<style scoped>
@reference "@/assets/css/main.css";
</style>
