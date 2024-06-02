import React, { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import { useParams } from "react-router-dom";
 
function AddToppings() {
  const [toppings, setToppings] = useState({ toppingId: "", toppingName: "", toppingPrice: "" });
  const [allToppings, setAllToppings] = useState([]);
  const { id } = useParams();
  const [todo, setTodo] = useState("Add toppings");
  const apiservice = new ApiService();
 
  useEffect(() => {
    apiservice.getAllToppings().then(
      (res) => {
        setAllToppings(res.data);
      },
      (err) => {
        console.log("Error " + err);
      }
    );
  }, []);
 
  const [valid, setValid] = useState("true");
  const [toppingsNameError, setToppingsNameError] = useState("");
  const [toppingsPriceError, setToppingsPriceError] = useState("");
 
  const validation = () => {
    if (toppings.toppingName === "" || toppings.toppingName === undefined) {
      setValid("false");
      setToppingsNameError("Please enter a valid topping Name");
    }
    if (toppings.toppingPrice === "" || toppings.toppingPrice === undefined) {
      setValid("false");
      setToppingsPriceError("Please enter a valid topping price");
    }
  };
 
  const submitHandler = async (evt) => {
    evt.preventDefault();
    validation();
    if (valid === "true") {
      if (todo === "Add toppings") {
        try {
          const res = await apiservice.addToppings(toppings);
          alert("Topping Added Successfully!!!!");
          setToppings({ toppingId: "", toppingName: "", toppingPrice: "" });
        } catch (err) {
          alert(err.response.data.msg);
          console.log(err);
        }
      } else if (todo === "Update toppings") {
        try {
          const res = await apiservice.updateToppings(toppings.toppingId, toppings);
          alert("Topping Updated Successfully!!!!");
          setToppings({ toppingId: "", toppingName: "", toppingPrice: "" });
          setTodo("Add toppings");
        } catch (err) {
          alert(err.response.data.msg);
          console.log(err);
        }
      }
    }
  };
 
  const editTopping = (topping) => {
    setToppings({ ...topping, toppingId: topping.toppingId });
    setTodo("Update toppings");
  };
 
  const deleteTopping = async (toppingId) => {
    try {
      await apiservice.deleteToppings(toppingId);
      const updatedToppings = allToppings.filter((topping) => topping.toppingId !== toppingId);
      setAllToppings(updatedToppings);
      alert("Topping Deleted Successfully!!!!");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        alert(err.response.data.msg);
      } else {
        alert("An error occurred while deleting the topping.");
        console.error(err);
      }
    }
  };
 
 
  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="toppingName">Topping Name</label>
          <input
            type="text"
            className="form-control"
            id="toppingName"
            value={toppings.toppingName}
            onChange={(e) => setToppings({ ...toppings, toppingName: e.target.value })}
          />
          <span className="error">{toppingsNameError}</span>
          <label htmlFor="toppingPrice">Topping Price</label>
          <input
            type="text"
            className="form-control"
            id="toppingPrice"
            value={toppings.toppingPrice}
            onChange={(e) => setToppings({ ...toppings, toppingPrice: e.target.value })}
          />
          <span className="error">{toppingsPriceError}</span>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          {todo}
        </button>
        &ensp;
        <button type="back" className="btn btn-primary">
          {" "}
          Back{" "}
        </button>
      </form>
      <div className="row">
        {allToppings.map((topping) => (
          <div key={topping.toppingId} className="cat col-md-4 mb-4">
            <div className="cat card h-100">
              <div className="cat card-body">
                <h5 className="cat card-title">{topping.toppingName}</h5>
                <h5 className="cat card-title">{topping.toppingPrice}</h5>
                <button className="btn btn-primary mr-2" onClick={() => editTopping(topping)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => deleteTopping(topping.toppingId)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default AddToppings;