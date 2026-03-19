import { useQuery } from '@tanstack/react-query';
import { getCourseAvailabilityApi } from '../../api/courseApi';

export const useCourseAvailability = (id: string | number | undefined) => {
  return useQuery({
    queryKey: ['course-availability', id],
    queryFn: () => getCourseAvailabilityApi(id!),
    enabled: !!id,
  });
};
