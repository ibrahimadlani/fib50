import React, { useState, useEffect, Fragment, useContext } from "react";
import axios from "axios";
import FibonacciLogo from "../images/fibonacci_logo.svg";
import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  let { authTokens, logoutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [history, setHistory] = useState([]);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [fibonacciData, setFibonacciData] = useState({
    parameter: "",
    result: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/users/1/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + String(authTokens.access),
        },
      })
      .then((response) => {
        const { username, email, latest_fibonacci_value } = response.data;

        setUserData({
          username: username,
          email: email,
          latestFibonacciValue: latest_fibonacci_value,
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    axios
      .get("http://localhost:8001/api/users/1/fibonacci/last/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + String(authTokens.access),
        },
      })
      .then((response) => {
        const { parameter, result } = response.data;
        setFibonacciData({
          parameter: parameter,
          result: result,
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
      axios
      .get("http://localhost:8001/api/fibonacci/user/1/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + String(authTokens.access),
        },
      })
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleGenerateNewValue = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
    axios
      .post(
        "http://localhost:8001/api/fibonacci/",
        { user: 1, parameter: Math.floor(Math.random() * (55 - 50 + 1)) + 50 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + String(authTokens.access),
          },
        }
      )
      .then((response) => {
        setFibonacciData({
          parameter: response.data.parameter,
          result: response.data.result,
        });
        updateHistory();
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

      const updateHistory = () => {
        axios
          .get(
            "http://localhost:8001/api/fibonacci/user/1/",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ` + String(authTokens.access),
              },
            }
          )
          .then((response) => {
            setHistory(response.data);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
  };

  const deleteFibonacciValue = (id) => {
    axios
      .delete(`http://localhost:8001/api/fibonacci/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + String(authTokens.access),
        },
      })
      .then((response) => {
        console.log(response.data);
        setHistory(history.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }


  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="relative flex-1 px-4 sm:px-6">
                        <div className="px-4">
                          <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                              <h1 className="text-base font-semibold leading-6 text-gray-900">
                                History
                              </h1>
                              <p className="mt-2 text-sm text-gray-700">
                                All the previous results of all Fibonacci values
                                you computed.
                              </p>
                            </div>
                          </div>
                          <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300">
                                  <thead>
                                    <tr>
                                      <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                      >
                                        X
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                      >
                                        Fib(X)
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                      >
                                        Perf.
                                      </th>
                                      <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                      >
                                        Role
                                      </th>
                                      <th
                                        scope="col"
                                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                      >
                                        <span className="sr-only">Edit</span>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200">
                                    {history.map((item, index) => (
                                      <tr key={index}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                          {item.parameter}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          {item.result}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          {item.execution_time}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          {item.role}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                          <p
                                            onClick={() => {}}
                                            className="text-indigo-600 hover:text-indigo-900"
                                          >
                                            <TrashIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                            <span className="sr-only">
                                              Delete, {item.sequenceNumber}
                                            </span>
                                          </p>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <form className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-12 pb-12 border-b">
            <div className="rounded-sm flex  items-center justify-center">
              <div className="rounded-md flex h-12 w-12 border items-center justify-center shadow-sm">
                <img className="h-8" src={FibonacciLogo} alt="Fibonacci" />
              </div>
            </div>
            <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Fibonacci
            </h2>
            <p className=" text-center text-sm text-gray-500">
              Welcome, {userData.username}
            </p>
          </div>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Edit your personal information below.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      value={userData.username}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      value={userData.email}
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Fibonacci Feature
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Compute the Fibonacci value of a random number.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <div className="text-sm flex justify-between">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Fibonacci value
                    </label>
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className=" leading-6 text-gray-600 hover:text-indigo-500 cursor-pointer underline underline-offset-1"
                    >
                      History
                    </button>
                  </div>
                  <div className="mt-2">
                    <div className="mt-2 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                        Fib({fibonacciData.parameter}) ={" "}
                      </span>
                      <input
                        type="text"
                        name="company-website"
                        id="company-website"
                        value={fibonacciData.result}
                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <a
                    className="w-full flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleGenerateNewValue}
                  >
                    <ArrowPathIcon
                      className={`h-4 w-4 me-2 ${
                        isSpinning ? "animate-spin-three-times" : ""
                      }`}
                    />
                    <span className="me-2">Generate new value</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Password
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Change your password below.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="current-password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Current password
                  </label>
                  <div className="mt-2">
                    <input
                      id="current-password"
                      type="password"
                      name="current-password"
                      autoComplete="current-password"
                      value=""
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="new-password"
                      id="new-password"
                      autoComplete="new-password"
                      value=""
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="confirm-new-password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm new password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="confirm-new-password"
                      id="confirm-new-password"
                      autoComplete="new-password"
                      value=""
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900 flex items-center"
              onClick={logoutUser}
            >
              <ArrowLeftIcon className="h-4 w-4 me-2" />
              Log out
            </button>
            <button
              onClick={() => {console.log(1)}}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
