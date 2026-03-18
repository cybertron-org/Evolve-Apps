import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../../api/authApi';
import { useAuthStore } from '../../store/authStore';

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log('Login Response Data:', data);
      const token = data.data?.token || data.token;
      const user = data.data?.user || data.user;

      if (token) {
        setToken(token);
      }
      if (user) {
        setUser(user);
      }
    },

  });
};
