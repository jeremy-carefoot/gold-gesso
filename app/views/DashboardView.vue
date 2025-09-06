<template>
    <div class="container mx-auto p-6">
        <h1 class="text-2xl font-bold mb-6">Assignments</h1>
        
        <AssignmentTable 
            :assignments="assignments || []"
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

const {
    data: courses
} = useAPI<CourseMeta[]>('/api/data/courses')
</script>