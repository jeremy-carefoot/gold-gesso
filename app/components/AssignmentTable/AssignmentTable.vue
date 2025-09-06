<template>
    <div
        ref="tableContainerRef"
        class="w-full"
    >
        <UTable
            :data="assignments"
            :columns="columns"
            :loading="loading"
            :ui="{ root: 'overflow-x-hidden' }"
            empty="No assignments found."
            class="w-full"
        >
            <template #name-cell="{ row }">
                <NuxtLink
                    :to="getAssignmentUrl(row.original)"
                    target="blank"
                    rel="noreferrer"
                    class="link"
                >
                    {{ row.original.name }}
                </NuxtLink>
            </template>
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
            <template #due_at-header="{ column }">
                <SortingButton
                    :label="column.columnDef.header?.toString()"
                    :sort-direction="column.getIsSorted()"
                    @click="column.toggleSorting()"
                />
            </template>
            <template #unlock_at-cell="{ row }">
                <span v-if="row.original.unlock_at">
                    {{ formatDateTime(row.original.unlock_at) }}
                </span>
                <span v-else>
                    -
                </span>
            </template>
            <template #unlock_at-header="{ column }">
                <SortingButton
                    :label="column.columnDef.header?.toString()"
                    :sort-direction="column.getIsSorted()"
                    @click="column.toggleSorting()"
                />
            </template>
            <template #grading_type-cell="{ row }">
                <UBadge
                    :label="getGradingTypeLabel(row.original.grading_type)"
                    :style="getGradingTypeStyle(row.original.grading_type)"
                />
            </template>
            <template #allowed_attempts-cell="{ row }">
                <span v-if="row.original.allowed_attempts === -1">
                    <UIcon
                        name="mdi:infinity"
                    />
                </span>
                <span v-else>
                    {{ row.original.allowed_attempts }}
                </span>
            </template>

            <template #expanded="{ row }">
                <div
                    class="overflow-x-auto"
                    :style="{
                        maxWidth: utilPx(width - EXPANDED_ROW_PADDING)
                    }
                ">
                    <div v-dompurify-html="row.original.description" />
                </div>
            </template>
        </UTable>
    </div>
</template>

<script setup lang="ts">
import type { AssignmentMeta, GradingType } from '@/types/assignment';
import type { TableColumn } from '@nuxt/ui';
import { useElementSize } from '@vueuse/core';
import { GradingTypeMeta } from '~/utils/meta';
import { joinURL } from 'ufo';

const EXPANDED_ROW_PADDING = 64;

interface Props {
    assignments: AssignmentMeta[];
    loading?: boolean;
}

defineProps<Props>();

const config = useRuntimeConfig();

const tableContainerRef = useTemplateRef('tableContainerRef');
const { width } = useElementSize(tableContainerRef);

const getAssignmentUrl = (assignment: AssignmentMeta) => {
    const canvasUrl = config.public.canvasBase;
    return joinURL(canvasUrl, `/courses/${assignment.course_id}/assignments/${assignment.id}`);
};

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
        header: 'Due On',
        sortingFn: luxonSortByDate<AssignmentMeta>
    },
    {
        accessorKey: 'unlock_at',
        header: 'Unlocks On',
        sortingFn: luxonSortByDate<AssignmentMeta>
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

.link {
    @apply text-primary-900 underline;
}
</style>
