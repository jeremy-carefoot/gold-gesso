<template>
    <div class="container mx-auto p-6">
        <h1 class="text-2xl font-bold mb-6">Assignments</h1>
        
        <AssignmentTable 
            :assignments="activeAssignments"
            :courses="courses || []"
            :loading="pending"
        />
    </div>
</template>

<script setup lang="ts">
import type { AssignmentMeta } from '@/types/assignment';
import type { CourseMeta } from '~/types/course';

const {
    data: assignments,
    pending
} = useAPI<AssignmentMeta[]>('/api/data/all-assignments');


// all-assignments automatically syncs course data so we can call cached courses from db here
const {
    data: courses
} = useAPI<CourseMeta[]>('/api/data/cached-courses');

const activeAssignments = computed(() => assignments.value?.filter(
    a => !a.has_submitted_submissions
) || []);
</script>