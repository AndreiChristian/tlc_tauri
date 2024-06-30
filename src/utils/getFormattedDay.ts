import { format } from "date-fns";

export function getFormattedDay(date: Date) {
  return format(date, "EEEE, MMMM d, yyyy")
}
