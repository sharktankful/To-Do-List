import axios, { AxiosRequestConfig } from "axios";
import { FormEvent, useRef } from "react";

interface Props {
  JWTToken: string;
}

const CreateTask: React.FC<Props> = ({ JWTToken }) => {
  const descRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {

    const description = descRef.current?.value || "";

    try {
      const requestData: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${JWTToken}`,
        },
      };

      const task = { message: description };

      await axios.post(
        "http://todolistapi-dev.us-west-2.elasticbeanstalk.com/submit/",
        task,
        requestData
      );
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          ref={descRef}
          id="desc"
          type="text"
          className="form-control"
          placeholder="Create a Task"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="submit">
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateTask;
