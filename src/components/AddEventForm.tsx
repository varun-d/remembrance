// New form for adding events. Only the form, not the overlay.
// @ts-ignore
import { EventType } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { nanoid } from "nanoid";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { Calendar } from "./ui/calendar";

const formSchema: z.ZodType<EventType> = z.object({
  id: z.string(),
  eventType: z.string(),
  personName: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .max(50, "Username cannot be more than 50 characters."),
  eventDate: z.coerce.date({
    required_error: "A date is required.",
  }),
});

const formDefaultValues: EventType = {
  id: "",
  eventType: "birthday",
  personName: "",
  eventDate: new Date("yyyy-MM-dd"),
};

interface propsInterface {
  requestClose: () => void;
  saveData: (event: any) => void;
}

export default function AddEventForm({
  saveData,
  requestClose,
}: propsInterface) {
  // 1. Define your form. Defauls have to be defined or Submit will NOT work! Weird. No error message is thrown.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // Add id to values:
    let _eventsWithID = { ...values, id: nanoid() };
    // Close dialog box
    requestClose();
    // Save to main state
    console.log("Saving these form values:: ", _eventsWithID);
    saveData(_eventsWithID);
  }

  function onErrors(errors: any) {
    console.log("Errors:: ", errors);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onErrors)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="personName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of the human *</FormLabel>
              <FormControl>
                <Input placeholder="John Smooth" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Type of event: </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="birthday" />
                    </FormControl>
                    <FormLabel className="font-normal">Birthday</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="anniversary" />
                    </FormControl>
                    <FormLabel className="font-normal">Anniversary</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth: </FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Placeholder from form"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit">Submit</Button>
          <Button type="submit" onClick={requestClose} variant="ghost">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

/*
        <FormField
          control={form.control}
          name="eventDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
*/
