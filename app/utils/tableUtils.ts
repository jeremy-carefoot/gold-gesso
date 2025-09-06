import type { TableRow } from "@nuxt/ui";
import { DateTime } from 'luxon';

export const luxonSortByDate = <T>(
    rowA: TableRow<T>,
    rowB: TableRow<T>,
    columnId: string
) => {
  const valueA = rowA.getValue(columnId) as string | null;
  const valueB = rowB.getValue(columnId) as string | null;

  if (!valueA && !valueB) {
    return 0; // Treat as equal if both are empty
  }
  if (!valueA) {
    return 1; // If A is empty, it should go after B
  }
  if (!valueB) {
    return -1; // If B is empty, it should go after A
  }

  // Convert the ISO strings to Luxon DateTime objects for comparison.
  const dateA = DateTime.fromISO(valueA);
  const dateB = DateTime.fromISO(valueB);

  // Compare the dates.
  let comparison = 0;
  if (dateA.toMillis() < dateB.toMillis()) {
    comparison = -1;
  } else if (dateA.toMillis() > dateB.toMillis()) {
    comparison = 1;
  }

  return comparison;
};