import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../service/ApiService";
import { useEffect, useState } from "react";
import './Orders.css';
function OrderByNumber()
{
    let apiservice = new ApiService();
    let {number}= useParams();
    let [orders,setOrders]=useState([]);
    let navigate = useNavigate();
    useEffect(()=>
    {
        apiservice.getOrdersByCustomerNumber(number).then((res)=>
        {
            setOrders(res.data);
        },
        (err)=>
        {
           alert(err.response.data.msg); 
           navigate("../cart");
        });
    },[]);
    return  orders.map(orders=>
        <div class="ordercard card">
        <h5 class="titl card-title">Order ID : {orders.orderId} </h5>
                    <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="listitem list-group-item">Order date: {orders.orderDate}</li>
                    <li class="listitem list-group-item">Status: {orders.status}</li>
                    <li class="listitem list-group-item">Bill: Rs.{orders.bill}</li>
                    <li class="listitem list-group-item">Customer Name: {orders.customer.customerFirstName} {orders.customer.customerLastName}</li> 
                    <li class="listitem list-group-item">Mobile Number: {orders.customer.mobileNumber}</li> 
                </ul>
                </div>
        </div>
        )
   
}
export default OrderByNumber;