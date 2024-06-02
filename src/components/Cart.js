import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import './Cart.css';
import ApiService from "../service/ApiService";

function Cart() {
  let apiservice = new ApiService();
  let [items, setItems] = useState([]);
  let[price,SetPrice] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    apiservice.getCartItemsByCustomerId().then(
      (res) => {
        setItems(res.data.pizzaToppings);
      },
      (err) => {
        console.log("Invalid cart");
      }
    );
  }, []);

  useEffect(()=>{
    apiservice.getTotalOrderPrice().then((res)=>{
      SetPrice(res.data)
    })
  },[items])

  const cartfoodItemQuantityHandler = (evt, item) => {
    const newQuantity = evt.target.value;
    if (newQuantity <= 0 || isNaN(newQuantity)) {
      toast.error("Quantity should be greater than 0");
      return;
    }

    const updatedItem = { ...item, pizzaQuantity: newQuantity };
    apiservice.updatePizzaQuantity(updatedItem).then((res) => {
      setItems(items.map(i => (i.ptId === updatedItem.ptId ? updatedItem : i)));
    });
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      apiservice.deletePizzaToppings(id).then((res) => {
        setItems(items.filter(item => item.ptId !== id));
      });
    }
  };

  const placeOrder = () => {
   
    navigate("../placeorder");
  };

  return (
    <div className="cart1 card-container">
      <div className="container mt-5">
        <div className="row justify-content-center">
        {items && items.map((item) => (
  <div className="col-md-3 mb-4" key={item.ptId}>
    <div className="cart2 card">
      <div className="card-body">
        <h5 className="card-title">{item.pizza.pizzaName}</h5>
        <br />
        <p className="card-text">Pizza Price: {item.pizza.pizzaPrice}</p>
        {item.toppings && item.toppings.map((top) => (
          <div key={top.toppingId}>
            <p className="card-text">Topping Name: {top.toppingName}</p>
            <p className="card-text">Topping Price: {top.toppingPrice}</p>
          </div>
        ))}
        <label className="form-label">Quantity</label>
        <select
          className="form-select mb-3"
          value={item.pizzaQuantity}
          onChange={(evt) => cartfoodItemQuantityHandler(evt, item)}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
        <br />
        <button className="btn btn-danger" onClick={() => deleteHandler(item.ptId)}>Delete</button>
      </div>
    </div>
  </div>
))}

        </div>
      </div>
      <h5>Total Order Price: {price}</h5>
      <div className="d-flex justify-content-center mt-4">
        <button type="button" className="btn btn-light btn-lg me-2" onClick={placeOrder}>Place Order</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Cart;
