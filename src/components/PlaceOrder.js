import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import './Orders.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
    const [order, setOrder] = useState({});
    const navigate = useNavigate();
    const apiservice = new ApiService();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Token not found");
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                // Making the POST request to add order
                const response = await axios.post(
                    "http://localhost:8085/orders",
                    null,
                    config
                );

                // Setting the order state with the response data
                setOrder(response.data);
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        };

        // Call the fetchOrder function
        fetchOrder();
    }, []); // Empty dependency array to run the effect only once

    const viewOrderedItems = (orderId) => {
        navigate("../orderitems/" + orderId);
    };

    return (
        <div className="placeordercard">
            <div className="orderhead card-header">
                {/* Status : {order.status} */}
            </div>
            <li className="ord list-group-item">Order Id: {order.orderId}</li>
            <li className="ord list-group-item">Date: {order.orderDate}</li>
            <li className="ord list-group-item">Bill: Rs. {order.bill}</li>
            <button className="orderbtn btn-info" onClick={() => viewOrderedItems(order.orderId)}>View Ordered Pizzas</button>
        </div>
    );
}

export default PlaceOrder;
