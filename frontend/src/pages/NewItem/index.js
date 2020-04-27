import React, { useState } from 'react';
import axios from 'axios';

import { IoIosCart } from 'react-icons/io';

import { config } from '../../constants';

import './styles.css';

const NewItem = props => {
  const { listId } = props.match.params;

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [qty, setQty] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${config.api}/list/${listId}/item`, {
        name: name,
        type: type,
        qty: qty
      });
      alert('Item incluido com sucesso');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="new-item-container">
      <h1>New Item</h1>
      <section className="form-container">
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder="Type"
            value={type}
            onChange={e => setType(e.target.value)}
          />
          <input 
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input 
            type="text"
            placeholder="Qty"
            value={qty}
            onChange={e => setQty(e.target.value)}
          />
          <button type="submit"><IoIosCart /> Add to cart!</button>
        </form>
      </section>
    </div>
  )
};

export default NewItem;