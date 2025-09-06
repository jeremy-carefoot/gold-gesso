import { DateTime } from 'luxon';

export const utilPx = (px: number): string => {
    return `${px}px`;
};

export const formatDateTime = (isoDate: string): string => {
    return DateTime.fromISO(isoDate).toFormat('MMMM d, h:mm a');
};