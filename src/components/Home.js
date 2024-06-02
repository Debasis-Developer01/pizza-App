import { Route, Routes, useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";
import { useState } from "react";
import Register from "./Register";
import Orders from "./Orders";
import Menu from "./Menu";
import MyOrders from "./MyOrders";
import Cart from "./Cart";
import FeedbackAdmin from "./FeedbackAdmin";
import PlaceOrder from "./PlaceOrder";
import CancelOrder from './CancelOrder';
import UpdateOrderStatus from './UpdateOrderStatus';
import OrderedFoodItems from './OrderedFoodItems';
import Login from "./Login";
import AddCustomerDetails from "./AddCustomerDetails";
import AddCategories from "./AddCategories";
import Admin from "./AdminHome";
import AddPizza from "./AddPizza";
import AddToppings from "./AddToppings";
import Pizza from "./Pizza";
import CustomerHome from "./CustomerHome";
import AdminUpdateOrderStatus from "./AdminUpdateOrderStatus";
import AdminUpadateOrders from "./AdminUpdateOrders";
import Toppings from "./Toppings";
import AddFeedBack from "./AddFeedBack";
import FeedBack from "./FeedBack";
import CustomerSearch from "./CustomerSearch";
import "./Home.css";
function Home() {
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [valid, setValid] = useState(true);
    const apiservice = new ApiService();
    const navigate = useNavigate();
    const [login, setLogin] = useState({});

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        localStorage.removeItem('loginDetails');
        localStorage.setItem('loggedIn', 'false');
        navigate('/');
    };

    const nameHandler = (event) => {
        setLogin((prevLogin) => ({ ...prevLogin, username: event.target.value }));
    };

    const passHandler = (event) => {
        setLogin((prevLogin) => ({ ...prevLogin, password: event.target.value }));
    };

    const validation = () => {
        if (!login.username) {
            setValid(false);
            setUsernameError('Please enter username');
        }
        if (!login.password) {
            setValid(false);
            setPasswordError('Please enter password');
        }
    };

    const register = () => {
        navigate('../register');
    };

    const authorize = (event) => {
        event.preventDefault();
        validation();
        if (valid) {
            apiservice.authenticateLogin(login).then(
                (res) => {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('role', res.data.role);
                    localStorage.setItem('user', login.username);
                    localStorage.setItem('loggedIn', 'true');
                    alert('Logged In Successfully');
                    navigate('../menu');
                },
                (err) => {
                    alert('Login Unsuccessful');
                    navigate('/');
                }
            );
        }
    };

    return (
        <div className={'homepage ' + (localStorage.getItem('loggedIn') == 'true' ? (localStorage.getItem('role') == '[admin]' ? 'admin-background' : 'customer-background') : 'login-register-background')}>
            <div>
    <div>
        {localStorage.getItem('loggedIn') === 'true' && (
            <div className="navigation-container">
                <ul className="navigation-list">
                    {localStorage.getItem('role') === '[admin]' && (
                        <button className="nav-link yellow" onClick={() => navigate('/admin')}>
                            Home
                        </button>
                    )}
                    {localStorage.getItem('role') === '[customer]' && (
                        <>
                            <button className="yellow" onClick={() => navigate('/customer')}>
                                Home
                            </button>
                            <button className="yellow" onClick={() => navigate('/addCustomerDetails')}>
                                Profile
                            </button>
                        </>
                    )}
                </ul>
                <button className="btn logout-btn red" onClick={logout}>
                    Log out
                </button>
            </div>
        )}
    </div>
    </div>
           
           <Routes>
           <Route path="/addCustomerDetails" element={<AddCustomerDetails/>}></Route>
           <Route path="/menu" element={<Menu />}></Route>
           <Route path="/register" element={<Register />}></Route>
           <Route path="/" element={<Login />}></Route>
           <Route path="/addCategories" element={<AddCategories/>}></Route>
           <Route path="/cart" element={<Cart />}></Route>
           <Route path="/placeorder" element={<PlaceOrder />}></Route>
           <Route path="/orders" element={<Orders />}></Route>           
           <Route path="/orders/id" element={<MyOrders />}></Route>
           <Route path="/orders/cancel/:oid" element={<CancelOrder />}></Route>
           <Route path="/orders/updateStatus/:oid" element={<UpdateOrderStatus />}></Route>
           <Route path="/orderitems/:oid" element={<OrderedFoodItems />}></Route>
           <Route path="/admin" element={<Admin/>}></Route>
           <Route path="/addPizza/:categoryId/:pizzaId" element={<AddPizza/>}></Route>
           <Route path="/pizza" element={<Pizza/>}></Route>
           <Route path="/addTopping" element={<AddToppings/>}></Route>
           <Route path="/customer" element={<CustomerHome/>}></Route>
           <Route path="/adminupdateorders" element={<AdminUpadateOrders/>}></Route>
           <Route path="/adminupdateorderstatus" element={<AdminUpdateOrderStatus/>}></Route>
           <Route path="/:id/toppings" element={<Toppings/>}></Route>
           <Route path="/addfeedback/:pizzaId" element={<AddFeedBack/>}></Route>
           <Route path="/feedback/:pizzaId" element={<FeedBack/>}></Route>
           <Route path="/CustomerSearch" element={<CustomerSearch/>}></Route>
           <Route path="/allFeedbacks" element={<FeedbackAdmin/>}></Route>
           <Route path="/:id/toppings" element={<Toppings/>}></Route>



       </Routes>
       </div>
);
}
export default Home;