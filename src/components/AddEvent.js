import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { nanoid } from "nanoid";
export default function AddEvent({ requestClose, saveData }) {
    const [eventForm, setEventForm] = useState({
        id: "",
        eventType: "",
        personName: "Hello",
        eventDate: new Date(),
    });
    function handleOnChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case "personName":
                setEventForm((prevVal) => {
                    return {
                        ...prevVal,
                        personName: value,
                    };
                });
                break;
            // case "interests":
            //   const interestsArray = value.split(",");
            //   setEventForm((prevVal) => {
            //     return {
            //       ...prevVal,
            //       interests: interestsArray.map((item) => item.trim()),
            //     };
            //   });
            //   break;
            default:
                setEventForm((prevVal) => {
                    return {
                        ...prevVal,
                        [name]: value,
                    };
                });
        }
    }
    function handleFormSubmit(event) {
        event.preventDefault();
        if (eventForm.personName != "" && eventForm.eventDate != null) {
            let _eventCard = { ...eventForm, id: nanoid() };
            console.log(_eventCard);
            saveData(_eventCard);
            requestClose();
            // setEvents((prevVal) => [...prevVal, _eventCard])
        }
    }
    return (_jsx("div", { className: "fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50", children: _jsxs("form", { className: "bg-white p-8 rounded", onSubmit: handleFormSubmit, children: [_jsx("h1", { className: "text-3xl", children: "Let's add a new event" }), _jsxs("fieldset", { className: "mt-6", children: [_jsx("legend", { children: "What's the celebration? *" }), _jsx("input", { required: true, id: "birthday", className: "peer/birthday", type: "radio", name: "eventType", value: "birthday", onChange: handleOnChange, checked: eventForm.eventType === "birthday" }), _jsx("label", { htmlFor: "birthday", className: "peer-checked/birthday:text-sky-500", children: "Birthday" }), _jsx("input", { id: "anniversary", className: "peer/anniversary", type: "radio", name: "eventType", value: "anniversary", onChange: handleOnChange, checked: eventForm.eventType === "anniversary" }), _jsx("label", { htmlFor: "anniversary", className: "peer-checked/anniversary:text-sky-500", children: "Anniversary" }), _jsx("div", { className: "hidden peer-checked/birthday:block", children: "Number of years on this blue planet" }), _jsx("div", { className: "hidden peer-checked/anniversary:block", children: "Celebrating years together" })] }), _jsxs("label", { children: [_jsx("span", { className: "block mt-6 text-sm font-medium text-slate-700", children: "Name of the human *" }), _jsx("input", { className: "peer block mt-1 w-full px-3 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400", type: "text", name: "personName", onChange: handleOnChange, value: eventForm.personName }), _jsx("p", { className: "mt-2 invisible peer-invalid:visible text-pink-600 text-sm", children: "Please provide a valid name." })] }), _jsx("br", {}), _jsxs("label", { children: [_jsx("span", { className: "block text-sm font-medium text-slate-700", children: "When was their birthday?" }), _jsx("input", { type: "date", className: "mt-4", name: "eventDate", onChange: handleOnChange, value: eventForm.eventDate?.toString() })] }), _jsx("button", { className: "mt-6 bg-slate-800 p-4 rounded-md text-white", children: "Save event" }), _jsx("button", { className: "mt-6 ml-4 bg-slate-800 p-4 rounded-md text-white", onClick: requestClose, type: "button", children: "Cancel" })] }) }));
}
