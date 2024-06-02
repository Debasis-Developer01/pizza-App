import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";

function Pizza() {
	let [allcategories, setallCategories] = useState([]);
	let apiService = new ApiService();
	const imageUrls = [
		"https://as1.ftcdn.net/v2/jpg/01/33/61/72/1000_F_133617244_dWdivRXwoLVzowl1kn3iFP9JGcuNd8n6.jpg",
		"https://as1.ftcdn.net/v2/jpg/02/10/80/40/1000_F_210804077_nQ8XWe2fBvrCfDP8t1GumjuhHZneikRM.jpg",
		"https://as1.ftcdn.net/v2/jpg/01/74/36/70/1000_F_174367045_6hyh7c8Mkju5Qn1O7mLQqmtfChQMdxZa.jpg",
		"https://as1.ftcdn.net/v2/jpg/00/27/57/96/1000_F_27579652_tM7V4fZBBw8RLmZo0Bi8WhtO2EosTRFD.jpg",
	];

	function getRandomImageUrl() {
		const randomIndex = Math.floor(Math.random() * imageUrls.length);
		return imageUrls[randomIndex];
	}

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
							height={150}
							width={150}
							style={{ objectFit: "cover" }}
							src={getRandomImageUrl()}
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
