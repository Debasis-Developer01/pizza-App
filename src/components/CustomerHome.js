import { Outlet, useNavigate } from "react-router-dom";
import './CustomerHome.css';
function CustomerHome(){

    const navigate = useNavigate();
 
    return (
<div className="admin-container">
            <h1 className="admin-title">Customer Dashboard</h1>
            <nav className="admin-nav">
                <ul className="admin-menu">
<li className="admin-menu-item"><button onClick={() => navigate('/menu')}>Pizza</button></li>
<li className="admin-menu-item"><button onClick={() => navigate('/cart')}>Cart</button></li>
<li className="admin-menu-item"><button onClick={() => navigate("/orders/id")}>My Orders</button></li>
</ul>
            </nav>
            <Outlet />
        </div>
    )
}
export default  CustomerHome;