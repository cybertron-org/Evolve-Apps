import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { AuthForm } from '../../components/specific/auth/AuthForm';
import AppText from '../../components/common/AppText';

import { useRegister } from '../../hooks/mutations/useRegister';
import { useToast } from '../../hooks/useToast';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { mutate: register, isPending } = useRegister();
  const { showToast } = useToast();

  const handleRegister = (email: string, password: string) => {
    register(
      { email, password },
      {
        onSuccess: () => {
          showToast({
            type: 'success',
            title: 'OTP Sent!',
            message: `Check your inbox: ${email}`
          });
          navigation.navigate('VerifyOTP', { email });
        },
        onError: (error: any) => {
          showToast({
            type: 'error',
            title: 'Registration Failed',
            message: error.response?.data?.message || 'Something went wrong'
          });
        }
      }
    );
  };

  const footer = (
    <View className="flex-row justify-center mt-6">
      <AppText className="text-gray-500">Already have an account? </AppText>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <AppText className="text-[#578096] dark:text-[#BDC3C7] font-bold">Login</AppText>
      </TouchableOpacity>
    </View>
  );

  return (
    <AuthForm
      title="CREATE ACCOUNT"
      subTitleText="Hi, Welcome to evolve vocational"
      buttonTitle={isPending ? "SENDING..." : "GET OTP"}
      onSubmit={handleRegister}
      footer={footer}
    />
  );
};

export default RegisterScreen;
