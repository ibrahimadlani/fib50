// LogoDisplay Component
// This component is responsible for displaying the Fibonacci logo. It is designed to be reusable 
// and can be included in any part of the application that requires showing the logo.

import logorc from "../images/fibonacci_logo.svg"; // Import the logo from the images directory

const LogoDisplay = () => (
  // Outer container div that centers the logo using Flexbox
  <div className="rounded-sm flex items-center justify-center">
    {/* Inner container div that sets the size and styling for the logo, including rounding, border, and shadow */}
    <div className="rounded-md flex h-12 w-12 border items-center justify-center shadow-sm">
      {/* The logo image itself, with specified height and source file */}
      <img className="h-8" src={logorc} alt="Fibonacci" />
    </div>
  </div>
);

export default LogoDisplay; // Export the component for use in other parts of the app
