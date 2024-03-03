// New form for adding events. Only the form, not the overlay.

import { EventType } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const formSchema: z.ZodType<EventType> = z.object({
  id: z.string(),
  eventType: z.string(),
  personName: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .max(50, "Username cannot be more than 50 characters."),
  eventDate: z.string(),
});

const formDefaultValues: EventType = {
  id: "",
  eventType: "birthday",
  personName: "",
  eventDate: "",
};

export default function AddEventForm() {
  // 1. Define your form. Defauls have to be defined or Submit will NOT work! Weird. No error message is thrown.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log("Form values");
    console.log(values);
  }

  function onErrors(errors: any) {
    console.log("Errors");
    console.log(errors);
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
                <Input placeholder="Placeholder from form" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
