import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function daysToGoNumber(date: string): number {
  const today = moment();
  let target = moment(date);

  // Set the date of target to this year. So diff can be calculated.
  target = target.year(today.year());
  if (target.isBefore(today, "day")) {
    // If event is done, change year to next year and re-calc!
    let targetNextYear = target.year(today.year() + 1);
    let _numDaysNextYear = targetNextYear.diff(today, "days", true);
    return _numDaysNextYear;
  } else if (target.isSame(today, "day")) {
    return 0;
  } else {
    let _numdays = target.diff(today, "days", true);
    return _numdays;
  }
}
// This isn't right. Hard coded values in case. What if data changes?
export function getFriendlyEventName(eventType: string) {
  switch (eventType) {
    case "general event":
      return "General Event";
    case "Birthday":
      return "Birthday 🎂";
    case "Anniversary":
      return "Anniversary 🎉";
    default:
      return "General Event 🎉";
  }
}
