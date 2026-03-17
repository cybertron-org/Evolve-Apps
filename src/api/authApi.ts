import { api } from '../services/axiosInstance';

export const loginApi = async (credentials: { email: string; password?: string }) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerApi = async (userData: { email: string; password?: string; name?: string }) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const verifyOtpApi = async (data: { email: string; otp: string }) => {
  const response = await api.post('/auth/verify-otp', data);
  return response.data;
};

export const logoutApi = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};
