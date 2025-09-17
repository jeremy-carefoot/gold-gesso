import type { DueDateUrgencyMetaEntry } from "~/constants/meta";
import type { AssignmentMeta } from "~/types/assignment";
import type { CourseMeta } from "~/types/course";

export type AssignmentTableRow = AssignmentMeta & {
    days_till_due?: number;
    urgency_meta?: DueDateUrgencyMetaEntry;
};

export type AssignmentTableProps = {
    assignments: AssignmentMeta[];
    courses?: CourseMeta[];
    loading?: boolean;
};