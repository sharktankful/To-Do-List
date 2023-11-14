import { useEffect, useState } from "react";
import ListGroup from "./components/ListGroup";
import axios from "axios";

interface user {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<user[]>([]);

  useEffect(() => {

    axios
      .get<user[]>("http://todolistapi-dev.us-west-2.elasticbeanstalk.com/view/dILRbpiLVnfFsGyAB1Oj7xeyDxI3/")
      .then((res) => console.log(res.data));
  }, []);

  return (
    <div>
      <ListGroup items={users.map((user) => user.name)} heading="Names" />
    </div>
  );
}

export default App;
