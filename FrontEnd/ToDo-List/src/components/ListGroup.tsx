import { useState } from "react";

interface props {
  items: string[];
  heading: string
}

function ListGroup({items, heading}: props) {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const message = items.length === 0 && <p>No Items Found</p>;

  // EventHandler

  return (
    <>
      <h1>{heading}</h1>
      {message}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={selectedIndex === index ? 'list-group-item active': 'list-group-item'}
            key={item}
            onClick={() => {setSelectedIndex(index)}}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
