import { useMutation } from '@tanstack/react-query';
import { registerApi } from '../../api/authApi';
import { useAuthStore } from '../../store/authStore';

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data, variables) => {
      console.log('Registration success:', data);
      const id = data.data?.id || data.id || 
                 data.data?.user_id || data.user_id || 
                 data.data?.userID || data.userID ||
                 data.data?.User_ID || data.User_ID;

      if (id || variables.email) {
        console.log('Storing registration data in authStore');
        setUser({ 
          id: id?.toString() || '',
          email: variables.email || '' 
        } as any);
      }
    },
  });
};
