<template>
    <div class="container mx-auto p-6">
        <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
        
        <AssignmentTable 
            :assignments="assignments || []"
            :loading="pending"
        />
    </div>
</template>

<script setup lang="ts">
import type { AssignmentMeta } from '@/types/assignment';

const {
    data: assignments,
    pending
} = useAPI<AssignmentMeta[]>('/api/data/all-assignments');
</script>