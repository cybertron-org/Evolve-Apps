import { api } from '../services/axiosInstance';

export const getCoursesApi = async () => {
  const response = await api.get('/user/courses');
  return response.data;
};

export const getCourseAvailabilityApi = async (id: string | number) => {
  const response = await api.get(`/user/courses/${id}/availability`);
  return response.data;
};

export const getCourseSlotsApi = async (id: string | number, date: string) => {
  const response = await api.get(`/user/courses/${id}/availability/slots`, {
    params: { date }
  });
  return response.data;
};
