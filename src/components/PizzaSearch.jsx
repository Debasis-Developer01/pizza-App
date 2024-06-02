import React, { useState } from 'react';
import axios from 'axios';

const PizzaSearch = () => {
  const [size, setSize] = useState('');
  const [pizzas, setPizzas] = useState([]);

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/pizza/size/${size}`);
      setPizzas(response.data);
    } catch (error) {
      console.error('Error fetching pizzas:', error);
    }
  };

  return (
    <div>
      <input type="text" value={size} onChange={handleChange} placeholder="Enter Pizza Size" />
      <button onClick={handleSearch}>Search</button>
      <div>
        <h2>Pizzas:</h2>
        <ul>
          {pizzas.map((pizza, index) => (
            <li key={index}>{pizza.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PizzaSearch;
