<template>
    <div
        ref="tableContainerRef"
        class="w-full"
    >
        <UTable
            :data="assignments"
            :columns="columns"
            :loading="loading"
            :sorting="initialSort"
            class="w-full"
        >
            <template #select-cell="{ row }">
                <UCheckbox
                    :model-value="selected.includes(row.original)"
                    @change="onSelect(row)"
                />
            </template>
            <template #name-cell="{ row }">
                <div class="name-cell">
                    <NuxtLink
                        :to="getAssignmentUrl(row.original)"
                        target="blank"
                        rel="noreferrer"
                        :class="{
                            'link': !row.original.is_custom,
                            'completed': row.original.is_submitted
                        }"
                    >
                        {{ row.original.name }}
                    </NuxtLink>
                    <UIcon
                        v-if="row.original.is_submitted"
                        name="material-symbols:check"
                        class="text-primary-500"
                    />
                </div>
            </template>
            <template #course_ref-cell="{ row }">
                <div class="max-w-[250px] truncate">
                    {{ getCourseName(row.original.course_ref) ?? row.original.course_ref }}
                </div>
            </template>
            <template #course_id-header="{ column }">
                <SortingButton
                    :label="column.columnDef.header?.toString()"
                    :sort-direction="column.getIsSorted()"
                    @click="column.toggleSorting()"
                />
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
                    v-if="row.original.grading_type"
                    :label="getGradingTypeLabel(row.original.grading_type)"
                    :style="getGradingTypeStyle(row.original.grading_type)"
                />
                <span v-else>
                    -
                </span>
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
                    }"
                >
                    <div v-dompurify-html="row.original.description" />
                </div>
            </template>

            <template #empty>
                No assignments found.
            </template>
            <template #loading>
                Fetching assignments...
            </template>
        </UTable>
    </div>
</template>

<script setup lang="ts">
import type { AssignmentMeta, GradingType } from '@/types/assignment';
import type { TableColumn, TableRow } from '@nuxt/ui';
import { useElementSize } from '@vueuse/core';
import { GradingTypeMeta } from '~/constants/meta';
import { joinURL } from 'ufo';
import type { CourseMeta } from '~/types/course';
import _ from 'lodash';

const EXPANDED_ROW_PADDING = 64;

interface Props {
    assignments: AssignmentMeta[];
    courses?: CourseMeta[];
    loading?: boolean;
}

const props = defineProps<Props>();
const config = useRuntimeConfig();

const tableContainerRef = useTemplateRef('tableContainerRef');
const { width } = useElementSize(tableContainerRef);

const selected = defineModel<AssignmentMeta[]>('selected', { default: [] });

const onSelect = (row: TableRow<AssignmentMeta>) => {
    const isSelected = selected.value.includes(row.original);
    if (isSelected) {
        selected.value = selected.value.filter(d => d !== row.original);
        return;
    }
    selected.value.push(row.original);
};

const getAssignmentUrl = (assignment: AssignmentMeta) => {
    if (assignment.is_custom) return undefined;

    const canvasUrl = config.public.canvasBase;
    return joinURL(canvasUrl, `/courses/${assignment.course_ref}/assignments/${assignment.assignment_id}`);
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

const courseMeta = computed(() => _.keyBy(props.courses, 'id'));
const getCourseName = (id: number) => courseMeta.value[id]?.name;

const columns: TableColumn<AssignmentMeta>[] = [
    {
        id: 'select',
        header: ''
    },
    {
        id: 'expand',
        header: ''
    },
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'course_ref',
        header: 'Course'
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
];

const initialSort = [{
    id: 'due_at',
    desc: false
}];
</script>

<style scoped>
@reference "@/assets/css/main.css";

.name-cell {
    @apply flex gap-2 max-w-[300px] text-primary-900 truncate;

    .link {
        @apply underline;

        &.completed {
            @apply line-through;
        }
    }
}
</style>
