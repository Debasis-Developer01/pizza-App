import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../service/ApiService";
import { useEffect, useState } from "react";
import './AddPizza.css';

function AddPizza() {
    const apiService = new ApiService();
    const [buttonStatus, setButtonStatus] = useState("Add pizza");
    const [pizza, setPizza] = useState([]);
    const { categoryId, pizzaId } = useParams();
    const navigate = useNavigate();
    

    const [dto, setDto] = useState({
        pizzaName: '',
        pizzaPrice: 0,
        pizzaSize: '',
        categoryId: categoryId
    });

    useEffect(() => {
        apiService.getPizzaByCategoryId(categoryId).then((res) => {
            setPizza(res.data);
        });
        // Fetch pizza details by ID when component mounts if pizza ID is provided
        if (pizzaId) {
            apiService.getPizzaById(pizzaId).then((res) => {
                const pizzaData = res.data;
                setDto({
                    pizzaName: pizzaData.pizzaName,
                    pizzaPrice: pizzaData.pizzaPrice,
                    pizzaSize: pizzaData.pizzaSize,
                    categoryId: pizzaData.categoryId
                });
                setButtonStatus("Update Pizza")
            }).catch(error => {
                console.error('Error fetching pizza details:', error);
            });
        }
    }, [categoryId, pizzaId]); // Make sure to include categoryId and pizzaId in the dependency array

    useEffect(() => {
        console.log(pizza)
    }, [pizza]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDto((prevDto) => ({
            ...prevDto,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let apiCall = null;
        // Call API to update or add pizza based on presence of pizza ID
        if (pizzaId == 0) {
            apiCall = apiService.addPizza(dto);
        } else {
            apiCall = apiService.updatePizza(pizzaId, dto);
        }
        apiCall.then(res => {
            // Handle success
            console.log('Pizza added/updated successfully:', res);
            alert("Pizza added/updated successfully");
        }).catch(error => {
            // Handle error
            console.error('Error adding/updating pizza:', error);
        });
    };

    const handleDelete = (id) => {
        apiService.deletePizza(id).then(res => {
            // Remove the deleted pizza from the state
            setPizza(pizza.filter(p => p.pizzaId !== id));
            console.log('Pizza deleted successfully:', res);
            alert("Pizza deleted successfully");
        }).catch(error => {
            console.error('Error deleting pizza:', error);
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="pizzaName">Pizza Name:</label>
                    <input
                        type="text"
                        id="pizzaName"
                        name="pizzaName"
                        value={dto.pizzaName}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pizzaPrice">Pizza Price:</label>
                    <input
                        type="number"
                        id="pizzaPrice"
                        name="pizzaPrice"
                        value={dto.pizzaPrice}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pizzaSize">Pizza Size:</label>
                    <select
                        id="pizzaSize"
                        name="pizzaSize"
                        value={dto.pizzaSize}
                        onChange={handleChange}
                    >
                        <option value="">Select size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </div>

                <button type="submit" className="btn-primary">{buttonStatus}</button>
            </form>

            <div className="row">
                {pizza.map((p) => (
                    <div key={p.pizzaId} className="cat col-md-4 mb-3">
                        <div className="cat card h-100">
                            <div className="cat card-body">
                                <h5 className="cat card-title">{p.pizzaName}</h5>
                                <h5 className="cat card-title">{p.pizzaPrice}</h5>
                                <h5 className="cat card-title">{p.pizzaSize}</h5>
                            </div>
                            <a href={`/addPizza/${categoryId}/${p.pizzaId}`} className="btn btn-primary">Update Pizza Details</a>
                            <button onClick={() => handleDelete(p.pizzaId)} className="btn btn-danger">Delete Pizza</button>
                            <button class="btn btn-primary" onClick={()=>navigate("/feedback/"+p.pizzaId)}>View FeedBack</button>                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddPizza;
