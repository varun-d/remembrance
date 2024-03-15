import { useState } from "react";
import { nanoid } from "nanoid";
import { EventType } from "./types";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface AddEventProps {
  requestClose: () => void;
  saveData: (event: EventType) => void;
}

export default function AddEvent({ requestClose, saveData }: AddEventProps) {
  const [eventForm, setEventForm] = useState<EventType>({
    id: "",
    eventType: "general_event",
    personName: "",
    eventDate: new Date().toISOString().slice(0, 10),
  });

  function handleRadioChange(radioSelection: string) {
    setEventForm((prevVal) => {
      return {
        ...prevVal,
        eventType: radioSelection,
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
    <form className="p-2" onSubmit={handleFormSubmit}>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Add a new event
      </h3>

      {/* Select type of event; Birthday or Anniversary */}
      <div className="grid mt-8 w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="event-type">What's the celebration? *</Label>
        <RadioGroup
          onValueChange={handleRadioChange}
          defaultValue="general_event"
          id="event-type"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="general_event" id="r1" />
            <Label htmlFor="r1">General Event</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="birthday" id="r2" />
            <Label htmlFor="r2">Birthday</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="anniversary" id="r3" />
            <Label htmlFor="r3">Anniversary</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Name input for the event */}

      <div className="grid mt-8 w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="personName">
          {eventForm.eventType === "general_event" ? `What` : `Who`} are you
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
      <div className="grid mt-8 w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="eventDate">Event Date</Label>
        <input
          type="date"
          name="eventDate"
          onChange={handleDateChange}
          value={eventForm.eventDate}
        />
      </div>

      <button className="mt-8 bg-slate-800 p-4 rounded-md text-white">
        Save event
      </button>

      <button
        className="mt-6 ml-4 bg-slate-800 p-4 rounded-md text-white"
        onClick={requestClose}
        type="button"
      >
        Cancel
      </button>
    </form>
  );
}
