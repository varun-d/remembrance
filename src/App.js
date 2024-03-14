import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import Header from "./components/Header";
import EventListItem from "./components/EventListItem";
import { FilePlusIcon } from "@radix-ui/react-icons";
import { daysToGoNumber } from "./lib/utils";
import AddEventForm from "./components/AddEventForm";
import AddEventOverlay from "./components/AddEventOverlay";
function App() {
    // State for events
    const [events, setEvents] = useState([]);
    const [showAddNew, setShowAddNew] = useState(true);
    // State for selected event. To view, edit or delete.
    // const [selectedEventID, setSelectedEventID] = useState("");
    useEffect(() => {
        // Load events if they exist in local storage
        const savedData = localStorage.getItem("events");
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                // Sort based on calculated daysToGo
                const sortedEvents = [...parsedData].sort((a, b) => {
                    return daysToGoNumber(a.eventDate) - daysToGoNumber(b.eventDate);
                });
                setEvents(sortedEvents);
            }
            catch (error) {
                console.error("Error parsing data from localStorage:", error);
            }
        }
    }, []);
    useEffect(() => {
        // Save events to localStorage when 'events' changes
        if (events.length > 0) {
            console.log(`Saving ${events.length} events to localStorage`);
            localStorage.setItem("events", JSON.stringify(events));
        }
    }, [events]);
    // Handler function when "Save" is clicked in AddEvent
    const handleSaveData = (data) => {
        console.log("Saving in parent", data);
        setEvents((prevVal) => [...prevVal, data]);
    };
    // Future Releases handler function when an Event is clicked to view it, edit or delete it
    // const handleClickEventList = (eventId: string) => {
    //   setSelectedEventID(eventId);
    //   console.log("Selected Event", eventId);
    //   // dispatchMode("editEvent");
    // };
    const handleClickEventDeleteFx = (eventId) => {
        // delete and create copy of new state here events setEvents
        let newEventList = events.filter((event) => {
            return event.id !== eventId;
        });
        // This was important! Need to close view!
        // Otherwise, got the React 16+ Warning: Cannot update a component * while rendering a different component *
        // dispatchMode("closeAll");
        console.log(newEventList);
        setEvents(newEventList);
    };
    // Map over events to create array of EventListItem
    const eventList = events?.map((item) => {
        // TBD pass object instead of primitives!)
        return (_jsx(EventListItem, { id: item.id, eventType: item.eventType, personName: item.personName, eventDate: item.eventDate, onDelete: (selectedID) => handleClickEventDeleteFx(selectedID) }, item.id));
    });
    return (_jsxs("main", { className: "max-w-xl mx-auto", children: [_jsx(Header, { title: "Remembrance" }), _jsx("section", { className: "container p-4", children: _jsx("p", { className: "text-sm text-muted-foreground", children: "A Chrome new-tab app to see events 7 and 14 days before they happen. Be prepared days before the event!" }) }), _jsxs("section", { className: "container p-4 inline-flex justify-between", children: [_jsx("h1", { className: "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0", children: "Upcoming events" }), " ", _jsxs(Button, { onClick: () => setShowAddNew(!showAddNew), children: [_jsx(FilePlusIcon, { className: "mr-2 h-4 w-4" }), " Add Event"] })] }), _jsx("section", { className: "container p-4", children: _jsx("div", { className: "mt-6 flex flex-col gap-8", children: eventList }) }), showAddNew && (
            // <AddEvent
            //   requestClose={() => setShowAddNew(!showAddNew)}
            //   saveData={(data) => handleSaveData(data)}
            // />
            _jsx(AddEventOverlay, { requestClose: () => setShowAddNew(!showAddNew), children: _jsx(AddEventForm, { requestClose: () => setShowAddNew(!showAddNew), saveData: (data) => handleSaveData(data) }) }))] }));
}
export default App;
