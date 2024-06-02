import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../service/ApiService";
import './Orders.css';
function CancelOrder() {
    let { oid } = useParams();
    let apiservice = new ApiService();
    let [order, setOrder] = useState([]);
    useEffect(() => {
        apiservice.cancelOrder(oid).then((res) => {
            setOrder(res.data);
        },
            (err) => {
                console.log(err);
            })

    }, []);
    return <div class="placeordercard card">
        <div class="cancelledHeader card-header">
            Status : {order.status}
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Order Id: {order.orderId}</li>
            <li class="list-group-item">Date: {order.orderDate}</li>
            <li class="list-group-item">Bill: Rs. {order.bill}</li>
        </ul>
    </div>
}
export default CancelOrder;