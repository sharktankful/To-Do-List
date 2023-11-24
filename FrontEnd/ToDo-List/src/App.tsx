import Form from "./components/SignUpForm";
import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import CreateTask from "./components/CreateTask";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";

function App() {
  const [token, setToken] = useState<string>("");

  // CHECK LOCAL BROWSER STORAGE FOR JWT TOKEN
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleTokenChange = (newToken: string) => {
    setToken(newToken);

    // SAVE TOKEN TO LOCAL BROWSER STORAGE
    localStorage.setItem("token", newToken);
  };

  if (token) {
    return (
      <div>
        <CreateTask JWTToken={token} />
        <TaskList JWTToken={token} />
        <NavBar />
      </div>
    );
  } else {
    return (
      <div>
        <LoginForm onTokenChange={handleTokenChange} />
        {/* <Form onTokenChange={handleTokenChange} /> */}
      </div>
    );
  }
}

export default App;
