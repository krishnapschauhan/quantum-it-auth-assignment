import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
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

    const response = await fetch("http://localhost:5000/api/auth/register", {
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
      alert(data.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
    <div className="auth-wrapper">
      <div className="auth-tab">SIGN UP</div>

      <div className="auth-container">
        <div className="avatar-wrapper">
          <img src="/user1.png" alt="User" />
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <img src="/user1.png" alt="name" />
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <img src="/calendar.png" alt="dob" />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <img src="/mail.png" alt="email" />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
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

          <button type="submit">REGISTER</button>

          <p
            style={{
              marginTop: "14px",
              textAlign: "center",
              color: "#94a3b8",
            }}
          >
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#22d3ee" }}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Register;
