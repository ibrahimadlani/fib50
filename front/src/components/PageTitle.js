// PageTitle Component
// This component displays a page title and an optional subtitle. It's designed to be reusable
// across different parts of the application where a consistent style for titles is needed.

const PageTitle = ({ title, subtitle }) => (
  // React Fragment to group the title and subtitle without adding extra nodes to the DOM
  <>
    {/* Main title using an h2 element. Tailwind CSS classes apply margin, text alignment, 
        font size, weight, line height, letter spacing, and color styling. */}
    <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      {title} {/* Render the title prop value */}
    </h2>

    {/* Subtitle using a paragraph element. Tailwind CSS classes for text alignment, size, 
        and color styling. */}
    <p className="text-center text-sm text-gray-500">
      {subtitle} {/* Render the subtitle prop value */}
    </p>
  </>
);

export default PageTitle; // Export the component for use in other parts of the app
