import { Outlet, useNavigate } from "react-router-dom";
import "./CustomerHome.css";
import Pizza from "./Pizza";
function CustomerHome() {
	const navigate = useNavigate();

	return (
		<>
			<div className='admin-container'>
				<div>
					<h1 className='admin-title'>Customer Dashboard</h1>
				</div>
				<nav className='admin-nav'>
					<ul className='admin-menu'>
						<li className='admin-menu-item'>
							<button onClick={() => navigate("/menu")}>Pizza</button>
						</li>
						<div style={{ display: "flex", gap: "12px" }}>
							<li className='admin-menu-item'>
								<button onClick={() => navigate("/cart")}>Cart</button>
							</li>
							<li className='admin-menu-item'>
								<button onClick={() => navigate("/orders/id")}>
									My Orders
								</button>
							</li>
						</div>
					</ul>
				</nav>

				<Outlet />
			</div>
			<Pizza />
		</>
	);
}
export default CustomerHome;
