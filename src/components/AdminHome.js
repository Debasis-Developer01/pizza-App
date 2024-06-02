import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Admin.css'; // Import the CSS file for styling

function Admin() {
    const navigate = useNavigate();

    return (
        <div className="admin-container">
            <h1 className="admin-title">Admin Dashboard</h1>
            <nav className="admin-nav">
                <ul className="admin-menu">
                    <li className="admin-menu-item"><button onClick={() => navigate('/CustomerSearch')}>Customer</button></li>
                    <li className="admin-menu-item"><button onClick={() => navigate('/addCategories')}>Category</button></li>
                    <li className="admin-menu-item"><button onClick={() => navigate('/pizza')}>Pizza</button></li>
                    <li className="admin-menu-item"><button onClick={() => navigate('/addTopping')}>Topping</button></li>
                    <li className="admin-menu-item"><button onClick={() => navigate('/orders')}>Order</button></li>
                    <li className="admin-menu-item"><button onClick={() => navigate('/allFeedbacks')}>Feedbacks</button></li>


                </ul>
            </nav>
            <Outlet />
        </div>
    );
}

export default Admin;
