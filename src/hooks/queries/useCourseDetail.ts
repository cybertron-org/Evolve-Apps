import { useQuery } from '@tanstack/react-query';
import { getCoursesApi } from '../../api/courseApi';

export const useCourseDetail = (id: string | number | undefined) => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: getCoursesApi,
    select: (data) => data?.data?.find((course: any) => course.id === Number(id)),
    enabled: !!id,
  });
};
