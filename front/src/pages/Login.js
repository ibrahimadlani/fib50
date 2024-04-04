import React, { useContext } from "react";
import { LogoDisplay, PageTitle, LoginForm, SignUpSuggestion } from "../components";
import FibonacciLogo from "../images/fibonacci_logo.svg";
import AuthContext from '../context/AuthContext';


const Home = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <LogoDisplay logoSrc={FibonacciLogo} />
        <PageTitle title="Fibonacci" subtitle="Log In" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm onSubmit={loginUser} />
        <SignUpSuggestion signUpUrl="/signup" linkText="Sign up here!" />
      </div>
    </div>
  );
};

export default Home;
