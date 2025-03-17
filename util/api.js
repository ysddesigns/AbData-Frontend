import axios from "axios";

const API_URL = "https://auth-backend-8fxa.onrender.com/api/auth/";
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const sendOtp = async (phone) => {
  return api.post(`/send-otp`, { phone });
};

export const sendEmailOtp = async (email) => {
  return axios.post(`/send-email-otp`, { email });
};

export const verifyOtp = async (phone, otp) => {
  return axios.post(`/verify-otp`, { phone, otp });
};

export const verifyEmailOtp = async (email, otp) => {
  return axios.post(`/verify-email-otp`, { email, otp });
};
