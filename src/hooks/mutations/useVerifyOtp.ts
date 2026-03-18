import { useMutation } from '@tanstack/react-query';
import { verifyOtpApi } from '../../api/authApi';
import { useAuthStore } from '../../store/authStore';

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtpApi,
    onSuccess: (data) => {
      console.log('OTP Verification Response Data:', data);
    },
  });
};
