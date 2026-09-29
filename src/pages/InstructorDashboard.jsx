import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getCourses,
  createCourse,
  getEnrolledStudents,
} from "../api/courseApi";
import { recordAttendance } from "../api/attendanceApi";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  // Creation form
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");

  // Attendance submission form (Dropdown powered)
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [status, setStatus] = useState("PRESENT");
  const [remarks, setRemarks] = useState("");

  const loadCourses = async () => {
    try {
      const res = await getCourses();
      const list = res.data.data;
      setCourses(list);
      if (list.length > 0) {
        setSelectedCourseId(list[0].id);
        fetchEnrolled(list[0].id);
      }
    } catch {
      setFeedback({ type: "error", text: "Failed to synchronize courses." });
    }
  };

  const fetchEnrolled = async (courseId) => {
    try {
      const res = await getEnrolledStudents(courseId);
      const studs = res.data.data;
      setEnrolledStudents(studs);
      if (studs.length > 0) {
        setSelectedStudentId(studs[0].id);
      } else {
        setSelectedStudentId("");
      }
    } catch {
      setEnrolledStudents([]);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCourseChange = (id) => {
    setSelectedCourseId(id);
    fetchEnrolled(id);
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await createCourse({ courseCode, courseName });
      setFeedback({ type: "success", text: `Course registered successfully!` });
      setCourseCode("");
      setCourseName("");
      loadCourses();
    } catch (err) {
      setFeedback({
        type: "error",
        text: err.response?.data?.message || "Course creation error.",
      });
    }
  };

  const handleRecordAttendance = async (e) => {
    e.preventDefault();
    if (!selectedStudentId) {
      setFeedback({
        type: "error",
        text: "No student selected or course has no enrolled students.",
      });
      return;
    }
    try {
      await recordAttendance({
        courseId: Number(selectedCourseId),
        studentId: Number(selectedStudentId),
        attendanceDate,
        status,
        remarks,
      });
      setFeedback({ type: "success", text: "Attendance logged successfully!" });
      setRemarks("");
    } catch (err) {
      setFeedback({
        type: "error",
        text: err.response?.data?.message || "Attendance recording failed.",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <main
        style={{ maxWidth: "1100px", margin: "30px auto", padding: "0 24px" }}
      >
        <h2
          style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "6px" }}
        >
          Faculty Studio
        </h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
          Manage classes and record sessions without looking up student IDs.
        </p>

        {feedback.text && (
          <div
            style={{
              padding: "12px 18px",
              borderRadius: "12px",
              marginBottom: "24px",
              background:
                feedback.type === "success"
                  ? "rgba(16, 185, 129, 0.1)"
                  : "rgba(239, 68, 68, 0.1)",
              color: feedback.type === "success" ? "#10b981" : "#ef4444",
              border: `1px solid ${feedback.type === "success" ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
            }}
          >
            {feedback.text}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "28px",
          }}
        >
          {/* Attendance Log Card */}
          <div className="glass-panel" style={{ padding: "28px" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>
              Mark Session Presence
            </h3>
            <form
              onSubmit={handleRecordAttendance}
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    marginBottom: "6px",
                    color: "var(--text-muted)",
                  }}
                >
                  Target Course
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => handleCourseChange(e.target.value)}
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.courseCode} — {c.courseName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    marginBottom: "6px",
                    color: "var(--text-muted)",
                  }}
                >
                  Enrolled Student
                </label>
                {enrolledStudents.length === 0 ? (
                  <div
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.88rem",
                      padding: "8px 0",
                    }}
                  >
                    No students currently enrolled in this course.
                  </div>
                ) : (
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                  >
                    {enrolledStudents.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.email})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      marginBottom: "6px",
                      color: "var(--text-muted)",
                    }}
                  >
                    Session Date
                  </label>
                  <input
                    type="date"
                    value={attendanceDate}
                    onChange={(e) => setAttendanceDate(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      marginBottom: "6px",
                      color: "var(--text-muted)",
                    }}
                  >
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="PRESENT">PRESENT</option>
                    <option value="ABSENT">ABSENT</option>
                    <option value="EXCUSED">EXCUSED</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    marginBottom: "6px",
                    color: "var(--text-muted)",
                  }}
                >
                  Notes / Remarks
                </label>
                <input
                  placeholder="e.g. Attended lecture"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ marginTop: "8px" }}
              >
                Log Record
              </button>
            </form>
          </div>

          {/* New Course Card */}
          <div
            className="glass-panel"
            style={{ padding: "28px", height: "fit-content" }}
          >
            <h3 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>
              Add Curriculum Course
            </h3>
            <form
              onSubmit={handleCreateCourse}
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    marginBottom: "6px",
                    color: "var(--text-muted)",
                  }}
                >
                  Course Code
                </label>
                <input
                  required
                  placeholder="CS502"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    marginBottom: "6px",
                    color: "var(--text-muted)",
                  }}
                >
                  Course Title
                </label>
                <input
                  required
                  placeholder="Neural Networks"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn-primary"
                style={{ marginTop: "8px" }}
              >
                Register Class
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
