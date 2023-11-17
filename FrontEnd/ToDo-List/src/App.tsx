import ListGroup from "./components/ListGroup";
import Form from "./components/Form";
import { useState } from "react";

function App() {
  const [token, setToken] = useState<string>('');

  const handleTokenChange = (newToken: string) => {
    setToken(newToken);
  };

  
  return (
    <div>
      <Form onTokenChange={handleTokenChange}/>
    </div>
  );
}

export default App;
