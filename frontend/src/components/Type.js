import React from 'react';

const Type = props => {
  return (
    <div>
      <h1>{props.type}</h1>
      <ul>
        {props.items.map((item, index) => 
          <li 
            key={index}
            onClick={() => props.check(props.type, index)}
            className={item.checked ? "checked" : "not-checked"}
          >
              {item.qty} {item.name}
          </li>
        )}
      </ul>
    </div>
  )
};

export default Type;