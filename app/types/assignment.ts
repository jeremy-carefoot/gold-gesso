export type GradingType = 'pass_fail' | 'points' | 'letter_grade' | 'percent' | 'gpa_scale' | 'not_graded';

export interface AssignmentMeta {
    id: number;
    assignment_id: number;
    name: string;
    description: string;
    due_at: string | null;
    unlock_at: string | null;
    lock_at: string | null;
    points_possible: number;
    grade_group_students_individually: boolean;
    allowed_attempts: number;
    is_submitted: boolean;
    is_custom: boolean;
    grading_type: GradingType;
    course_ref: number;
    user_ref: number;
};