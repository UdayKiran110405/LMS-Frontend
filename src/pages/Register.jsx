import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { register } from "../api/authApi";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ROLE_STUDENT",
  });
  const [msg, setMsg] = useState({ error: "", success: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg({ error: "", success: "" });
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        roles: [form.role],
      });
      setMsg({ error: "", success: "Account created! Redirecting..." });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg({
        error: err.response?.data?.message || "Registration failed",
        success: "",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div
        style={{ maxWidth: "420px", margin: "40px auto", padding: "36px" }}
        className="glass-panel"
      >
        <h2
          style={{
            fontSize: "1.6rem",
            textAlign: "center",
            marginBottom: "8px",
          }}
        >
          Create an Account
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            textAlign: "center",
            fontSize: "0.88rem",
            marginBottom: "24px",
          }}
        >
          Join the verified attendance directory
        </p>

        {msg.error && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "14px",
              fontSize: "0.85rem",
            }}
          >
            {msg.error}
          </div>
        )}
        {msg.success && (
          <div
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              color: "#10b981",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "14px",
              fontSize: "0.85rem",
            }}
          >
            {msg.success}
          </div>
        )}

        <form
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.82rem",
                marginBottom: "6px",
              }}
            >
              Full Name
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Alan Turing"
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.82rem",
                marginBottom: "6px",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="alan@echo.edu"
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.82rem",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.82rem",
                marginBottom: "6px",
              }}
            >
              Primary Designation
            </label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="ROLE_STUDENT">Student Candidate</option>
              <option value="ROLE_INSTRUCTOR">Course Instructor</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn-primary"
            style={{ marginTop: "10px" }}
          >
            Register
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            marginTop: "20px",
          }}
        >
          Already have credentials?{" "}
          <Link
            to="/login"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
