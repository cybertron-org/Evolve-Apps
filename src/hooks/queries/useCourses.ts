import { useQuery } from '@tanstack/react-query';
import { getCoursesApi } from '../../api/courseApi';

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: getCoursesApi,
  });
};
