import React, { useState } from 'react';
import { View, Image, Dimensions, TouchableOpacity } from 'react-native';
import AppText from '../../common/AppText';
import Input from '../../common/Input';
import { Button } from '../../common/Button';
import GlobalIcon from '../../common/GlobalIcon';
import { useTheme } from '../../../theme/ThemeContext';
import { ScreenWrapper } from '../ScreenWrapper';

const { height } = Dimensions.get('window');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

interface AuthFormProps {
  title: string;
  subTitleText: string;
  buttonTitle: string;
  onSubmit: (email: string, password: string) => void;
  footer?: React.ReactNode;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  subTitleText,
  buttonTitle,
  onSubmit,
  footer,
}) => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!EMAIL_REGEX.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!PASSWORD_REGEX.test(password)) {
      setPasswordError('Min 8 characters, must include letters and numbers');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isValid) return;

    onSubmit(email, password);
  };

  return (
    <ScreenWrapper>
      <View className="flex-1 px-6">
        <View
          className="items-center"
          style={{ marginTop: height * 0.12 }}
        >
          <Image
            key={isDark ? 'dark' : 'light'}
            source={
              isDark
                ? require('../../../assets/images/light.png')
                : require('../../../assets/images/dark.png')
            }
            className="w-36 h-36"
            resizeMode="contain"
          />

          <AppText className="text-sublabel dark:text-sublabel-dark text-2xl font-bold uppercase mt-4 tracking-widest text-center">
            {title}
          </AppText>

          <AppText className="text-sublabel dark:text-sublabel-dark text-sm font-normal mt-1 opacity-70 text-center">
            {subTitleText}
          </AppText>
        </View>

        <View className="mt-10 w-full px-4 sm:px-6 md:px-8">
          <View className="w-full max-w-md mx-auto">
            <Input
              label="Enter Your Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError('');
              }}
              keyboardType="email-address"
              placeholder="Enter your Email"
              error={emailError}
            />
            <Input
              label="Enter Your Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError('');
              }}
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
              error={passwordError}
              rightIcon={
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="p-1"
                >
                  <GlobalIcon
                    name={showPassword ? "eye" : "eye-off"}
                    library="Feather"
                    size={20}
                    color={isDark ? "#c1c6cf" : "#9CA3AF"}
                  />
                </TouchableOpacity>
              }
            />
          </View>

          <Button
            title={buttonTitle}
            className={`rounded-md mt-5 ${isDark ? 'bg-[#BDC3C7]' : 'bg-[#578096]'}`}
            textClassName={isDark ? 'text-[#333337]' : 'text-white'}
            onPress={handleSubmit}
          />

          {footer}
        </View>
      </View>
    </ScreenWrapper>
  );
};
