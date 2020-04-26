import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

import { config } from '../../constants';

import { TiDelete } from 'react-icons/ti';
import { IoIosCart } from 'react-icons/io';

import './styles.css';

const List = props => {
  const { listId } = props.match.params;
  const [list, setList] = useState({});

  const [pressTimer, setPressTimer] = useState(null);
  const [longPress, setLongPress] = useState(false);

  useEffect(() => {
    axios.get(`${config.api}/list/${listId}/items`)
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

  const deleteItem = async (type, index) => {
    const name = list[type][index].name;
    console.log(name);
    console.log(type);
  
    await axios.delete(`${config.api}/list/${listId}/item`, {
      data: {
        type: type,
        name: name
      }
    });

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
      <Link to={`/list/${listId}/new-item`}>
        <IoIosCart /> Adicionar
      </Link>
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

export default List;