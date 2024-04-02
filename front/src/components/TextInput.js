// TextInput Component
// This component renders a reusable text input field. It is designed to be highly configurable with props
// for id, name, type, autoComplete, placeholder, and required, allowing it to be used for various types
// of text inputs across the application. The styling is handled with Tailwind CSS for consistency and responsiveness.

import React from "react";

const TextInput = ({
  id, // Unique identifier for the input, which is also used to link the label to the input for accessibility.
  name, // Name of the input, which is sent as part of the form data.
  type, // Type of the input (e.g., text, password, email), defining the kind of data expected.
  autoComplete, // Autocomplete attribute specifies how the value of the input field is automatically completed by the browser.
  placeholder, // Placeholder text that appears inside the input field when it's empty.
  required // Boolean indicating if the input must be filled out before submitting the form.
}) => (
  <input
    id={id}
    name={name}
    type={type}
    autoComplete={autoComplete}
    required={required}
    placeholder={placeholder}
    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  />
);

export default TextInput; // Export the component for use in other parts of the application.
