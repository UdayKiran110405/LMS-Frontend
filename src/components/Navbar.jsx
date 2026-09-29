import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [activeWorkspace, setActiveWorkspace] = useState(
    localStorage.getItem("workspace") ||
      (localStorage.getItem("role")?.includes("INSTRUCTOR")
        ? "instructor"
        : "student"),
  );

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name") || "Guest";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const switchWorkspace = (mode) => {
    setActiveWorkspace(mode);
    localStorage.setItem("workspace", mode);
    navigate(`/${mode}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--surface-border)",
        background: "var(--surface)",
        padding: "14px 28px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Brand & Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              color: "var(--text)",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, var(--accent), #ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              E
            </div>
            <span
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              ECHO
            </span>
          </Link>

          <nav style={{ display: "flex", gap: "18px" }}>
            <Link
              to="/"
              style={{
                color: "var(--text-muted)",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              Home
            </Link>
            <Link
              to="/about"
              style={{
                color: "var(--text-muted)",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              About
            </Link>
          </nav>
        </div>

        {/* Workspace Switcher & Profile Options */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {token && (
            <div
              style={{
                display: "flex",
                background: "var(--input-bg)",
                padding: "4px",
                borderRadius: "10px",
                border: "1px solid var(--surface-border)",
              }}
            >
              <button
                onClick={() => switchWorkspace("student")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "none",
                  background:
                    activeWorkspace === "student"
                      ? "var(--accent)"
                      : "transparent",
                  color:
                    activeWorkspace === "student"
                      ? "#fff"
                      : "var(--text-muted)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Student Hub
              </button>
              <button
                onClick={() => switchWorkspace("instructor")}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "none",
                  background:
                    activeWorkspace === "instructor"
                      ? "var(--accent)"
                      : "transparent",
                  color:
                    activeWorkspace === "instructor"
                      ? "#fff"
                      : "var(--text-muted)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Faculty Studio
              </button>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              padding: "8px 12px",
              borderRadius: "10px",
              background: "var(--surface-hover)",
              border: "1px solid var(--surface-border)",
              color: "var(--text)",
              cursor: "pointer",
            }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {token ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                {name}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: "8px 14px",
                  borderRadius: "8px",
                  background: "rgba(239, 68, 68, 0.1)",
                  color: "#ef4444",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  fontSize: "0.85rem",
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "var(--text)",
                  fontSize: "0.9rem",
                  padding: "8px 14px",
                }}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-primary"
                style={{
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  padding: "8px 16px",
                }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
