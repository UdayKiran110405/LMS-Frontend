import axiosClient from "./axiosClient";

export const getCourses = () => axiosClient.get("/courses");
export const createCourse = (data) => axiosClient.post("/courses", data);

export const enrollCourse = (courseId) =>
  axiosClient.post("/courses/enroll", { courseId });
export const getEnrolledStudents = (courseId) =>
  axiosClient.get(`/courses/${courseId}/students`);
