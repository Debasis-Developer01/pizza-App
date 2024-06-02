import ApiService from "../service/ApiService";
import {useEffect,useState} from "react";
import './Orders.css';
import { useNavigate } from "react-router-dom";
function MyOrders()
{
    let apiservice = new ApiService();
    let [orders,setOrders]=useState([]);
    useEffect(()=>
    {
        apiservice.getOrdersByCustomer().then((res)=>
        {
            setOrders(res.data);
            console.log(res.data);
        },
        (err)=>
        {
            console.log(err);
        })
    },[]);
    let navigate = useNavigate();
    let viewOrderedItems=(orderId)=>
    {
        navigate("../orderitems/"+orderId);
    }
    return orders.map(or =>
        <div class="ordercard card">
        <h5 class="titl card-title">Order {or.status}</h5>
                    <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="ord listitem list-group-item">Order ID : {or.orderId} </li>
                    <li class="ord listitem list-group-item">Ordered on {or.orderDate}</li>
                    <li class="ord listitem list-group-item">Bill: Rs. {or.bill}</li>
                    {
                       (or.status!="Cancelled" && or.status!="Delivered") && <>
                       <a href={"/orders/cancel/"+or.orderId} class="btn btn-danger">Cancel Order</a>
                       </>
                    }
                    <button class="orderbtn btn-info" onClick={()=>viewOrderedItems(or.orderId)}>View Ordered Food Items</button>
                </ul>
                </div>
        </div>
        );
}
export default MyOrders;