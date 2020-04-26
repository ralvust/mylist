import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

import { AiOutlineUnorderedList } from 'react-icons/ai';

import { config } from '../../constants';

import './styles.css';

const Home = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    axios.get(`${config.api}/list`)
      .then(res => {
        setLists(res.data);
      });
  }, []);

  const addNewList = () => {
    axios.post(`${config.api}/list`)
      .then(res => {
        lists.push(res.data.listId);
        setLists(_.clone(lists));
      })
      .catch(err => {
        alert(err.message);
      })
  }

  return (
    <div className="lists-container">
      <button onClick={addNewList}>
        <h1>Nova lista</h1>
      </button>
      <section>
        <ul>
          {lists.map((list, index) => {
            return (
              <li key={index}>
                <AiOutlineUnorderedList /><Link to={`/list/${list}`}>{list}</Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Home;