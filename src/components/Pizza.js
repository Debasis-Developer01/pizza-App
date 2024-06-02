import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";

function Pizza(){
    let [allcategories,setallCategories]=useState([]);
    let apiService=new ApiService();
     useEffect(() => {
      apiService.getAllCategory().then((res) => {
        setallCategories(res.data);
        
      },
        (err) => { console.log("Error " + err) }
      );
    }, []);

    return <div className="row">
{allcategories.map((category) => (
          <div key={category.categoryId} className="cat col-md-4 mb-4">
            <div className="cat card h-100">
              <div className="cat card-body">
                <h5 className="cat card-title">{category.categoryName}</h5>
              </div>
              <a href={'/addPizza/'+category.categoryId+'/0'}>Add Pizza</a>
            </div>
          </div>
        ))}
        </div>
}
export default Pizza;