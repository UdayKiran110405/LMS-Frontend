import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div>
      <Navbar />
      <main
        style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}
      >
        <h2
          style={{ fontSize: "2.2rem", fontWeight: 700, marginBottom: "14px" }}
        >
          System Architecture & Defenses
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            lineHeight: 1.7,
            marginBottom: "32px",
          }}
        >
          ECHO Attendance platform combines deterministic authorization
          boundaries with continuous context enforcement.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="glass-panel" style={{ padding: "24px" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                color: "var(--accent)",
                marginBottom: "8px",
              }}
            >
              Anti-IDOR Policy Matrix
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.92rem",
                lineHeight: 1.6,
              }}
            >
              Controller boundaries employ expression-level evaluation checks to
              prevent parameter tampering. Students cannot pull records of other
              peers even with intentional path variable manipulation.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: "24px" }}>
            <h3
              style={{
                fontSize: "1.2rem",
                color: "#10b981",
                marginBottom: "8px",
              }}
            >
              Cryptographic Session Security
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.92rem",
                lineHeight: 1.6,
              }}
            >
              HS256 signature verification over stateless Bearer JSON Web
              Tokens, paired with isolated credential hashing using high-cost
              BCrypt algorithms.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
