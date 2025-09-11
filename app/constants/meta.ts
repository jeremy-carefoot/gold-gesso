import type { GradingType } from "~/types/assignment";

type GradingTypeMetaEntry = {
    label: string;
    color: string;
};
export const GradingTypeMeta: Record<GradingType, GradingTypeMetaEntry> = {
    pass_fail: {
        label: 'Pass/Fail',
        color: '#4CAF50'
    },
    points: {
        label: 'Points',
        color: '#2196F3'
    },
    letter_grade: {
        label: 'Letter Grade',
        color: '#9C27B0'
    },
    percent: {
        label: 'Percent',
        color: '#009688'
    },
    gpa_scale: {
        label: 'GPA Scale',
        color: '#3F51B5'
    },
    not_graded: {
        label: 'Not Graded',
        color: '#9E9E9E'
    }
};