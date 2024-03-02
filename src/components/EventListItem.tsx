import { EventType } from "./types";
import { IconTrashX } from "@tabler/icons-react";
import moment from "moment";

// EventListItemProps which also includes onSelection in our case
interface EventListItemProps extends EventType {
  // onSelection: (id: string) => void;
  onDelete: (id: string) => void;
}

// Calculate days to go
function daysToGo(date: string): string {
  const today = moment();
  let target = moment(date);

  // Set the date of target to this year. So diff can be calculated.
  target = target.year(today.year());
  console.log(target);
  if (target.isBefore(today, "day")) {
    return "Done!";
  } else if (target.isSame(today, "day")) {
    return "Today!";
  } else {
    let _numdays = target.diff(today, "days");
    return `${_numdays} days to go`;
  }
}

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

// Using Moment.js write a function given a date string calculate the age of the person for the event. If event type is birthday, return "Turning X" where X is the age. If event type is anniversary, return "Celebrating Xst/Xnd/Xrd" where X is the age.

function writeAgeText(eventType: string, eventDate: string): string {
  let _eventDate = moment(eventDate);
  let _today = moment();
  let _age = _today.diff(_eventDate, "years");
  console.log(_age);
  console.log(_eventDate);
  if (eventType === "birthday") {
    return `Turning ${_age}`;
  } else if (eventType === "anniversary") {
    return `Celebrating ${ordinal_suffix_of(_age)}`;
  } else {
    return "Unknown";
  }
}

export default function EventListItem({
  id,
  eventType,
  personName,
  eventDate,
  onDelete,
}: EventListItemProps) {
  return (
    <div className="max-w-xl px-2">
      <div className="flex flex-row justify-between mb-1">
        {/* Event Type */}
        <p className="text-sm text-primary font-medium leading-none">
          {eventType} {eventType === "birthday" ? "🎂" : "🎉"} .circa{" "}
          {moment(eventDate).format("YYYY")}
        </p>

        {/* Turning X for Birthday or celebrating Xst/Xnd/Xrd for wedding */}
        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {daysToGo(eventDate)}
        </h2>
      </div>

      {/* Person's Name */}
      <h2 className="text-2xl text-cprimary_dark mb-2">{personName}</h2>

      <div className="flex flex-row justify-between">
        <div className="inline-flex gap-2">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            {writeAgeText(eventType, eventDate)}
            {" on "}
            {moment(eventDate).format("ddd, Do MMM")}
          </p>
        </div>
        <div className="inline-flex gap-2">
          {/* <IconEdit size={24} /> */}
          <IconTrashX
            className="m-1 text-red-800 hover:text-red-700 cursor-pointer"
            size={24}
            onClick={() => onDelete(id)}
          />
        </div>
      </div>
      <hr className="mt-2" />
    </div>
  );
}
