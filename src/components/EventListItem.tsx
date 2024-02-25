import { format, differenceInYears, differenceInCalendarDays } from "date-fns";
import { EventType } from "./types";

// X days to go - for the current year. If date < today, then show none, if > then calc distance from current day to coming day in days
// Data in format Fri, 2nd Apr. This NEEDS to be set to THIS YEAr or else day will be wrong!! Lol

// Helper function to create numbers like 1st, 2nd, 3rd, etc...
function ordinal_suffix_of(i: number) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

// Helper function to write the age text
function writeAgeText(eventType: string, eventDate: string): string {
  // No age text for unknown events
  let _ageText = "";
  // Calculate difference in Years. Need to add 1 year for some reason?
  let _years = differenceInYears(new Date(), new Date(eventDate));

  // Check type of event and create age text
  if (eventType == "birthday") {
    _ageText = `Turning ${_years + 1}`;
  } else if (eventType == "anniversary") {
    _ageText = `Celebrating ${ordinal_suffix_of(_years)}`;
  }
  return _ageText;
}

// Helper function to calculate days to go
function calcDaysToGo(eventDate: string): number {
  let _today = new Date();
  console.log(_today);
  let _eventThisYear = changeEventDateToThisYear(eventDate);
  console.log(_eventThisYear);
  console.log(differenceInCalendarDays(_eventThisYear, _today));
  return differenceInCalendarDays(_eventThisYear, _today);
}

// Helper function to change event date to this year
function changeEventDateToThisYear(eventDate: string): Date {
  let _today = new Date();
  let _eventThisYear = new Date(
    new Date(eventDate).setFullYear(_today.getFullYear())
  );
  return _eventThisYear;
}

// EventListItemProps which also includes onSelection in our case
interface EventListItemProps extends EventType {
  onSelection: (id: string) => void;
}

// EventListItem. TODO  - Add interests
export default function EventListItem({
  id,
  eventType,
  personName,
  eventDate,
  interests,
  onSelection,
}: EventListItemProps) {
  return (
    <div className="max-w-md px-2" onClick={() => onSelection(id)}>
      <div className="flex flex-row justify-between mb-1">
        {/* Event Type */}
        <p className="text-sm text-rose-600 font-medium leading-none">
          {eventType}
        </p>

        {/* Turning X for Birthday or celebrating Xst/Xnd/Xrd for wedding */}
        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {calcDaysToGo(eventDate) > 0
            ? `${calcDaysToGo(eventDate)} days to go`
            : "Today!"}
        </h2>
      </div>

      {/* Person's Name */}
      <h2 className="text-2xl text-cprimary_dark mb-2">{personName}</h2>

      <div className="flex flex-row justify-between">
        <div className="inline-flex gap-2">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            {writeAgeText(eventType, eventDate)}
            {" on "}
            {format(changeEventDateToThisYear(eventDate), "iii, do LLL")}
          </p>
        </div>

        <div>Get Gift ideas</div>
      </div>
      <hr className="mt-2" />
    </div>
  );
}
