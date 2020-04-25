import React, { useState } from 'react';
import axios from 'axios';

import { IoIosCart } from 'react-icons/io';

import { config } from '../../constants';

import './styles.css';

const NewItem = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [qty, setQty] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${config.url.dev}/item`, {
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
    <section className="form-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="type"
          value={type}
          onChange={e => setType(e.target.value)}
        />
        <input 
          type="text"
          placeholder="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input 
          type="text"
          placeholder="qty"
          value={qty}
          onChange={e => setQty(e.target.value)}
        />
        <button type="submit"><IoIosCart /> Add to cart!</button>
      </form>
    </section>
  )
};

export default NewItem;