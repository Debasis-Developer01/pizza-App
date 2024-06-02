import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";
import './Orders.css';
function Orders()
{
    let [orders,setOrders]=useState([]);
    let apiservice = new ApiService();
    useEffect(()=>
    {
        apiservice.getAllOrders().then((res)=>{
            setOrders(res.data);
        })
    },[]);
    let navigate = useNavigate();
    let updateStatusHandler=(oid)=>
    {
        navigate("../orders/updateStatus/"+oid);
    }
    let viewOrderedItems=(orderId)=>
    {
        navigate("../orderitems/"+orderId);
    }
    let [num,setNum]=useState();
    let[valid,setValid]=useState("true");
    let[numberError, setnumberError]= useState();
    let mobileNumber = (event)=>
    {
        setNum(event.target.value);
    }
    let searchByNumber=()=>
    {
        if(num=="" || num==undefined)
        {
            valid=false;
            setnumberError("Please enter mobile number")
        }
        else if(isNaN(num))
        {
            valid=false;
            setnumberError("Number should only contain digits");
        }
        else if(num.length!=10)
        {
            valid=false;
            setnumberError("Number should be 10 digits");
        }
        if(valid=="true")
        {
            navigate("../orders/"+num);
        }
    }
    return <>
    <div className="searchdiv">
    <label class="form-label">Enter Mobile Number</label>
    <input type="text" placeholder="Search Orders By Customer Number" className="inputsearch" onChange={mobileNumber}></input>
    <span class="error">{numberError}</span>
    <button class="btn btn-dark" onClick={searchByNumber}>Search</button><br></br>
    </div>
    <br></br>
    {orders.map(or =>
        <div class="ordercard card">
        <h5 class="titl card-title">Order ID : {or.orderId} </h5>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="ord listitem list-group-item">Order Date: {or.orderDate}</li>
                    <li class="ord listitem list-group-item">Status: {or.status}</li>
                    <li class="ord listitem list-group-item">Bill: Rs. {or.bill}</li>
                    <li class="ord listitem list-group-item">Customer Id: {or.customer.customerId}</li>
                    <li class="ord listitem list-group-item">Customer First Name: {or.customer.customerFirstName}</li>
                    <li class="ord listitem list-group-item">Customer Last Name: {or.customer.customerLastName}</li>
                    <li class="ord listitem list-group-item">Mobile Number: {or.customer.mobileNumber}</li>
                    <li class="ord listitem list-group-item">Email Id: {or.customer.email}</li>
                    
                    <button class="orderbtn btn-info" onClick={()=>viewOrderedItems(or.orderId)}>View Ordered Food Items</button>
                    {
                       (or.status!="Cancelled" && or.status!="Delivered" ) && <>
                    <button class="orderbtn2 btn-warning" onClick={()=>updateStatusHandler(or.orderId)}>Update Status Button</button>
                    </>
                    }
                    </ul>
                </div>
        </div>
    )}
    </>
}
export default Orders;