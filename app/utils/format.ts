import { DateTime } from 'luxon';

export const formatDateTime = (isoDate: string): string => {
    return DateTime.fromISO(isoDate).toFormat('MMMM d, h:mm a');
};