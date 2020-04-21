import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Type from './components/Type';

import './styles.css';

function App() {
  const [forceChildRerender, setForceChildRerender] = useState(false);
  const [list, setList] = useState({});

  useEffect(() => {
    axios.get('http://192.168.0.8:3333/item')
      .then(res => {
        // Add property checked to all items
        for ( let type in res.data ) {
          for ( let item in res.data[type] ) {
            res.data[type][item].checked = false;
            console.log(res.data[type][item]);
          }
        }
        setList(res.data);
      })
      .catch(err => {
        window.alert(err);
      });
  }, []);

  const check = (type, index) => {
    list[type][index].checked = !list[type][index].checked;
    setList(list);
    // Force childs to rerender
    setForceChildRerender(!forceChildRerender);
  };

  return (
    <div className="list-container">
      {Object.keys(list).map((type, index) => 
        <Type 
          key={index} 
          type={type} 
          items={list[type]}
          check={check}
          rerender={forceChildRerender}
        />
      )}
    </div>
  );
}

export default App;