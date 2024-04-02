// SubmitButton Component
// This component renders a reusable submit button for forms. It's designed to accept a buttonText prop,
// allowing the button's text to be dynamically set wherever it's used. This flexibility makes the component
// adaptable for various forms across the application.

import React from "react";

const SubmitButton = ({ buttonText }) => (
  // Button element with type "submit", indicating it's used to submit a form.
  <button
    type="submit"
    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    {buttonText} {/* Dynamic text content of the button, set via the buttonText prop. */}
  </button>
);

export default SubmitButton;
