import axios from "axios";
import React, { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface LoginProps {
  onTokenChange: (token: string) => void;
}

const LoginForm: React.FC<LoginProps> = ({ onTokenChange }) => {
  const [showAlert, setShowAlert] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      const response = await axios.post("https://todolistapi.com/login/", {
        email,
        password,
      });

      if (response.status === 201) {
        const token = response.data.token;
        onTokenChange(token);

        window.location.reload();
      }
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
          Incorrect email or password entered.
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <h1>Login</h1>
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
            to={"signup"}
            className="navbar-brand mx-auto"
            style={{ color: "blue" }}
          >
            Create An Account
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default LoginForm;
