import { useMutation } from '@tanstack/react-query';
import { updateProfileApi } from '../../api/authApi';
import { useAuthStore } from '../../store/authStore';

export const useUpdateProfile = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: updateProfileApi,
    onSuccess: (data) => {
      console.log('Update Profile Response Data:', data);
      const user = data.data?.user || data.user;

      if (user) {
        setUser({
          ...user,
          id: user.id.toString(),
          profile_completed: user.profile_completed,
        });
      }
    },
  });
};
