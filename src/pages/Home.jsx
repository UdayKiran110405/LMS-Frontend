import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main
        style={{
          maxWidth: "1000px",
          margin: "80px auto",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: "24px",
            background: "var(--accent-glow)",
            color: "var(--accent)",
            fontSize: "0.85rem",
            fontWeight: 600,
            marginBottom: "20px",
          }}
        >
          Next-Gen Academic Tracking
        </span>
        <h1
          style={{
            fontSize: "3.6rem",
            fontWeight: 700,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: "20px",
          }}
        >
          Real-time Attendance with Zero Complexity.
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "1.2rem",
            maxWidth: "640px",
            margin: "0 auto 36px auto",
            lineHeight: 1.6,
          }}
        >
          Designed for institutes requiring verified identity security,
          contextual anti-IDOR guards, and instant workspace interchangeability.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <Link
            to="/register"
            className="btn-primary"
            style={{
              textDecoration: "none",
              padding: "14px 28px",
              fontSize: "1rem",
            }}
          >
            Get Started Free
          </Link>
          <Link
            to="/about"
            style={{
              textDecoration: "none",
              color: "var(--text)",
              padding: "14px 28px",
              borderRadius: "12px",
              border: "1px solid var(--surface-border)",
              background: "var(--surface)",
              fontWeight: 600,
            }}
          >
            Architecture Specs
          </Link>
        </div>
      </main>
    </div>
  );
}
