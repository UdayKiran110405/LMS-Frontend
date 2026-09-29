import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const response = await login({ email, password });
      const authData = response.data.data;

      localStorage.setItem("token", authData.token);
      localStorage.setItem("userId", authData.userId);
      localStorage.setItem("name", authData.name);
      localStorage.setItem("email", authData.email);

      const primaryRole = authData.roles[0];
      localStorage.setItem("role", primaryRole);

      if (primaryRole === "ROLE_INSTRUCTOR" || primaryRole === "ROLE_ADMIN") {
        navigate("/instructor");
      } else {
        navigate("/student");
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
          "Invalid credentials or connection error.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 10% 20%, rgb(240, 244, 255) 0%, rgb(248, 250, 252) 90%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "var(--card-bg)",
          padding: "36px",
          borderRadius: "16px",
          boxShadow: "var(--shadow-lg)",
          border: "1px solid rgba(226, 232, 240, 0.8)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              backgroundColor: "var(--primary)",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "22px",
              marginBottom: "12px",
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.35)",
            }}
          >
            E
          </div>
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: "700",
              letterSpacing: "-0.4px",
            }}
          >
            Welcome back
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.88rem",
              marginTop: "4px",
            }}
          >
            Enter your institutional credentials
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              backgroundColor: "var(--danger-bg)",
              color: "var(--danger)",
              padding: "10px 14px",
              borderRadius: "8px",
              marginBottom: "18px",
              fontSize: "0.86rem",
              border: "1px solid #fecaca",
            }}
          >
            {errorMsg}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.82rem",
                fontWeight: "600",
                marginBottom: "6px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. alan@echo.edu"
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.82rem",
                fontWeight: "600",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "8px",
              padding: "12px",
              backgroundColor: "var(--primary)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "0.95rem",
              boxShadow: "0 2px 4px rgba(79, 70, 229, 0.2)",
            }}
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
