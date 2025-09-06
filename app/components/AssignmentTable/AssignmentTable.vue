<template>
    <div class="w-full">
        <UTable
            :data="assignments"
            :columns="columns"
            :loading="loading"
            :empty-state="{ icon: 'i-heroicons-book-open', label: 'No assignments found.' }"
            class="w-full"
        >
            <template #expand-cell="{ row }">
                <UButton
                    v-if="row.original.description"
                    :icon="getExpandIcon(row.getIsExpanded())"
                    class="rounded-full"
                    variant="ghost"
                    @click="row.toggleExpanded()"
                />
            </template>
            <template #due_at-cell="{ row }">
                <span v-if="row.original.due_at">
                    {{ formatDateTime(row.original.due_at) }}
                </span>
                <span v-else>
                    No Due Date
                </span>
            </template>
            <template #unlock_at-cell="{ row }">
                <span v-if="row.original.unlock_at">
                    {{ formatDateTime(row.original.unlock_at) }}
                </span>
                <span v-else>
                    -
                </span>
            </template>
            <template #grading_type-cell="{ row }">
                <UBadge
                    :label="getGradingTypeLabel(row.original.grading_type)"
                    :style="getGradingTypeStyle(row.original.grading_type)"
                />
            </template>

            <template #expanded="{ row }">
                <div
                    v-dompurify-html="row.original.description"
                />
            </template>
        </UTable>
    </div>
</template>

<script setup lang="ts">
import type { AssignmentMeta, GradingType } from '@/types/assignment';
import type { TableColumn } from '@nuxt/ui';
import { GradingTypeMeta } from '~/utils/meta';

interface Props {
    assignments: AssignmentMeta[];
    loading?: boolean;
}

defineProps<Props>();

const getExpandIcon = (isExpanded: boolean) => (
    isExpanded
        ? 'i-heroicons-chevron-up-20-solid'
        : 'i-heroicons-chevron-down-20-solid'
);

const getGradingTypeLabel = (gradingType: GradingType) => GradingTypeMeta[gradingType]?.label ?? 'Unknown';
const getGradingTypeStyle = (gradingType: GradingType) => ({
    backgroundColor: GradingTypeMeta[gradingType]?.color ?? 'black'
});

const columns: TableColumn<AssignmentMeta>[] = [
    {
        id: 'expand',
        header: ''
    },
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'due_at',
        header: 'Due On'
    },
    {
        accessorKey: 'unlock_at',
        header: 'Unlocks On'
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
        accessorKey: 'course_id',
        header: 'Course ID'
    }
];
</script>

<style scoped>
@reference "@/assets/css/main.css";
</style>
