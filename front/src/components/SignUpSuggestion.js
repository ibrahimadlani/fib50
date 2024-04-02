const SignUpSuggestion = ({ signUpUrl, linkText }) => (
  <p className="mt-10 text-center text-sm text-gray-500">
    No account yet?{" "}
    <a
      href={signUpUrl}
      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
    >
      {linkText}
    </a>
  </p>
);

export default SignUpSuggestion;
