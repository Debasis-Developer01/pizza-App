import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";
import "./Register.css";

function Register() {
    let [register, setRegister] = useState({});

    let navigate = useNavigate();
    let usernameHandler = (evt) =>
    {
        register.username=evt.target.value;
        setRegister({ ...register, register: evt.target.value });
    };
    let passwordHandler = (evt) => {
        register.password= evt.target.value
        setRegister({ ...register, register: evt.target.value });
    };
    let [valid,setValid] = useState("true");
    let validation = () => {
     
        if (!register.username || register.username === "") {
            setUsernameError("Please enter a username");
            valid = false;
        } else if (!/^[a-z0-9]+$/.test(register.username)) {
            setUsernameError("Username should be all lowercase alphanumeric characters");
            valid = false;
        } else if (/\s/.test(register.username)) {
            setUsernameError("Username should not contain spaces");
            valid = false;
        }
        if (!register.password || register.password === "") {
            setPasswordError("Please enter a password");
            valid = false;
        } else if (!/^[a-zA-Z0-9]{8,15}$/.test(register.password)) {
            setPasswordError("Password should be 8 to 15 characters long and contain only alphanumeric characters");
            valid = false;
        }
    };
 
    let [usernameError, setUsernameError] = useState("");
    let [passwordError, setPasswordError] = useState("");
    let apiservice= new ApiService();
    let signUp = (evt) => {
        evt.preventDefault();
        validation();
        if (valid=="true")
        {
            setRegister(register.role="customer");
            apiservice.register(register).then((res)=>
            {
                localStorage.setItem("registered","true");
                navigate("../");
            },(err)=>
            {
                console.log(err.response.data);
            });
           
        }
    };
 
    return (
        <div className="login-container">
            <form onSubmit={signUp} className="login-form">
                <label>set username</label>
                <input
                    className="form-control"
                    type="text" value={register.username}
                    onChange={usernameHandler}
                    placeholder="Enter username"
                />
                <div>{usernameError}</div>
                <label>set Password</label>
                <input
                    className="form-control"
                    type="password" value={register.password}
                    onChange={passwordHandler}
                />
                <div>{passwordError}</div>
                <br />
                <button type="submit" className="btn btn-secoundry">
                    Register
                </button>
            </form>
        </div>
    );
}
 
export default Register;