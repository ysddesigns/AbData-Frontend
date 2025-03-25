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
  return api.post(`/send-email-otp`, { email });
};

export const verifyOtp = async (phone, otp) => {
  return api.post(`/verify-otp`, { phone, otp });
};

export const verifyEmailOtp = async (email, otp) => {
  return api.post(`/verify-email-otp`, { email, otp });
};

export const signupUser = async (userData) => {
  const res = await api.post(
    "https://auth-backend-8fxa.onrender.com/api/auth/register",
    userData,
    { timeout: 30000 }
  );
  return res.data;
};
export const loginUser = async (credentials) => {
  const res = await api.post(
    "https://auth-backend-8fxa.onrender.com/api/auth/login",
    credentials,
    { timeout: 30000 }
  );
  return res.data;
};
