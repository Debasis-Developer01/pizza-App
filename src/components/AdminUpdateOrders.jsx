
import React, { useEffect, useState } from 'react';
import ApiService from '../service/ApiService';

function AdminUpadateOrders() {
    const [orders, setOrders] = useState([]);
    const apiService = new ApiService();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        apiService.getAllOrders()
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    };

    const cancelOrder = (orderId) => {
        apiService.cancelOrder(orderId)
            .then(response => {
                console.log('Order canceled successfully:', response.data);
                fetchOrders(); // Refresh orders after cancellation
            })
            .catch(error => {
                console.error('Error canceling order:', error);
            });
    };

    return (
        <div>
            <h2>Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        Order ID: {order.id}, Status: {order.status}
                        <button onClick={() => cancelOrder(order.id)}>Cancel</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminUpadateOrders;