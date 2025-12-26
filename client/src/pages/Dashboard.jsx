import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../utils/api";

function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/api/auth/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        const roles = ["Admin", "Publisher", "Reviewer", "Moderator", "User"];

        const formatted = data.map((user, index) => ({
          id: index + 1,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : new Date().toLocaleDateString(),
          role: roles[index % roles.length],
          status: index % 2 === 0 ? "Active" : "Inactive",
        }));

        setUsers(formatted);
      })
      .catch(() => {
        localStorage.clear();
        navigate("/login");
      });
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>User Dashboard</h2>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            background: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: "10px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              <th style={th}>#</th>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Date Created</th>
              <th style={th}>Role</th>
              <th style={th}>Status</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={td}>{user.id}</td>
                <td style={td}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img src="/user.png" alt="user" style={{ width: "36px", height: "36px", borderRadius: "50%" }} />
                    <span>{user.name}</span>
                  </div>
                </td>
                <td style={td}>{user.email}</td>
                <td style={td}>{user.createdAt}</td>
                <td style={td}>{user.role}</td>
                <td style={td}>
                  <span style={{ color: user.status === "Active" ? "#22c55e" : "#ef4444" }}>
                    ● {user.status}
                  </span>
                </td>
                <td style={td}>
                  <img src="/setting.png" alt="settings" style={{ width: "18px", marginRight: "10px" }} />
                  <img src="/cancel.png" alt="delete" style={{ width: "18px" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th = { padding: "14px", textAlign: "left", fontWeight: 600 };
const td = { padding: "14px", color: "#334155" };

export default Dashboard;
