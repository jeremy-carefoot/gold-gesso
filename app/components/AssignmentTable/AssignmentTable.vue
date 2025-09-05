<template>
    <div class="w-full">
        <UTable
            :data="assignments"
            :columns="columns"
            :loading="loading"
            :empty-state="{ icon: 'i-heroicons-book-open', label: 'No assignments found.' }"
            class="w-full"
        />
    </div>
</template>

<script setup lang="ts">
import type { AssignmentMeta } from '@/types/assignment';
import type { TableColumn } from '@nuxt/ui';

interface Props {
    assignments: AssignmentMeta[];
    loading?: boolean;
}

const props = defineProps<Props>();

const columns: TableColumn<AssignmentMeta>[] = [
    {
        accessorKey: 'id',
        header: 'ID'
    },
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'description',
        header: 'Description'
    },
    {
        accessorKey: 'due_at',
        header: 'Due At'
    },
    {
        accessorKey: 'unlock_at',
        header: 'Unlock At'
    },
    {
        accessorKey: 'lock_at',
        header: 'Lock At'
    },
    {
        accessorKey: 'points_possible',
        header: 'Points Possible'
    },
    {
        accessorKey: 'grading_type',
        header: 'Grading Type'
    },
    {
        accessorKey: 'allowed_attempts',
        header: 'Allowed Attempts'
    },
    {
        accessorKey: 'has_submitted_submissions',
        header: 'Has Submissions'
    },
    {
        accessorKey: 'course_id',
        header: 'Course ID'
    }
];
</script>

<style scoped>
@reference "@/assets/css/main.css";
</style>