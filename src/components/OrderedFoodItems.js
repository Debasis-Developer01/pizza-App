import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import { useParams } from "react-router-dom";
import './Orders.css';
function OrderedFoodItems()
{
    let [food,setFood]=useState([]);
    let {oid}=useParams();
    let apiservice = new ApiService();
    useEffect(()=>
    {
        apiservice.getOrderedFoodItems(oid).then((res)=>
        {
            setFood(res.data);
        })
    },[]);
    return <div class="fooddiv">
 {food.map(food=>
        <div class="ordercard card">
         <img
            className="card-img-top"
            width="45px"
            height="250px"
        />
                    <div class="card-body">
                   {console.log(food.pizzaName)}
                <ul class="list-group list-group-flush">
                    <li class="ord listitem list-group-item">{food.pizzaName}</li>
                    <li class="ord listitem list-group-item">Quantity: {food.quantity}</li>
                </ul>
                </div>
        </div>)}
    </div>
   
}
export default OrderedFoodItems;