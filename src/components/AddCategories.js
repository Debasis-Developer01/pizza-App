import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import './AddCategories.css'; // Import the CSS file

function AddCategories() {
  let [categories, setCategories] = useState({ categoryName: '' });
  let [allCategories, setAllCategories] = useState([]);
  let { id } = useParams();
  let navigate = useNavigate();

  let [todo, setTodo] = useState("Add category");
  let apiservice = new ApiService();

  let categoryNameHandler = (evt) => {
    categories.categoryName = evt.target.value;
    setCategories((prevState) => {
      return {
        ...prevState,
        categoryName: evt.target.value
      };
    });
  }

  useEffect(() => {
    apiservice.getAllCategory().then((res) => {
      setAllCategories(res.data);
    },
      (err) => { console.log("Error " + err) }
    );
  }, []);

  let [valid, setValid] = useState(true);
  let [CategoryNameError, setCategoryNameError] = useState("");
  let validation = () => {
    if (!categories.categoryName) {
      setValid(false);
      setCategoryNameError("Please enter a valid category name");
    } else {
      setValid(true);
      setCategoryNameError("");
    }
  }

  let submitHandler = (evt) => {
    evt.preventDefault();
    validation();
    if (valid) {
      apiservice.addCategory(categories).then(
        (res) => {
          alert("Category Added Successfully!!!!");
          // Refresh the category list after adding new category
          apiservice.getAllCategory().then((res) => {
            setAllCategories(res.data);
          });
        },
        err => { alert(err.response.data.msg); console.log(err) }
      );
    }
  }

  let deleteCategoryHandler = (categoryId) => {
    apiservice.deleteCategory(categoryId).then(
      (res) => {
        alert("Category Deleted Successfully!!!!");
        // Refresh the category list after deletion
        apiservice.getAllCategory().then((res) => {
          setAllCategories(res.data);
        });
      },
      err => { alert(err.response.data.msg); console.log(err) }
    );
  }

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Category Name</label>
          <input type="text" value={categories.categoryName} className="form-control" id="exampleFormControlSelect1" onChange={categoryNameHandler} />
          <span className="error">{CategoryNameError}</span>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">{todo} </button>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/admin')}> Back </button>
      </form>
      <div className="row">
        {allCategories.map((category) => (
          <div key={category.categoryId} className="cat col-md-4 mb-4">
            <div className="cat card h-100">
              <div className="cat card-body">
                <h5 className="cat card-title">{category.categoryName}</h5>
                <button className="btn btn-danger" onClick={() => deleteCategoryHandler(category.categoryId)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddCategories;
