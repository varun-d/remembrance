import moment from "moment";

export function daysToGoString(daysToGo: number): string {
  if (daysToGo < 0) {
    return "Done!";
  } else if (daysToGo === 0) {
    return "Today!";
  } else if (daysToGo <= 1 && daysToGo > 0) {
    return "Tomorrow!";
  } else if (daysToGo >= 1 && daysToGo < 2) {
    return `${Math.floor(daysToGo)} day to go`;
  } else {
    return `${Math.floor(daysToGo)} days to go`;
  }
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
