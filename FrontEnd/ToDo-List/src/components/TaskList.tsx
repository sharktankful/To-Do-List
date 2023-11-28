import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  JWTToken: string;
}

const TaskList: React.FC<Props> = ({ JWTToken }) => {
  const [tasks, setTasks] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const requestData: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${JWTToken}`,
      },
    };

    axios
      .get(
        "https://todolistapi.com/view/",
        requestData
      )
      .then((res) => {
        const fetchedTasks: { [key: string]: string } = res.data;
        setTasks(fetchedTasks);
      });
  }, [JWTToken]);

  const handleRemoveTask = (taskID: string) => {
    const requestData: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${JWTToken}`,
      },
    };

    axios
      .delete(
        `http://todolistapi-dev.us-west-2.elasticbeanstalk.com/delete/${taskID}/`,
        requestData
      )
      .then(() => {
        setTasks((prevTask) => {
          const updatedTasks = { ...prevTask };
          delete updatedTasks[taskID];
          return updatedTasks;
        });
      })
      .catch((error) => {
        console.error("Error removing task:", error);
      });
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul className="list-group">
        {Object.keys(tasks).map((taskID) => (
          <li
            key={taskID}
            className="list-group-item d-flex justify-content-between"
          >
            {tasks[taskID]}
            <button
              className="btn btn-danger"
              type="submit"
              onClick={() => handleRemoveTask(taskID)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
