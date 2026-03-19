import { api } from '../services/axiosInstance';

export const getCoursesApi = async () => {
  const response = await api.get('/user/courses');
  return response.data;
};

export const getCourseAvailabilityApi = async (id: string | number) => {
  const response = await api.get(`/user/courses/${id}/availability`);
  return response.data;
};
