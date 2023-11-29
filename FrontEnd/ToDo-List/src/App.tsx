import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import CreateTask from "./components/CreateTask";
import NavBar from "./components/NavBar";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginForm onTokenChange={handleTokenChange} />,
    },
    {
      path: "signup",
      element: <SignUpForm onTokenChange={handleTokenChange} />,
    },
  ]);

  if (token) {
    return (
      <div>
        <div className="search-bar">
          <CreateTask JWTToken={token} />
        </div>
        <div className="todo-list-container">
          <TaskList JWTToken={token} />
        </div>
        <NavBar />
      </div>
    );
  } else {
    return (
      <div className="form">
        <RouterProvider router={router} />
      </div>
    );
  }
}

export default App;
