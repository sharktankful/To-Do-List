import axios from "axios";
import { useEffect, useState } from "react";


interface YourData {
  [key: string]: string;
}

function ListGroup() {
  const [data, setData] = useState<YourData>({});
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    axios
      .get(
        "http://todolistapi-dev.us-west-2.elasticbeanstalk.com/view/dILRbpiLVnfFsGyAB1Oj7xeyDxI3/"
      )
      .then((res) => setData(res.data));
  }, []);

  return (
    <>
      <ul className="list-group">
        {Object.values(data).map((message, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={index}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {message}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
