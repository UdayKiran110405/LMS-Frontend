import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getStudentAttendance } from "../api/attendanceApi";
import { getCourses, enrollCourse } from "../api/courseApi";

export default function StudentDashboard() {
  const [records, setRecords] = useState([]);
  const [courses, setCourses] = useState([]);
  const [statusMsg, setStatusMsg] = useState("");
  const studentId = localStorage.getItem("userId");

  const loadData = async () => {
    try {
      const [attRes, courseRes] = await Promise.all([
        getStudentAttendance(studentId),
        getCourses(),
      ]);
      setRecords(attRes.data.data);
      setCourses(courseRes.data.data);
    } catch (err) {
      setStatusMsg(
        err.response?.data?.message || "Failed to fetch dashboard data.",
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEnroll = async (courseId) => {
    setStatusMsg("");
    try {
      await enrollCourse(courseId);
      setStatusMsg("Enrolled successfully!");
      loadData();
    } catch (err) {
      setStatusMsg(err.response?.data?.message || "Enrollment failed.");
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      PRESENT: {
        bg: "var(--success-bg)",
        color: "var(--success)",
        border: "#bbf7d0",
      },
      ABSENT: {
        bg: "var(--danger-bg)",
        color: "var(--danger)",
        border: "#fecaca",
      },
      EXCUSED: {
        bg: "var(--warning-bg)",
        color: "var(--warning)",
        border: "#fef08a",
      },
    }[status] || { bg: "#f1f5f9", color: "#64748b", border: "#e2e8f0" };

    return (
      <span
        style={{
          display: "inline-block",
          padding: "3px 10px",
          borderRadius: "12px",
          fontSize: "0.75rem",
          fontWeight: "700",
          backgroundColor: config.bg,
          color: config.color,
          border: `1px solid ${config.border}`,
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div>
      <Navbar />
      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "16px 24px 60px 24px",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              letterSpacing: "-0.5px",
            }}
          >
            Student Attendance
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Review logged attendance across enrolled subjects
          </p>
        </div>

        {statusMsg && (
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              backgroundColor: "#eff6ff",
              color: "#1d4ed8",
              border: "1px solid #bfdbfe",
              marginBottom: "20px",
              fontSize: "0.88rem",
            }}
          >
            {statusMsg}
          </div>
        )}

        {/* Attendance Table Card */}
        <div
          style={{
            backgroundColor: "var(--card-bg)",
            borderRadius: "12px",
            boxShadow: "var(--shadow-sm)",
            border: "1px solid var(--border)",
            overflow: "hidden",
            marginBottom: "36px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f8fafc",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <th
                  style={{
                    padding: "12px 18px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    color: "var(--text-muted)",
                  }}
                >
                  DATE
                </th>
                <th
                  style={{
                    padding: "12px 18px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    color: "var(--text-muted)",
                  }}
                >
                  COURSE
                </th>
                <th
                  style={{
                    padding: "12px 18px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    color: "var(--text-muted)",
                  }}
                >
                  STATUS
                </th>
                <th
                  style={{
                    padding: "12px 18px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    color: "var(--text-muted)",
                  }}
                >
                  INSTRUCTOR
                </th>
                <th
                  style={{
                    padding: "12px 18px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    color: "var(--text-muted)",
                  }}
                >
                  REMARKS
                </th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "32px",
                      color: "var(--text-muted)",
                      fontSize: "0.9rem",
                    }}
                  >
                    No attendance records logged yet.
                  </td>
                </tr>
              ) : (
                records.map((r) => (
                  <tr
                    key={r.attendanceId}
                    style={{
                      borderBottom: "1px solid var(--border)",
                      fontSize: "0.88rem",
                    }}
                  >
                    <td style={{ padding: "14px 18px", fontWeight: "500" }}>
                      {r.attendanceDate}
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <span
                        style={{ fontWeight: "600", color: "var(--primary)" }}
                      >
                        {r.courseCode}
                      </span>{" "}
                      - {r.courseName}
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      {getStatusBadge(r.status)}
                    </td>
                    <td
                      style={{
                        padding: "14px 18px",
                        color: "var(--text-muted)",
                      }}
                    >
                      {r.markedByName}
                    </td>
                    <td
                      style={{
                        padding: "14px 18px",
                        color: "var(--text-muted)",
                      }}
                    >
                      {r.remarks || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Available Courses Grid */}
        <h3
          style={{
            fontSize: "1.2rem",
            fontWeight: "700",
            marginBottom: "14px",
          }}
        >
          Available Courses
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {courses.map((c) => (
            <div
              key={c.id}
              style={{
                backgroundColor: "var(--card-bg)",
                borderRadius: "12px",
                padding: "18px",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    color: "var(--primary)",
                    backgroundColor: "var(--primary-light)",
                    padding: "2px 8px",
                    borderRadius: "6px",
                  }}
                >
                  {c.courseCode}
                </span>
                <h4
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginTop: "10px",
                    marginBottom: "4px",
                  }}
                >
                  {c.courseName}
                </h4>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  Instructor: {c.instructorName}
                </p>
              </div>
              <button
                onClick={() => handleEnroll(c.id)}
                style={{
                  marginTop: "16px",
                  padding: "8px 14px",
                  backgroundColor: "#f1f5f9",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "var(--text-main)",
                }}
              >
                Enroll Course
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
