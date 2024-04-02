// EmailInputWithSuffix Component
// This component renders an email input field with a non-editable suffix "@deezer.com".
// It accepts `email` and `setEmail` props to manage the email state externally.

const EmailInputWithSuffix = ({ email, setEmail }) => (
    // Container div with margin-top and flex display settings for alignment
    <div className="mt-2 flex rounded-md shadow-sm">
      {/* Email input field */}
      <input
        type="text" // Input type is text
        name="email" // Name attribute for the input
        id="email" // ID attribute for the input, useful for labels
        value={email} // Controlled input value set to the email prop
        onChange={(e) => setEmail(e.target.value)} // Update parent component state on change
        // TailwindCSS classes for styling: full width, rounded left edge, border settings, padding, text color, ring effect on focus, responsive settings
        className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      {/* Non-editable suffix showing the domain part */}
      <span
        // TailwindCSS classes for styling: inline-flex for alignment, rounded right edge, border settings, padding, text color, background color, responsive settings
        className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm bg-gray-50">
        @deezer.com {/* Static domain suffix */}
      </span>
    </div>
  );
  
  export default EmailInputWithSuffix; // Export the component for use in other parts of the app
  