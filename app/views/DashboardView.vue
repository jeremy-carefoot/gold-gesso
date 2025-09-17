<template>
    <div class="container mx-auto p-6">
        <div class="flex justify-between items-center mb-6">
            <div class="flex flex-col gap-4">
                <h1 class="text-2xl font-bold">Assignments</h1>
                <UCheckbox
                    v-model="showSubmitted"
                    class="ml-4"
                    label="Show Submitted"
                />
                <div
                    v-if="selected.length"
                    class="flex gap-2 items-center h-8 ml-4"
                >
                    <UButton
                        variant="ghost"
                        class="rounded-full"
                        color="neutral"
                        size="xs"
                        icon="material-symbols:close"
                        @click="clearSelection"
                    />
                    <span class="text-sm text-gray-500">
                        Selected {{ selected.length }} item(s):
                    </span>
                    <UButton
                        :disabled="loadingFetch"
                        label="Mark as Submitted"
                        class="h-fit"
                        variant="solid"
                        @click="markSubmission(true)"
                    />
                    <UButton
                        :disabled="loadingFetch"
                        label="Mark as Unsubmitted"
                        class="h-fit"
                        color="neutral"
                        variant="subtle"
                        @click="markSubmission(false)"
                    />
                    <UButton
                        :disabled="loadingFetch"
                        label="Delete"
                        class="h-fit"
                        variant="subtle"
                        color="error"
                        @click="deleteAssignments"
                    />
                </div>
            </div>
            <UButton
                v-if="courses"
                trailing-icon="material-symbols:add"
                label="Add"
                @click="openNewAssignmentModal"
            />
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
import CreateAssignmentModal from '~/views/modals/CreateAssignmentModal/CreateAssignmentModal.vue';
import type { AssignmentMeta } from '@/types/assignment';
import type { CourseMeta } from '~/types/course';

const { $api } = useNuxtApp();
const toast = useToast();
const overlay = useOverlay();

const showSubmitted = ref(false);
const selected = ref<AssignmentMeta[]>([]);

const loadingFetch = ref(false);

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

const clearSelection = () => {
    selected.value = [];
};

const markSubmission = async (value: boolean) => {
    loadingFetch.value = true;

    const reqBody = selected.value.map(a => ({
        assignment_id: a.assignment_id,
        is_submitted: value
    }));
    const valueLabel = value ? 'submitted' : 'unsubmitted';

    try {
        await $api('/api/data/update-assignment/', {
            method: 'POST',
            body: { assignments: reqBody }
        });
    } catch (error) {
        const message = errorMessage(error);
        loadingFetch.value = false;
        toast.add({
            title: `Failed to mark assignments as ${valueLabel}`,
            description: message,
            color: 'error'
        });
        return;
    }

    toast.add({
        title: `Marked as ${valueLabel}`,
        description: `Marked checked assignments as ${valueLabel}`,
        color: 'primary'
    });

    loadingFetch.value = false;
    clearSelection();
    await refreshData();
};

const deleteAssignments = async () => {
    loadingFetch.value = true;

    try {
        await $api('/api/data/delete-assignments/', {
            method: 'DELETE',
            query: {
                ids: selected.value.map(a => a.assignment_id).join(',')
            }
        });
    } catch (error) {
        const message = errorMessage(error);
        loadingFetch.value = false;
        toast.add({
            title: 'Failed to delete assignments',
            description: message,
            color: 'error'
        });
        return;
    }

    toast.add({
        title: `Deleted assignments`,
        description: `Deleted checked assignments`,
        color: 'primary'
    });

    loadingFetch.value = false;
    clearSelection();
    await refreshData();
};

const NewAssignmentModal = overlay.create(CreateAssignmentModal);
const openNewAssignmentModal = async () => {
    if (!courses.value) return;

    const modal = NewAssignmentModal.open({
        courses: courses.value?.map(c => ({ id: c.id, label: c.name }))
    });

    const isSuccess = await modal.result;
    
    if (isSuccess) {
        await refreshData();
    }
};
</script>