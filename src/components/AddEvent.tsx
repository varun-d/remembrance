import { useState } from "react";
import { nanoid } from "nanoid";
import { EventType, TypesOfEvents } from "./types";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";

interface AddEventProps {
  requestClose: () => void;
  saveData: (event: EventType) => void;
}

export default function AddEvent({ requestClose, saveData }: AddEventProps) {
  const [eventForm, setEventForm] = useState<EventType>({
    id: "",
    eventType: TypesOfEvents.general_event,
    personName: "",
    eventDate: new Date().toISOString().slice(0, 10),
  });

  function handleRadioChange(radioSelection: string) {
    setEventForm((prevVal) => {
      return {
        ...prevVal,
        eventType: radioSelection as TypesOfEvents,
      };
    });
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    console.log(value);
    setEventForm((prevVal) => {
      return {
        ...prevVal,
        personName: value,
      };
    });
  }

  function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    console.log(value);
    setEventForm((prevVal) => {
      return {
        ...prevVal,
        eventDate: value,
      };
    });
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (eventForm.personName != "" && eventForm.eventDate != null) {
      let _eventCard = { ...eventForm, id: nanoid() };
      console.log(_eventCard);
      saveData(_eventCard);
      requestClose();
    }
  }

  return (
    <form className="p-2 m-auto" onSubmit={handleFormSubmit}>
      <h3 className="mt-2 scroll-m-20 text-2xl font-semibold tracking-tight">
        Add a new event
      </h3>

      {/* Select type of event; Birthday or Anniversary */}
      <div className="grid mt-8 w-full items-center gap-1.5">
        <Label htmlFor="event-type">What's the celebration? *</Label>
        <RadioGroup
          onValueChange={handleRadioChange}
          defaultValue="General Event"
          id="event-type"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="General Event" id="r1" />
            <Label htmlFor="r1">General Event</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Birthday" id="r2" />
            <Label htmlFor="r2">Birthday</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Anniversary" id="r3" />
            <Label htmlFor="r3">Anniversary</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Name input for the event */}

      <div className="grid mt-8 w-full items-center gap-1.5">
        <Label htmlFor="personName">
          {eventForm.eventType === "General Event" ? `What` : `Who`} are you
          celebrating?
        </Label>
        <Input
          required={true}
          type="text"
          id="personName"
          placeholder="Name"
          onChange={handleNameChange}
        />
      </div>

      <br />
      {/* Date Input for the event. The description / label should be dynamic */}
      <div className="grid mt-8 w-full items-center gap-1.5">
        <Label htmlFor="eventDate">Event Date</Label>
        <input
          type="date"
          name="eventDate"
          onChange={handleDateChange}
          value={eventForm.eventDate}
        />
      </div>
      <div className="grid mt-8 w-full items-center gap-1.5">
        <Button>Save event</Button>
        <Button variant="secondary" onClick={requestClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
