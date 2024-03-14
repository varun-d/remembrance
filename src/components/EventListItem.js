import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { IconTrashX } from "@tabler/icons-react";
import { daysToGoNumber } from "../lib/utils";
import moment from "moment";
// Helper function to create numbers like 1st, 2nd, 3rd, etc...
function ordinal_suffix_of(i) {
    var j = i % 10, k = i % 100;
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
export function daysToGoString(daysToGo) {
    if (daysToGo < 0) {
        return "Done!";
    }
    else if (daysToGo === 0) {
        return "Today 🥰";
    }
    else if (daysToGo <= 1 && daysToGo > 0) {
        return "Tomorrow 🥰";
    }
    else if (daysToGo >= 1 && daysToGo < 2) {
        return `${Math.floor(daysToGo)} day to go❗`;
    }
    else if (daysToGo >= 2 && daysToGo < 7) {
        return `${Math.floor(daysToGo)} days to go❗`;
    }
    else {
        return `${Math.floor(daysToGo)} days to go`;
    }
}
// Using Moment.js write a function given a date string calculate the age of the person for the event. If event type is birthday, return "Turning X" where X is the age. If event type is anniversary, return "Celebrating Xst/Xnd/Xrd" where X is the age.
function writeCelebrationText(eventType, eventDate) {
    let _eventDate = moment(eventDate);
    let _today = moment();
    let _age = _today.diff(_eventDate, "years");
    if (eventType === "birthday") {
        return `Turning ${_age}`;
    }
    else if (eventType === "anniversary") {
        return `Celebrating their ${ordinal_suffix_of(_age)}`;
    }
    else {
        return "Unknown";
    }
}
export default function EventListItem({ id, eventType, personName, eventDate, onDelete, }) {
    return (_jsxs("div", { className: "max-w-xl px-2", children: [_jsxs("div", { className: "flex flex-row justify-between mb-1", children: [_jsxs("p", { className: "text-sm text-primary font-medium leading-none", children: [eventType, " ", eventType === "birthday" ? "🎂" : "🎉", " .circa", " ", moment(eventDate).format("YYYY")] }), _jsx("h2", { className: "scroll-m-20 text-xl font-semibold tracking-tight", children: daysToGoString(daysToGoNumber(eventDate)) })] }), _jsx("h2", { className: "text-2xl text-cprimary_dark mb-2", children: personName }), _jsxs("div", { className: "flex flex-row justify-between", children: [_jsx("div", { className: "inline-flex gap-2", children: _jsxs("p", { className: "leading-7 [&:not(:first-child)]:mt-6", children: [writeCelebrationText(eventType, eventDate), " on ", moment(eventDate).format("ddd, Do MMM")] }) }), _jsx("div", { className: "inline-flex gap-2", children: _jsx(IconTrashX, { className: "m-1 text-red-800 hover:text-red-700 cursor-pointer", size: 24, onClick: () => onDelete(id) }) })] }), _jsx("hr", { className: "mt-2" })] }));
}
