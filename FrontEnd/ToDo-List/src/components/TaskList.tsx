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
        "http://todolistapi-dev.us-west-2.elasticbeanstalk.com/view/",
        requestData
      )
      .then((res) => {
        const fetchedTasks: { [key: string]: string } = res.data;
        setTasks(fetchedTasks);
      });
  }, [JWTToken]);

  // Function to add a new task
  const addTask = (taskId: string, taskDescription: string) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [taskId]: taskDescription,
    }));
  };

  console.log(tasks);


  return (
    <div>
      <h2>Task List</h2>
      <ul className="list-group">
        {Object.keys(tasks).map((taskID) => (
          <li key={taskID} className="list-group-item">{tasks[taskID]}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
