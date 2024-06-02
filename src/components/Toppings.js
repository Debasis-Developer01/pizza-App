import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService';
import './Toppings.css'; // Import your CSS file
import { useNavigate, useParams } from 'react-router-dom';

const Toppings = ({ onAddToppings }) => {
  const apiService = new ApiService();
  let navigate = useNavigate();
  const [toppings, setToppings] = useState([]);
  let { id } = useParams();
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [ptDto, setPtDto] = useState({
    "pizzaId": id
  });
  const [pt, setPt] = useState({});
  const [error, setError] = useState(null);
  const [addedToppings, setAddedToppings] = useState([]);

  useEffect(() => {
    getAllToppings();
  }, []);

  const getAllToppings = () => {
    apiService.getAllToppings()
      .then(response => {
        setToppings(response.data);
      })
      .catch(error => {
        console.error('Error fetching toppings:', error);
        setError('Error fetching toppings');
      });
  };

  const addToppingToPizza = (toppingId) => {
    apiService.addPizzaToppings(ptDto, toppingId)
      .then(res => {
        setPt({ "pizzaToppingId": res.data.ptId });
        setAddedToppings([...addedToppings, toppingId]); // Add the topping to addedToppings state
      })
      .catch(error => {
        console.error('Error adding topping:', error);
        setError('Error adding topping');
      });
  };

  const handleAddToppings = () => {
    apiService.addPizzaToCart(pt).then((res) => {
      navigate('/cart');
    })
  };

  const handleAdd = () => {
    console.log(ptDto)
  apiService.addPizzaToppings(ptDto, 0)
      .then(res => {
        console.log(res.data.ptId)
        setPt({ "pizzaToppingId": res.data.ptId });// Add the topping to addedToppings state
        console.log(pt);
        apiService.addPizzaToCart(pt).then((res) => {
          navigate('/cart');
        })
      })
      .catch(error => {
        console.error('Error adding topping:', error);
        setError('Error adding topping');
      });
      
    };

  const isToppingAdded = (toppingId) => {
    return addedToppings.includes(toppingId);
  };

  return (
    <div className="toppings-container">
      <h2 className="toppings-heading">All Pizza Toppings</h2>
      {error && <p className="error">{error}</p>}
      <ul className="toppings-list">
        {toppings.map(topping => (
          <li key={topping.toppingId} className="topping-item">
            <span className="topping-name">{topping.toppingName}</span> - <span className="topping-price">${topping.toppingPrice}</span>  <span></span>
            {isToppingAdded(topping.toppingId) ? (
              <span>Added</span>
            ) : (
              <button onClick={() => { addToppingToPizza(topping.toppingId) }}>Add</button>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleAddToppings}>Add Selected Toppings</button>
      <button onClick={handleAdd}>Add Without Toppings</button>
    </div>
  );
};

export default Toppings;
