import React, { FormEvent, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface FormProps {
  onTokenChange: (token: string) => void;
}

const SignUpForm: React.FC<FormProps> = ({ onTokenChange }) => {
  const [showAlert, setShowAlert] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      const response = await axios.post(
        "https://todolistapi.com/create/",
        { email, password }
      );
      const token = response.data.token;

      onTokenChange(token);
    } catch (error) {
      console.error("Error sending request:", error);

      setShowAlert(true);
    }
  };

  return (
    <div>
      {showAlert && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Enter in a correct email.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>


      )}
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            ref={emailRef}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </div>
      </form>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link
            to={"/"}
            className="navbar-brand mx-auto"
            style={{ color: "blue" }}
          >
            Log In
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default SignUpForm;
