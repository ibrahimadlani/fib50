import React, { useContext, useState } from "react";
import FibonacciLogo from "../images/fibonacci_logo.svg";
import AuthContext from "../context/AuthContext";
// Import the newly defined components
import {
  LogoDisplay,
  PageTitle,
  LoginForm,
  SignUpSuggestion,
} from "../components";

const Home = () => {
  let { loginUser } = useContext(AuthContext);

  // Form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Toogle
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <LogoDisplay logoSrc={FibonacciLogo} />
        <PageTitle title="Fibonacci" subtitle="Log In" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm onSubmit={loginUser} />
        <SignUpSuggestion signInUrl="/signin" linkText="Sign in here!" />
      </div>
    </div>
  );
};

export default Home;
