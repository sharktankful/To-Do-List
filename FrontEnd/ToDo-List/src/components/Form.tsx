import React, { FormEvent, useRef } from "react";
import axios from "axios";

interface FormProps {
  onTokenChange: (token: string) => void;
}

const Form: React.FC<FormProps> = ({ onTokenChange }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      const response = await axios.post(
        "http://todolistapi-dev.us-west-2.elasticbeanstalk.com/create/",
        { email, password }
      );
      const token = response.data.token;

      onTokenChange(token);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
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
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
