import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";
import { useEffect, useState } from "react";
import "./AddCustomerDetails.css";
 
function AddCustomerDetails() {
  const apiService = new ApiService();
  const [buttonStatus, setButtonStatus] = useState("Add customer details");
  const [dto, setDto] = useState({
    customerId: 0,
    username: localStorage.getItem("user"),
    customerFirstName: "",
    customerLastName: "",
    mobileNumber: "",
    address: {
      houseNo: 0,
      streetName: "",
      city: "",
      state: ""
    },
    email: ""
  });
  const [updateIt, setUpdateIt] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    if (updateIt) {
      setButtonStatus("Update Details");
    }
  }, [updateIt]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService.getByUsername();
        if (res.data) {
          setDto(res.data);
          setUpdateIt(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDto((prevDto) => ({
      ...prevDto,
      [name]: value
    }));
  };
 
  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setDto((prevDto) => ({
      ...prevDto,
      address: {
        ...prevDto.address,
        [name]: value
      }
    }));
  };
 
  const reviewSubmit = async (event) => {
    event.preventDefault();
    if (updateIt) {
      try {
        await apiService.updateCustomerDetails(dto).then((res)=>{
            setDto(res.data);
            console.log(dto)
        })
        alert("Updated");
        navigate("../Menu");
      } catch (error) {
        console.error("Error updating customer details:", error);
      }
    } else {
      try {
        console.log(dto)
        await apiService.addCustomerDetails(dto).then((res)=>{
            setDto(res.data);
            console.log(dto)
        })
        alert("Customer details added!!");
        navigate("../Menu");
        localStorage.setItem("added", "true");
      } catch (error) {
        console.error("Error adding customer details:", error);
      }
    }
  };
 
  return (
    <div className="addcnt container">
      <br />
      <form onSubmit={reviewSubmit}>
        <label className="add form-label">Enter your first Name </label>
        <input type="text" className="addin form-control" name="customerFirstName" value={dto.customerFirstName} onChange={handleChange} />
        <br />
        <label className="add form-label">Enter your last Name </label>
        <input type="text" className="addin form-control" name="customerLastName" value={dto.customerLastName} onChange={handleChange} />
        <br />
        <label className="add form-label">Enter mobile number </label>
        <input type="text" className="addin form-control" name="mobileNumber" value={dto.mobileNumber} onChange={handleChange} />
        <br />
        <label className="add form-label">Enter email </label>
        <input type="text" className="addin form-control" name="email" value={dto.email} onChange={handleChange} />
        <br />
        <label className="add form-label">Enter houseNo</label>
        <input type="number" className="addin form-control" name="houseNo" value={dto.address.houseNo} onChange={handleAddressChange} />
        <br />
        <label className="add form-label">Enter street name </label>
        <input type="text" className="addin form-control" name="streetName" value={dto.address.streetName} onChange={handleAddressChange} />
        <br />
        <label className="add form-label">Enter your city </label>
        <input type="text" className="addin form-control" name="city" value={dto.address.city} onChange={handleAddressChange} />
        <br />
        <label className="add form-label">Enter state</label>
        <input type="text" className="addin form-control" name="state" value={dto.address.state} onChange={handleAddressChange} />
        <br />
        <button type="submit" className="cbtn btn btn-primary">{buttonStatus}</button>
      </form>
    </div>
  );
}
 
export default AddCustomerDetails;