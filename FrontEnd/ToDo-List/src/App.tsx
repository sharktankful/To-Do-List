import ListGroup from "./components/ListGroup";
import Form from "./components/Form";
import { useEffect, useState } from "react";

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
        <h1>This is the main front page!</h1>
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
