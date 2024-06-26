import React, { useState, Fragment, useContext } from "react";
import FibonacciLogo from "../images/fibonacci_logo.svg";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Transition } from "@headlessui/react";
import { XMarkIcon, InboxIcon } from "@heroicons/react/24/outline";
import AuthContext from '../context/AuthContext';

const SignupPage = () => {
  let navigate = useNavigate();
  let { SignupPage } = useContext(AuthContext);

  //Form fields
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);

  //Input validation
  const passwordsMatch = () => {
    return password === confirmPassword;
  };
  const passwordFormat = () => {
    return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
  };
  const usernameFormat = () => {
    return username.match(/^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/);
  };
  const isValidEmailPrefix = () => {
    return email.match(/^[a-zA-Z0-9_.-]+$/);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    
    if (!isValidEmailPrefix()) {
      setError('Invalid email prefix. Please use only letters, numbers, dots, underscores and dashes.');
      return;
    }else if (!usernameFormat()) {
      setError('Invalid username. Please use at least 5 characters, one letter and one number.');
      return;
    }else if (!passwordsMatch()) {
      setError('Passwords do not match.');
      return;
    }else if (!passwordFormat()) {
      setError('Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character.');
      return;
    }

    try {
      let deezerEmail = email + '@deezer.com';
      const response = await axios.post(
        `http://localhost:8001/api/users/create/`,
        {
          username: username,
          email: deezerEmail,
          password: password,
        }
      );

      navigate('/');
    } catch (err) {
      setError("Failed to sign up. Please check your email and password.");
    }
  };

  return (
    <>
      {error && 
      
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={alert}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0  text-indigo-500">
                    <InboxIcon
                      className="h-6 w-6 text-gray-400"
                      aria-hidden="true"
                      stroke="#5046e5"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">Error</p>
                    <p className="mt-1 text-sm text-gray-500">{error}</p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setAlert(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      }
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="rounded-sm flex  items-center justify-center">
            <div className="rounded-md flex h-12 w-12 border items-center justify-center shadow-sm">
              <img className="h-8" src={FibonacciLogo} alt="Fibonacci" />
            </div>
          </div>
          <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Fibonacci
          </h2>
          <p className=" text-center text-sm text-gray-500">Sign Up</p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={SignupPage}>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
              </div>
              <div className="mt-2">
                <div className="mt-2 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full min-w-0 flex-1 rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 px-3 text-gray-500 sm:text-sm bg-gray-50">
                    @deezer.com
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="repeat-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Repeat Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="repeat-password"
                  name="repeat-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Repeat Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Compute Fib(x)
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account ?{" "}
            <a
              href="/"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              Log in here!
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
