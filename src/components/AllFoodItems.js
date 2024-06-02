// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ApiService from "../service/ApiService";
// import './Categories.css';
 
// function AllFoodItems() {
//     let [foodItems, setFoodItems] = useState([]);
//     const [filteredFoodItems, setFilteredFoodItems] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     let apiservice = new ApiService();
//     let navigate = useNavigate();
 
//     useEffect(() => {
//         apiservice.getFoodItems().then((res) => {
//             setFoodItems(res.data);
//             setFilteredFoodItems(res.data);
//         },
//             (err) => { console.log("Error " + err) }
//             ,);
//     }, []);
//     useEffect(() => {
//         filterFoodItems();
//     }, [searchQuery]);
 
//     const filterFoodItems = () => {
//         if (!searchQuery) {
//             setFilteredFoodItems(foodItems);
//         } else {
//             const filtered = foodItems.filter((foodItem) =>
//                 foodItem.itemName.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setFilteredFoodItems(filtered);
//         }
//     };
//     let updateFoodItems = (cid, id) => {
//         navigate("../addFoodItems/" + cid + "/" + id);
//     }
//     let deleteHandler = (id) => {
//         if (id != 0) {
//             apiservice.deleteFoodItems(id).then(
//                 () => {
//                     alert("deleted " + id);
//                     window.location.reload();
//                     navigate("../allFoodItems");
//                 }
//             );
//         }
//     }
//     const handleSearchInputChange = (event) => {
//         setSearchQuery(event.target.value);
//     };
//     let [cartdto,setCartDto]=useState({id:0});
//     let addtocart=(id)=>
//     {
//         cartdto.id=id;
//         apiservice.addFoodItemsToCart(cartdto).then((res)=>
//         {
//             navigate("../allFoodItems");
//         }     
//         );
//     }
//     return (
//         <div >
//             <input
//                 className="form-control mb-3"
//                 type="text"
//                 placeholder="Search food items"
//                 value={searchQuery}
//                 onChange={handleSearchInputChange}
//             />
//             <div className="row">
//             {filteredFoodItems.map((foodItem) => (
//                 <div className="col-md-4 mb-4" key={foodItem.id}>
//                     <div className="card-header">
//                         {
//                             localStorage.getItem("role") == "admin" && <>
//                                 <i className="bi bi-trash" onClick={() => deleteHandler(foodItem.id)}></i>
//                             </>
//                         }
//                     </div>
//                     <img
//                         className="card-img-top"
//                         src={`images/${foodItem.itemName}.jpg`}
//                         alt={foodItem.itemName}
//                         width="45px"
//                         height="250px"
//                     />
//                     <div className="card-body">
//                         <h5 className="card-title">{foodItem.itemName}</h5>
//                         <p className="card-text" >{foodItem.itemPrice}</p>
//                         <p className="card-text">{foodItem.subCategory}</p>
//                         {
//                         localStorage.getItem("role")=="customer" && <>
//                         <a href="/cart" className="btn btn-primary" onClick={()=>addtocart(foodItem.id)}>Add to Cart</a>
//                         </>
//                         }
//                         {
//                             localStorage.getItem("role") == "employee" && <>
 
//                                 <button onClick={() => updateFoodItems(foodItem.category.categoryId, foodItem.id)}>Update food item</button>
//                             </>
//                         }
//                     </div>
//                 </div>
//             ))}
//         </div>
//         </div>
//     );
// }
 
// export default AllFoodItems;
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ApiService from "../service/ApiService";
// import './FoodItems.css';
 
// function AllFoodItems() {
//     let [pizza, setPizza] = useState([]);
//     const [filteredPizza, setFilteredPizza] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     let apiservice = new ApiService();
//     let navigate = useNavigate();
 
//     useEffect(() => {
//         apiservice.getAllPizza().then((res) => {
//             setPizza(res.data);
//             setFilteredPizza(res.data);
//         },
//             (err) => { console.log("Error " + err) }
//             ,);
//     }, []);
//     useEffect(() => {
//         filterFoodItems();
//     }, [searchQuery]);
 
//     const filterFoodItems = () => {
//         if (!searchQuery) {
//             setFilteredPizza(pizza);
//         } else {
//             const filtered = pizza.filter((foodItem) =>
//                 foodItem.pizzaName.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setFilteredPizza(filtered);
//         }
//     };
//     let updatePizza = (cid, id) => {
//         navigate("../addPizza/" + cid + "/" + id);
//     }
//     let deleteHandler = (id) => {
//         if (id != 0) {
//             apiservice.deletePizza(id).then(
//                 () => {
//                     alert("deleted " + id);
//                     window.location.reload();
//                     navigate("../getAllPizza");
//                 }
//             );
//         }
//     }
//     const handleSearchInputChange = (event) => {
//         setSearchQuery(event.target.value);
//     };
//     let [cartdto, setCartDto] = useState({ id: 0 });
//     let addtocart = (id) => {
//         cartdto.id = id;
//         apiservice.addPizzaToCart(cartdto).then((res) => {
//             navigate("../getAllPizza");
//         }
//         );
//     }
//     return (
//         <div className="food container mt-4">
//             <input
//                 className="food form-control mb-3"
//                 type="text"
//                 placeholder="Search food items"
//                 value={searchQuery}
//                 onChange={handleSearchInputChange}
//             />
//             <div className="food row">
//                 {filteredPizza.map((foodItem) => (
//                     <div className="food col-md-4 mb-4" key={foodItem.id}>
//                         <div className="food card-header">
//                             {
//                                 localStorage.getItem("role") == "admin" && <>
//                                     <i className="bi bi-trash" onClick={() => deleteHandler(foodItem.id)}></i>
//                                 </>
//                             }
//                         </div>
//                         <div className="cat card h-100">
//                         <img
//                             className="food card-img-top img-fluid"
//                             src={`images/${foodItem.pizzaName}.jpg`}
//                             alt={foodItem.pizzaName}
 
//                         />
//                         <div className="food card-body">
//                             <h5 className="food card-title">{foodItem.pizzaName}</h5>
//                             <p className="food card-text" >Rs.{foodItem.pizzaPrice}</p>
//                             <p className="food card-text">{foodItem.pizzaSize}</p>
//                             {
//                                 localStorage.getItem("role") == "customer" && <>
//                                     <a href="/cart" className="food btn btn-primary" onClick={() => addtocart(foodItem.id)}>Add to Cart</a>
//                                 </>
//                             }
//                             {
//                                 localStorage.getItem("role") == "employee" && <>
 
//                                     <button onClick={() => updatePizza(foodItem.category.categoryId, foodItem.id)}>Update food item</button>
//                                 </>
//                             }
//                             </div>
//                         </div>
//                     </div>
 
//                 ))}
//             </div>
//         </div>
 
//     );
// }
 
// export default AllFoodItems;
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../service/ApiService";
import { useEffect, useState } from "react";
import './FoodItems.css';
 
function AllFoodItems(){
    let apiservice = new ApiService();
    let {categoryname}= useParams();
    let [Pizza,setPizza]=useState([]);
    let navigate = useNavigate();
    let updatePizza = (cid, id) => {
        navigate("../addPizza/" + cid + "/" + id);
    }
    let deleteHandler = (id) => {
        if (id != 0) {
            apiservice.deletePizza(id).then(
                () => {
                    alert("deleted " + id);
                    window.location.reload();
                    navigate("../allPizza");
                }
            );
        }
    }
    let [cartdto,setCartDto]=useState({id:0});
    let addtocart=(id)=>
    {
        cartdto.id=id;
        apiservice.addPizzaToCart(cartdto).then((res)=>
        {
            navigate("../allFoodItems");
        }    
        );
    }
    useEffect(()=>
    {
        apiservice.getPizzaByCategoryName(categoryname).then((res)=>
        {
            setPizza(res.data);
            console.log("hello");
        },
        (err)=>
        {
            console.log(err);
        })
    },[]);
    return(
        <div className="food container mt-4">
            <div className="food row">
        {Pizza.map(pizza =>(
        <div className="food col-md-4 mb-4" key={pizza.id}>
        <div className="food card-header">
            {
                localStorage.getItem("role") == "admin" && <>
                    <i className="bi bi-trash" onClick={() => deleteHandler(pizza.id)}></i>
                </>
            }
        </div>
        <div className="cat card h-100">
        <img
            className="food card-img-top img-fluid"
            src={"../Images/"+pizza.pizzaName+".jpg"}
            alt={pizza.pizzaName}
        />
        <div className="food card-body">
            <h5 className="food card-title">{pizza.pizzaName}</h5>
            <p className="food card-text" >Rs.{pizza.pizzaPrice}</p>
            <p className="food card-text">{pizza.pizzaSize}</p>
            {
            localStorage.getItem("role")=="customer" && <>
            <a href="/cart" className="food btn btn-primary" onClick={()=>addtocart(pizza.id)}>Add to Cart</a>
            </>
            }
            {
                localStorage.getItem("role") == "employee" && <>
 
                    <button onClick={() => updatePizza(pizza.category.categoryId, pizza.id)}>Update Pizza</button>
                </>
            }
            </div>
        </div>
    </div>
        ))}
    </div>
    </div>
    );
   
   
}
export default AllFoodItems;