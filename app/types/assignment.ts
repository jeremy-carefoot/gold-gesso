export type GradingType = 'pass_fail' | 'points' | 'letter_grade' | 'percent' | 'gpa_scale' | 'not_graded';

export interface AssignmentMeta {
    id: number;
    name: string;
    description: string;
    due_at: string | null;
    unlock_at: string | null;
    lock_at: string | null;
    points_possible: number;
    grade_group_students_individually: boolean;
    allowed_attempts: number;
    has_submitted_submissions: boolean;
    course_id: number;
    grading_type: GradingType;
    course_ref: number;
    user_ref: number;
};