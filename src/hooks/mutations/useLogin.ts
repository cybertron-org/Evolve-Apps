import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../../api/authApi';
import { useAuthStore } from '../../store/authStore';

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data, variables) => {
      console.log('Login Response Data:', data);
      const token = data.data?.token || data.token;
      let user = data.data?.user || data.user;
      
      // Prioritize ID from user object, then fallback to other fields
      const id = user?.id || data.data?.id || data.id || 
                 user?.user_id || data.data?.user_id || data.user_id || 
                 user?.userID || data.data?.userID || data.userID;

      if (!user && (id || variables.email)) {
        user = { 
          id: id?.toString() || '', 
          email: variables.email || '' 
        } as any;
      } else if (user) {
        // Ensure ID is a string and always present
        user.id = (user.id || id)?.toString() || '';
        if (!user.email && variables.email) user.email = variables.email;
      }

      if (token) setToken(token);
      if (user) setUser(user);
    },

  });
};
