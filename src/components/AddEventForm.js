import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { nanoid } from "nanoid";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "./ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
const formSchema = z.object({
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
const formDefaultValues = {
    id: "",
    eventType: "birthday",
    personName: "",
    eventDate: new Date("yyyy-MM-dd"),
};
export default function AddEventForm({ saveData, requestClose, }) {
    // 1. Define your form. Defauls have to be defined or Submit will NOT work! Weird. No error message is thrown.
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: formDefaultValues,
    });
    // 2. Define a submit handler.
    function onSubmit(values) {
        // Do something with the form values.
        // Add id to values:
        let _eventsWithID = { ...values, id: nanoid() };
        // Close dialog box
        requestClose();
        // Save to main state
        console.log("Saving these form values:: ", _eventsWithID);
        saveData(_eventsWithID);
    }
    function onErrors(errors) {
        console.log("Errors:: ", errors);
    }
    return (_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit, onErrors), className: "space-y-8", children: [_jsx(FormField, { control: form.control, name: "personName", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Name of the human *" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "John Smooth", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "eventType", render: ({ field }) => (_jsxs(FormItem, { className: "space-y-3", children: [_jsx(FormLabel, { children: "Type of event: " }), _jsx(FormControl, { children: _jsxs(RadioGroup, { onValueChange: field.onChange, defaultValue: field.value, className: "flex flex-col space-y-1", children: [_jsxs(FormItem, { className: "flex items-center space-x-3 space-y-0", children: [_jsx(FormControl, { children: _jsx(RadioGroupItem, { value: "birthday" }) }), _jsx(FormLabel, { className: "font-normal", children: "Birthday" })] }), _jsxs(FormItem, { className: "flex items-center space-x-3 space-y-0", children: [_jsx(FormControl, { children: _jsx(RadioGroupItem, { value: "anniversary" }) }), _jsx(FormLabel, { className: "font-normal", children: "Anniversary" })] })] }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "eventDate", render: ({ field }) => (_jsxs(FormItem, { className: "flex flex-col", children: [_jsx(FormLabel, { children: "Date of birth: " }), _jsx(FormControl, { children: _jsx(Input, { type: "date", placeholder: "Placeholder from form", className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", ...field }) }), _jsx(FormDescription, { children: "Your date of birth is used to calculate your age." }), _jsx(FormMessage, {})] })) }), _jsxs("div", { className: "flex justify-between", children: [_jsx(Button, { type: "submit", children: "Submit" }), _jsx(Button, { type: "submit", onClick: requestClose, variant: "ghost", children: "Cancel" })] })] }) }));
}
