import { useState } from "react";
import { nanoid } from "nanoid";
import { EventType } from "./types";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface AddEventProps {
  requestClose: () => void;
  saveData: (event: EventType) => void;
}

export default function AddEvent({ requestClose, saveData }: AddEventProps) {
  const [eventForm, setEventForm] = useState<EventType>({
    id: "",
    eventType: "",
    personName: "Hello",
    eventDate: new Date(),
  });

  function handleRadioChange(radioSelection: string) {
    setEventForm((prevVal) => {
      return {
        ...prevVal,
        eventType: radioSelection,
      };
    });
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
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

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (eventForm.personName != "" && eventForm.eventDate != null) {
      let _eventCard = { ...eventForm, id: nanoid() };
      console.log(_eventCard);
      // saveData(_eventCard);
      // requestClose();
      // setEvents((prevVal) => [...prevVal, _eventCard])
    }
  }

  return (
    <form className="p-2" onSubmit={handleFormSubmit}>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Add a new event
      </h3>

      {/* Select type of event; Birthday or Anniversary */}
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
          <RadioGroupItem value="Anniversary" id="r3" />
          <Label htmlFor="r3">Anniversary</Label>
        </div>
      </RadioGroup>

      <fieldset className="mt-4">
        <legend>What's the celebration? *</legend>
        <input
          required={true}
          id="birthday"
          className="peer/birthday"
          type="radio"
          name="eventType"
          value="birthday"
          onChange={handleOnChange}
          checked={eventForm.eventType === "birthday"}
        />
        <label
          htmlFor="birthday"
          className="peer-checked/birthday:text-sky-500"
        >
          Birthday
        </label>
        <input
          id="anniversary"
          className="peer/anniversary"
          type="radio"
          name="eventType"
          value="anniversary"
          onChange={handleOnChange}
          checked={eventForm.eventType === "anniversary"}
        />
        <label
          htmlFor="anniversary"
          className="peer-checked/anniversary:text-sky-500"
        >
          Anniversary
        </label>
        <div className="hidden peer-checked/birthday:block">
          Number of years on this blue planet
        </div>
        <div className="hidden peer-checked/anniversary:block">
          Celebrating years together
        </div>
      </fieldset>
      {/* Name input for the event */}
      <label>
        <span className="block mt-6 text-sm font-medium text-slate-700">
          Name of the human *
        </span>
        <input
          className="peer block mt-1 w-full px-3 py-2 bg-white border border-black rounded-md text-sm shadow-sm placeholder-slate-400"
          type="text"
          name="personName"
          onChange={handleOnChange}
          value={eventForm.personName}
        />
        <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
          Please provide a valid name.
        </p>
      </label>
      <br />
      {/* Date Input for the event. The description / label should be dynamic */}
      <label>
        <span className="block text-sm font-medium text-slate-700">
          When was their birthday?
        </span>
        <input
          type="date"
          className="mt-4"
          name="eventDate"
          onChange={handleOnChange}
          value={eventForm.eventDate?.toString()}
        />
      </label>

      <button className="mt-6 bg-slate-800 p-4 rounded-md text-white">
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
