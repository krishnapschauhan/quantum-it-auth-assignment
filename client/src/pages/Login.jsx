import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        <div className="auth-tab">SIGN IN</div>

        <div className="auth-container">
          <div className="avatar-wrapper">
            <img src="/user1.png" alt="User" />
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <img src="/user1.png" alt="username" />
              <input
                name="name"
                placeholder="Username"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <img src="/lock.png" alt="password" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="forgot">Forgot password?</div>

            <button type="submit">LOGIN</button>

            <p
              style={{
                marginTop: "14px",
                textAlign: "center",
                color: "#94a3b8",
              }}
            >
              Don’t have an account?{" "}
              <Link to="/register" style={{ color: "#22d3ee" }}>
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
