import { useState, useEffect, useReducer } from "react";
import { Button } from "./components/ui/button";
import Header from "./components/Header";
import AddEvent from "./components/ui/AddEvent";
import { EventType } from "./components/types";
import EventListItem from "./components/EventListItem";

function App() {
  // State for events
  const [events, setEvents] = useState<EventType[]>([]);
  const [showAddNew, setShowAddNew] = useState(false);
  // State for selected event. To view, edit or delete.
  const [selectedEventID, setSelectedEventID] = useState("");

  useEffect(() => {
    // Load events if they exist in local storage
    const savedData = localStorage.getItem("events");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setEvents(parsedData);
      } catch (error) {
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
  const handleSaveData = (data: EventType) => {
    console.log("Saving in parent", data);
    setEvents((prevVal) => [...prevVal, data]);
  };

  // handler function when an Event is clicked to view it, edit or delete it
  const handleClickEventList = (eventId: string) => {
    setSelectedEventID(eventId);
    console.log("Selected Event", eventId);
    // dispatchMode("editEvent");
  };

  // const handleClickEventDetailDeleteFx = (eventId: string) => {
  //   // delete and create copy of new state here events setEvents
  //   let newEventList = events.filter((event) => {
  //     return event.id !== eventId;
  //   });
  //   // This was important! Need to close view!
  //   // Otherwise, got the React 16+ Warning: Cannot update a component * while rendering a different component *
  //   dispatchMode("closeAll");
  //   console.log(newEventList);
  //   setEvents(newEventList);
  // };

  // Map over events to create array of EventListItem
  const eventList = events?.map((item) => {
    // TBD pass object instead of primitives!
    return (
      <EventListItem
        key={item.id}
        id={item.id}
        eventType={item.eventType}
        personName={item.personName}
        eventDate={item.eventDate}
        interests={item.interests}
        onSelection={(selectedID) => handleClickEventList(selectedID)}
      />
    );
  });

  return (
    <main className="max-w-xl mx-auto">
      <Header title="Remembrance" />
      {/* Add the card here for birthdays */}
      {/* Add a button here to add cards */}
      <section className="container mx-auto p-4 inline-flex justify-between">
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Upcoming events
        </h1>{" "}
        <Button onClick={() => setShowAddNew(!showAddNew)}>+ Event</Button>
      </section>
      <section className="container mx-auto p-4"></section>
      <section className="container mx-auto p-4">
        <div className="mt-8 flex flex-col gap-8">{eventList}</div>
      </section>
      {showAddNew && (
        <AddEvent
          requestClose={() => setShowAddNew(!showAddNew)}
          saveData={(data) => handleSaveData(data)}
        />
      )}
    </main>
  );
}

export default App;
