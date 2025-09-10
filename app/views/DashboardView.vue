<template>
    <div class="container mx-auto p-6">
        <div class="flex flex-col gap-4 mb-6">
            <div class="flex items-center gap-4">
                <h1 class="text-2xl font-bold">Assignments</h1>
                <div v-if="isRefreshing" class="flex items-center gap-2 text-sm text-gray-500">
                    <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
                    <span>Refreshing...</span>
                </div>
            </div>
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

// Initial data fetch - returns cached data immediately
const {
    data: assignments,
    pending,
    refresh: refreshAssignments
} = useAPI<{ assignments: AssignmentMeta[], refresh_in_progress: boolean }>('/api/data/all-assignments');

// all-assignments automatically syncs course data so we can call cached courses from db here
const {
    data: courses,
    refresh: refreshCourses
} = useAPI<CourseMeta[]>('/api/data/cached-courses');

// WebSocket for real-time updates
const { message, isRefreshing, status, connect, disconnect } = useAssignmentWebSocket();

// Extract assignments from the response
const assignmentsList = computed(() => {
    if (assignments.value?.assignments) {
        return assignments.value.assignments;
    }
    // Fallback for backward compatibility if API still returns array
    return Array.isArray(assignments.value) ? assignments.value : [];
});

const filteredAssignments = computed(() => {
    if (showSubmitted.value) {
        return assignmentsList.value;
    }
    return assignmentsList.value?.filter(
        a => !a.has_submitted_submissions
    );
});

// Watch for WebSocket updates
watch(message, (newMessage) => {
    if (!newMessage) return;
    
    if (newMessage.type === 'assignments_updated' && newMessage.data) {
        // Update assignments with the new data from WebSocket
        assignments.value = { 
            assignments: newMessage.data, 
            refresh_in_progress: false 
        };
        // Also refresh courses in case there are new ones
        refreshCourses();
    }
});

// Connect to WebSocket when component mounts
onMounted(() => {
    connect();
});

// Disconnect when component unmounts
onUnmounted(() => {
    disconnect();
});
</script>