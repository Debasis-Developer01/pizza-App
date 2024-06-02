import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";

function Pizza() {
	let [allcategories, setallCategories] = useState([]);
	let apiService = new ApiService();
	useEffect(() => {
		apiService.getAllCategory().then(
			(res) => {
				setallCategories(res.data);
			},
			(err) => {
				console.log("Error " + err);
			},
		);
	}, []);

	return (
		<div className='row'>
			{allcategories.map((category) => (
				<div key={category.categoryId} className='cat col-md-4 mb-4'>
					<div className='card'>
						<img
							src='https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp'
							class='card-img-top'
							alt='Fissure in Sandstone'
						/>

						<div className='card-body'>
							<h5 className='card-text'>{category.categoryName}</h5>
						</div>
						<div
							className='w-100'
							style={{ display: "flex", justifyContent: "center" }}
						>
							<button
								type='button'
								class='btn btn-secondary '
								data-mdb-ripple-init
							>
								<a
									href={"/addPizza/" + category.categoryId + "/0"}
									style={{ all: "unset" }}
								>
									+ Add Pizza
								</a>
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
export default Pizza;
