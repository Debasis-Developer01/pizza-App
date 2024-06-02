import React, { useState, useEffect } from 'react';
import ApiService from '../service/ApiService'; // Assuming ApiService is correctly imported and defined
import { useNavigate } from 'react-router-dom';
//import './PizzaSearch.css'; // Assuming you have a CSS file for styling
 
const Menu = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [pizzas, setPizzas] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const apiService = new ApiService();
    let navigate = useNavigate();
    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await apiService.getAllPizza();
                setPizzas(response.data);
                setSearchResults(response.data); // Initially, search results are same as all pizzas
                setError(null);
            } catch (error) {
                setError('Error fetching pizzas');
                console.error('Error fetching pizzas:', error);
            }
        };
 
        fetchPizzas();
    }, []);
 
    const handleSearch = async () => {
        if (!searchQuery) {
            setSearchResults(pizzas); // Reset search results if search query is empty
            return;
        }
 
        try {
            let response;
            if (!isNaN(searchQuery)) { // If searchQuery is a number, search by pizza ID
                response = await apiService.getPizzaById(searchQuery);
            } else if (searchQuery=== 'small') {
                response = await apiService.getPizzaBySize(searchQuery);
            } else if (searchQuery=== 'medium') {
                    response = await apiService.getPizzaBySize(searchQuery);
            }  else if (searchQuery === 'large') {
                    response = await apiService.getPizzaBySize(searchQuery);
               
            } else if (searchQuery === 'veg') {
                response = await apiService.getPizzaByCategoryName(searchQuery);
            } else if (searchQuery === 'non veg') {
                response = await apiService.getPizzaByCategoryName(searchQuery);
         
            } else { // Otherwise, search by pizza name
                response = await apiService.getPizzaByName(searchQuery);
            }
 
            const filteredPizzas = response.data;
            setSearchResults(filteredPizzas);
            setError(null);
        } catch (error) {
            setError('Error searching pizzas');
            console.error('Error searching pizzas:', error);
        }
    };
 
    const handleAddToCart = (pizzaId) => {
        // Implement your logic to add pizza to cart here
        navigate('/'+pizzaId+'/toppings')
        console.log('Add to cart clicked for pizza ID:', pizzaId);
    };
 
    return (
        <div className="pizza-search-container">
            <h2>Pizza Search</h2>
            <input
                type="text"
                placeholder="Search by Pizza ID, Name, Size, or Category (e.g., size:large, category:veggie)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p className="error">{error}</p>}
            <div className="pizza-list">
                {searchResults.map(pizza => (
                    <div className="pizza-card" key={pizza.pizzaId}>
                        <h3>{pizza.pizzaId}</h3>
                        <p>Pizza Name : {pizza.pizzaName}</p>
                        <p>Pizza Size:{pizza.pizzaSize}</p>
                        <p>Category: {pizza.category.categoryName}</p>
                        <p>Price : {pizza.pizzaPrice}</p>
                        <button class="btn btn-primary "onClick={() => handleAddToCart(pizza.pizzaId)}>Add to Cart</button>
                        <button class="btn btn-primary" onClick={()=>navigate("/addFeedback/"+pizza.pizzaId)}>Add FeedBack</button>&ensp;
                        <button class="btn btn-primary" onClick={()=>navigate("/feedback/"+pizza.pizzaId)}>View FeedBack</button>
                        {/* Add more pizza details if needed */}
                    </div>
                ))}
            </div>
        </div>
    );
};
 
export default Menu;