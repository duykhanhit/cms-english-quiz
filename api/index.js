import axios from "axios";

const baseUrl = "http://13.229.240.165:3000/api";

export const login = (user) =>
  axios.post(`${baseUrl}/auth/login`, user, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getMe = (token) =>
  axios.get(`${baseUrl}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const getExams = (token) =>
  axios.get(`${baseUrl}/exam`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const getExamDetail = (token, examId) =>
  axios.get(`${baseUrl}/exam/${examId}?mode=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const createExam = (token, exam) =>
  axios.post(`${baseUrl}/exam`, exam, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const createQuestion = (token, question) =>
  axios.post(`${baseUrl}/question`, question, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const createAnswers = (token, answers) =>
  axios.post(`${baseUrl}//answers`, answers, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
