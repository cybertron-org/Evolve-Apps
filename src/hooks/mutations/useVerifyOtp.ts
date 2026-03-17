import { useMutation } from '@tanstack/react-query';
import { verifyOtpApi } from '../../api/authApi';
import { useAuthStore } from '../../store/authStore';

export const useVerifyOtp = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: verifyOtpApi,
    onSuccess: (data) => {
      // console.log('OTP Verification Success:', data);
      if (data.data?.token) {
        setToken(data.data.token);
      }
      if (data.data?.user) {
        setUser(data.data.user);
      }
    },
  });
};
