import Form from "./components/Form";
import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import CreateTask from "./components/CreateTask";

function App() {
  const [token, setToken] = useState<string>("");

  // CHECK LOCAL BROWSER STORAGE FOR JWT TOKEN
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  });

  const handleTokenChange = (newToken: string) => {
    setToken(newToken);

    // SAVE TOKEN TO LOCAL BROWSER STORAGE
    localStorage.setItem("token", newToken);
  };

  if (token) {
    return (
      <div>
        <CreateTask JWTToken={token}/>
        <TaskList JWTToken={token} />
      </div>
    );
  } else {
    return (
      <div>
        <Form onTokenChange={handleTokenChange} />
      </div>
    );
  }
}

export default App;
