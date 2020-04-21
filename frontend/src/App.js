import React, { useState, useEffect } from 'react';
 import axios from 'axios';
 import _ from 'lodash';

 import { TiDelete } from 'react-icons/ti'

import './styles.css';

function App() {
  const [list, setList] = useState({});

  const [pressTimer, setPressTimer] = useState(null);
  const [longPress, setLongPress] = useState(false);

  useEffect(() => {
    axios.get('http://ec2-107-23-70-168.compute-1.amazonaws.com:3333/item')
      .then(res => {
        const { data } = res;
        // Add control data to all items
        for ( let type in data ) {
          for ( let item in data[type] ) {
            data[type][item].checked = false;
            data[type][item].deleteVisible = false;
          }
        }
        setList(data);
      })
      .catch(err => {
        window.alert(err);
      });
  }, []);

  const deleteItem = (type, index) => {
    list[type].splice(index, 1);
    setList(_.clone(list));
  };

  const handleButtonPress = (type, index) => {
    setPressTimer(setTimeout(() => {
      list[type][index].deleteVisible = !list[type][index].deleteVisible;
      setLongPress(true);
    }, 300));
  }

  const handleButtonRelease = (type, index) => {
    clearTimeout(pressTimer);
    if ( ! longPress ) {
      list[type][index].checked = !list[type][index].checked;
      setList(_.clone(list));
    } else {
      setLongPress(false);
    }
  }

  return (
    <div className="list-container">
      {Object.keys(list).map((type, typeIndex) => {
        return (
          <div key={typeIndex}>
            <h1>{type}</h1>
            <ul>
              {list[type].map((item, itemIndex) =>
                <li
                  key={itemIndex}
                  className={item.deleteVisible ? "delete-visible" : "delete-not-visible"}
                >
                  <button
                    onClick={() => deleteItem(type, itemIndex)} 
                  >
                    <TiDelete />
                  </button>
                  <span
                    className={item.checked ? "checked" : "not-checked"}
                    onTouchStart={() => handleButtonPress(type, itemIndex)}
                    onTouchEnd={() => handleButtonRelease(type, itemIndex)}
                  >
                    {item.qty} {item.name}
                  </span>
                </li>
              )}
            </ul>
          </div>
        )
      })}
    </div>
  );
}

export default App;
