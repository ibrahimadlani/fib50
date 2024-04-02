import React from "react";
import { TextInput, SubmitButton } from ".";

const LoginForm = ({ onSubmit }) => (
  <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
    <div>
      <label
        htmlFor="username"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Username
      </label>
      <div className="mt-2">
        <TextInput
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          placeholder="Username"
        />
      </div>
    </div>

    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Password
      </label>
      <div className="mt-2">
        <TextInput
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Password"
        />
      </div>
    </div>

    <SubmitButton buttonText="Log in" />
  </form>
);

export default LoginForm;
