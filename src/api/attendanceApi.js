import axiosClient from "./axiosClient";

export const recordAttendance = (data) => axiosClient.post("/attendance", data);
export const updateAttendance = (id, data) =>
  axiosClient.put(`/attendance/${id}`, data);
export const getStudentAttendance = (studentId) =>
  axiosClient.get(`/attendance/student/${studentId}`);
