<template>
    <div class="container mx-auto p-6">
        <div class="flex gap-4">
            <div class="flex flex-col gap-4 mb-6">
                <h1 class="text-2xl font-bold">Assignments</h1>
                <div class="flex gap-6 items-center h-8">
                    <UCheckbox
                        v-model="showSubmitted"
                        class="ml-4"
                        label="Show Submitted"
                    />
                    <UButton
                        v-if="selected.length"
                        class="h-fit"
                        @click="markAsSubmitted"
                    >
                        Mark as Submitted
                    </UButton>
                </div>
            </div>
        </div>

        <ClientOnly>
            <AssignmentTable 
                v-model:selected="selected"
                :assignments="filteredAssignments || []"
                :courses="courses || []"
                :loading="pending"
            />
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import type { AssignmentMeta } from '@/types/assignment';
import type { CourseMeta } from '~/types/course';

const { $api } = useNuxtApp();
const toast = useToast();

const showSubmitted = ref(false);
const selected = ref<AssignmentMeta[]>([]);

const {
    data: courses,
    refresh: refreshCourses
} = useAPI<CourseMeta[]>('/api/data/cached-courses');

const {
    data: assignments,
    pending,
    refresh: refreshAssignments
} = useSyncAPI<AssignmentMeta[]>('/api/data/all-assignments', {
    // courses get updated on assignment sync
    onUpdate: () => refreshCourses()
});

const filteredAssignments = computed(() => {
    if (showSubmitted.value) {
        return assignments.value;
    }
    return assignments.value?.filter(
        a => !a.is_submitted
    );
});

const refreshData = async () => Promise.all([
    refreshAssignments(),
    refreshCourses()
]);

const markAsSubmitted = async () => {
    const reqBody = selected.value.map(a => ({
        assignment_id: a.assignment_id,
        is_submitted: true
    }));

    try {
        await $api('/api/data/update-assignment/', {
            method: 'POST',
            body: { assignments: reqBody }
        });
    } catch (error) {
        const message = errorMessage(error);
        toast.add({
            title: 'Failed to mark assignments as submitted',
            description: message,
            color: 'error'
        });
        return;
    }

    toast.add({
        title: 'Marked as Submitted',
        description: 'Marked checked assignments as submitted',
        color: 'primary'
    });

    selected.value = [];
    await refreshData();
};
</script>