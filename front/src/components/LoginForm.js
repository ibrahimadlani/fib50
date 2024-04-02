// LoginForm Component
// This component renders a form for user login, including fields for username and password, and a submit button.

import React from "react";
import { TextInput, SubmitButton } from "."; // Import TextInput and SubmitButton components from the current directory index file

const LoginForm = ({ onSubmit }) => (
  // Form element with tailwindCSS margin and spacing, uses the passed onSubmit function for the form submission event
  <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
    {/* Username Input Field */}
    <div>
      <label
        htmlFor="username" // Associates the label with the input field using its id
        className="block text-sm font-medium leading-6 text-gray-900" // TailwindCSS classes for styling
      >
        Username
      </label>
      <div className="mt-2"> {/* Container for the input to apply margin-top */}
        <TextInput // Reusable TextInput component for username
          id="username"
          name="username"
          type="text" // Type of input is text
          autoComplete="username" // Browser's autocomplete function is set for username
          required // Makes the field required for form submission
          placeholder="Username" // Placeholder text in the input field
        />
      </div>
    </div>

    {/* Password Input Field */}
    <div>
      <label
        htmlFor="password" // Associates the label with the input field using its id
        className="block text-sm font-medium leading-6 text-gray-900" // TailwindCSS classes for styling
      >
        Password
      </label>
      <div className="mt-2"> {/* Container for the input to apply margin-top */}
        <TextInput // Reusable TextInput component for password
          id="password"
          name="password"
          type="password" // Hides the input text
          autoComplete="current-password" // Browser's autocomplete function is set for current password
          required // Makes the field required for form submission
          placeholder="Password" // Placeholder text in the input field
        />
      </div>
    </div>

    {/* Submit Button */}
    <SubmitButton buttonText="Log in" /> {/* Reusable SubmitButton component with the button text */}
  </form>
);

export default LoginForm; // Export the component for use in other parts of the app
