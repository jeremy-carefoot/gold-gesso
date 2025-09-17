import type { GradingType } from "~/types/assignment";

export type CourseSelectOption = {
    id: number;
    label: string;
};

export type CreateAssignmentModalProps = {
    courses: CourseSelectOption[];
};

export type NewAssignment = {
    name: string;
    course_ref: number;
    description?: string;
    due_at?: string;
    grading_type?: GradingType;
    is_submitted: boolean;
};