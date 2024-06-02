import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ApiService from "../service/ApiService";

function UpdateOrderStatus() {
    const { oid } = useParams();
    const id = parseInt(oid);
    const navigate = useNavigate();
    const apiservice = new ApiService();
    const [selectedValue, setSelectedValue] = useState("");
    const [statusError, setStatusError] = useState("");
    const [or, setOr] = useState({});

    const saveStatus = (event) => {
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
        apiservice.getOrderById(oid).then((res) => {
            setOr(res.data);
        });
    }, []);

    const onsubmithandler = async (event) => {
        event.preventDefault();
        setSelectedValue("Delivered"); // Set selected value to "Delivered" automatically

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

            const requestBody = {
                orderId: id,
                status: "Delivered" // Set the status directly in the request body
            };

            // Making the PUT request to update order status
            await axios.put(
                `http://localhost:8085/orders/status/${oid}`,
                requestBody,
                config
            );

            // Navigate to the orders page after successful update
            navigate("../../orders/");
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    return (
        <div className="updatediv">
            <h5 className="titl card-title">Order ID : {or.orderId} </h5>
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    <li className="ord listitem list-group-item">Order Date: {or.orderDate}</li>
                    <li className="ord listitem list-group-item">Status: {or.status}</li>
                    <li className="ord listitem list-group-item">Bill: Rs. {or.bill}</li>
                </ul>
            </div>
            <button className="btn btn-success" onClick={onsubmithandler}>
                Update
            </button>
            {(or.status !== "Cancelled" && or.status !== "Delivered") && (
                <>
                    <a href={`/orders/cancel/${or.orderId}`} className="btn btn-danger">
                        Cancel Order
                    </a>
                </>
            )}
        </div>
    );
}

export default UpdateOrderStatus;
