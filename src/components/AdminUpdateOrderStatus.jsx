import React, { useState } from 'react';
import ApiService from '../service/ApiService';

function AdminUpdateOrderStatus() {
    const [orderId, setOrderId] = useState('');
    const apiService = new ApiService();

    const handleSubmit = (e) => {
        e.preventDefault();
        apiService.updateOrderStatus(orderId)
            .then(response => {
                console.log('Order status updated successfully:', response.data);
                setOrderId('');
            })
            .catch(error => {
                console.error('Error updating order status:', error);
            });
    };

    return (
        <div>
            <h2>Update Order Status</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="orderId">Order ID:</label>
                <input
                    type="text"
                    id="orderId"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />
                <button type="submit">Update Status</button>
            </form>
        </div>
    );
}

export default AdminUpdateOrderStatus;