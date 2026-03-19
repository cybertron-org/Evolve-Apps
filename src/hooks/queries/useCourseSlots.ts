import { useQuery } from '@tanstack/react-query';
import { getCourseSlotsApi } from '../../api/courseApi';

export const useCourseSlots = (id: string | number, date: string | null) => {
  return useQuery({
    queryKey: ['courseSlots', id, date],
    queryFn: () => getCourseSlotsApi(id, date as string),
    enabled: !!date,
  });
};
