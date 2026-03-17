import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../../api/authApi';
import { useAuthStore } from '../../store/authStore';

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // console.log('Login API Success:', data);
      if (data.data?.token) {
        setToken(data.data.token);
      }
      if (data.data?.user) {
        setUser(data.data.user);
      }
    },
  });
};
