// PasswordField Component
// This component creates a password input field with customizable properties. It's designed to be reusable
// for any form within the application that requires a user to input a password. This includes features like
// automatic password suggestion and a visibility toggle for the password (though the toggle must be implemented separately).

const PasswordField = ({ value, setValue, id, label }) => (
  // Main container for the password field. Provides structural integrity and spacing.
  <div>
    {/* Label for the password input. It's associated with the input field through the 'htmlFor' prop that matches the input's id. */}
    <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
      {label} {/* Displays the label text passed to the component. */}
    </label>
    {/* Container for the input element. Adds top margin for spacing between the label and the input. */}
    <div className="mt-2">
      {/* Password input field. Its value and changes are managed by the parent component through props. */}
      <input
        id={id} // Associates the input with its label for accessibility.
        name={id} // Name of the input element, typically used for form submission and accessibility.
        type="password" // Ensures the text entered is obscured.
        autoComplete="new-password" // Helps browsers understand the context of the input for autofill suggestions.
        value={value} // Controlled component: the input's current value.
        onChange={(e) => setValue(e.target.value)} // Event handler to update the state in the parent component on user input.
        // TailwindCSS classes for styling: full width, rounded corners, no border, padding, shadow, focus ring, etc.
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        required // Makes the field required for form submission.
      />
    </div>
  </div>
);

export default PasswordField; // Export the component to be used elsewhere in the application.
