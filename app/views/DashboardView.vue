<template>
    <div class="container mx-auto p-6">
        <div class="flex flex-col gap-4 mb-6">
            <h1 class="text-2xl font-bold">Assignments</h1>
            <UCheckbox
                v-model="showSubmitted"
                class="ml-4"
                label="Show Submitted"
            />
        </div>
        
        <AssignmentTable 
            :assignments="filteredAssignments || []"
            :courses="courses || []"
            :loading="pending"
        />
    </div>
</template>

<script setup lang="ts">
import type { AssignmentMeta } from '@/types/assignment';
import type { CourseMeta } from '~/types/course';

const showSubmitted = ref(false);

const {
    data: assignments,
    pending
} = useSyncAPI<AssignmentMeta[]>('/api/data/all-assignments');


// all-assignments automatically syncs course data so we can call cached courses from db here
const {
    data: courses
} = useAPI<CourseMeta[]>('/api/data/cached-courses');

const filteredAssignments = computed(() => {
    if (showSubmitted.value) {
        return assignments.value;
    }
    return assignments.value?.filter(
        a => !a.has_submitted_submissions
    );
});
</script>