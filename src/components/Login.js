import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const apiService = new ApiService();

  const validateForm = () => {
    let valid = true;

    if (!username) {
      setUsernameError("Please enter username");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Please enter password");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const credentials = { username, password };

      apiService.authenticateLogin(credentials)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("user", username);
          localStorage.setItem("loggedIn", true);

          alert("Logged In Successfully");

          if (res.data.role === "[admin]") {
            navigate("/admin");
          } else if (res.data.role === "[customer]") {
            navigate("/customer");
          }
        })
        .catch((err) => {
          alert("Login Unsuccessful");
          navigate("../");
        });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control"
        />
        <span className="error">{usernameError}</span>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
        <span className="error">{passwordError}</span>
        <button type="submit" className="btn btn-primary">Log In</button>
        <button onClick={() => navigate("../register")} className="btn btn-secondary">New User</button>
      </form>
    </div>
  );
}

export default Login;
