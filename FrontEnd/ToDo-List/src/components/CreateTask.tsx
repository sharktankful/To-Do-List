import axios, { AxiosRequestConfig } from "axios";
import { FormEvent, useRef } from "react";
import '../index.css'

interface Props {
  JWTToken: string;
}

const CreateTask: React.FC<Props> = ({ JWTToken }) => {
  const descRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const description = descRef.current?.value || "";

    try {
      const requestData: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${JWTToken}`,
        },
      };

      const task = { message: description };

      const response = await axios.post(
        "https://todolistapi.com/submit/",
        task,
        requestData
      );
      console.log(response.data);
      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="input-group mb-3 ">
        <input
          ref={descRef}
          id="desc"
          type="text"
          className="form-control"
          placeholder="Create a Task"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <button className="btn btn-success" type="submit">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default CreateTask;
