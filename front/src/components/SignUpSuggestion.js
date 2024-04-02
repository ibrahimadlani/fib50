// SignUpSuggestion Component
// This component is designed to suggest users to sign up if they don't have an account. It displays
// a customizable message and a link that directs to the sign-up page. The link URL and the link text
// are both passed as props, making this component reusable for different contexts where a sign-up
// suggestion might be needed.

const SignUpSuggestion = ({ signInUrl, linkText }) => (
    // Paragraph element serving as the container for the sign-up suggestion message. 
    <p className="mt-10 text-center text-sm text-gray-500">
      No account yet?{" "} {/* Static text suggesting the action to the user. */}
      <a
        href={signInUrl} // Dynamic URL for the sign-in page, passed as a prop.
        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
      >
        {linkText} {/* Dynamic text for the link, passed as a prop, allowing customization of the call to action. */}
      </a>
    </p>
  );
  
  export default SignUpSuggestion;
  