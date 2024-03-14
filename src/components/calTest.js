import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { format, isValid, parse } from "date-fns";
import { DayPicker } from "react-day-picker";
// import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
export default function DatePickerDialog() {
    const [selected, setSelected] = useState();
    const [inputValue, setInputValue] = useState("");
    const [isPopperOpen, setIsPopperOpen] = useState(false);
    const buttonRef = useRef(null);
    const handleInputChange = (e) => {
        setInputValue(e.currentTarget.value);
        const date = parse(e.currentTarget.value, "y-MM-dd", new Date());
        if (isValid(date)) {
            setSelected(date);
        }
        else {
            setSelected(undefined);
        }
    };
    const handleButtonClick = () => {
        setIsPopperOpen(true);
    };
    const handleDaySelect = (date) => {
        setSelected(date);
        if (date) {
            setInputValue(format(date, "y-MM-dd"));
        }
        else {
            setInputValue("");
        }
    };
    return (_jsxs("div", { children: [_jsxs("div", { children: [_jsx("input", { size: 12, type: "date", placeholder: format(new Date(), "y-MM-dd"), value: inputValue, onChange: handleInputChange, className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" }), _jsx("button", { ref: buttonRef, type: "button", "aria-label": "Pick a date", onClick: handleButtonClick, children: "Pick a date" })] }), isPopperOpen && (_jsx("div", { children: _jsx("div", { tabIndex: -1, className: "", role: "dialog", "aria-label": "DayPicker calendar", children: _jsx(DayPicker, { initialFocus: isPopperOpen, mode: "single", defaultMonth: selected, selected: selected, onSelect: handleDaySelect }) }) }))] }));
}
