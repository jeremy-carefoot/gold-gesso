import type { GradingType } from "~/types/assignment";

export type GradingTypeMetaEntry = {
    label: string;
    color: string;
    textColor: string;
};
export const GradingTypeMeta: Record<GradingType, GradingTypeMetaEntry> = {
    pass_fail: {
        label: 'Pass/Fail',
        color: '#c8e6c9',
        textColor: '#1b5e20'
    },
    points: {
        label: 'Points',
        color: '#bbdefb',
        textColor: '#0d47a1'
    },
    letter_grade: {
        label: 'Letter Grade',
        color: '#e1bee7',
        textColor: '#4a148c'
    },
    percent: {
        label: 'Percent',
        color: '#b2dfdb',
        textColor: '#004d40'
    },
    gpa_scale: {
        label: 'GPA Scale',
        color: '#c5cae9',
        textColor: '#1a237e'
    },
    not_graded: {
        label: 'Not Graded',
        color: '#f5f5f5',
        textColor: '#424242'
    }
};

export type DueDateUrgencyMetaEntry = {
    maxDays: number;
    color: string;
    icon?: string;
    label?: string;
};
export const DueDateUrgencyMeta: Record<string, DueDateUrgencyMetaEntry> = {
    overdue: {
        maxDays: -1,
        color: '#ef4444',
        icon: 'material-symbols:warning',
        label: 'Overdue'
    },
    critical: {
        maxDays: 1,
        color: '#f87171',
        icon: 'material-symbols:priority-high'
    },
    urgent: {
        maxDays: 3,
        color: '#fb923c',
    },
    moderate: {
        maxDays: 7,
        color: '#fbbf24',
    },
    comfortable: {
        maxDays: 14,
        color: '#60a5fa',
    },
    plenty: {
        maxDays: Infinity,
        color: '#9ca3af',
    }
};

export const getDueDateUrgency = (daysUntilDue: number): keyof typeof DueDateUrgencyMeta => {
    const sortedEntries = Object.entries(DueDateUrgencyMeta)
        .sort(([, a], [, b]) => a.maxDays - b.maxDays);

    for (const [key, meta] of sortedEntries) {
        if (daysUntilDue <= meta.maxDays) {
            return key;
        }
    }

    return 'plenty';
};