import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import Header from "./components/Header";
import { EventType } from "./components/types";
import EventListItem from "./components/EventListItem";
import { FilePlusIcon } from "@radix-ui/react-icons";
import { daysToGoNumber, getFriendlyEventName } from "./lib/utils";
import AddEventForm from "./components/AddEventForm_bck";
import AddEventOverlay from "./components/AddEventOverlay";
import AddEvent from "./components/AddEvent";
import { ToastAction } from "./components/ui/toast";
import { useToast } from "./components/ui/use-toast";
import StateZero from "./components/StateZero";

function App() {
  // State for events
  const [events, setEvents] = useState<EventType[]>([]);
  const [showAddNew, setShowAddNew] = useState(false);
  // State for selected event. To view, edit or delete.
  // const [selectedEventID, setSelectedEventID] = useState("");

  const { toast } = useToast();

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

    if (events.length === 0) {
      localStorage.removeItem("events");
    }
  }, [events]);

  // Handler function when "Save" is clicked in AddEvent
  const handleSaveData = (data: EventType) => {
    console.log("Saving in parent", data);
    setEvents((prevVal) => [...prevVal, data]);

    // Show toast
    toast({
      title: `Event added for ${data.personName}!`,
      description: getFriendlyEventName(data.eventType),
    });
  };

  // Future Releases handler function when an Event is clicked to view it, edit or delete it
  // const handleClickEventList = (eventId: string) => {
  //   setSelectedEventID(eventId);
  //   console.log("Selected Event", eventId);
  //   // dispatchMode("editEvent");
  // };

  const handleClickEventDeleteFx = (eventId: string) => {
    // delete and create copy of new state here events setEvents
    let newEventList = events.filter((event) => {
      return event.id !== eventId;
    });
    console.log("Deleting Event", newEventList);
    setEvents(newEventList);

    toast({
      duration: 2000,
      variant: "destructive",
      title: `Event deleted!`,
      // action: <ToastAction altText="Added Event">Undo</ToastAction>, // Future! Undo delete
    });
  };

  // Map over events to create array of EventListItem
  const eventList = events?.map((item) => {
    // TBD pass object instead of primitives!)
    return (
      <EventListItem
        key={item.id}
        id={item.id}
        eventType={item.eventType}
        personName={item.personName}
        eventDate={item.eventDate} // onSelection={(selectedID) => handleClickEventList(selectedID)}
        onDelete={(selectedID) => handleClickEventDeleteFx(selectedID)}
      />
    );
  });

  return (
    <main className="max-w-xl mx-auto">
      <Header title="Remembrance" />
      <section className="container px-4 mt-2">
        <p className="text-sm text-muted-foreground">
          Be reminded of upcoming birthdays and anniversaries 7 days prior. All
          data stored locally.
        </p>
      </section>
      <section className="container px-4 mt-8 inline-flex justify-between">
        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
          Upcoming events
        </h2>{" "}
        {/* <Button onClick={() => setShowAddNew(!showAddNew)}>
          <IconTextPlus size={18} />
          &nbsp; Add New Event
        </Button> */}
        <Button onClick={() => setShowAddNew(!showAddNew)}>
          <FilePlusIcon className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </section>

      <section className="container px-4 mt-2">
        <div className="mt-6 flex flex-col gap-8">{eventList}</div>
      </section>
      {events.length === 0 && (
        <section className="container px-4 mt-2">
          <StateZero />
        </section>
      )}
      {showAddNew && (
        <AddEventOverlay requestClose={() => setShowAddNew(!showAddNew)}>
          <AddEvent
            requestClose={() => setShowAddNew(!showAddNew)}
            saveData={(data) => handleSaveData(data)}
          />
          {/* <AddEventForm
            requestClose={() => setShowAddNew(!showAddNew)}
            saveData={(data) => handleSaveData(data)}
          /> */}
        </AddEventOverlay>
      )}
    </main>
  );
}

export default App;
