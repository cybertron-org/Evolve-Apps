import AppText from '../../components/common/AppText';
import React, { useState } from 'react';
import { View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import { useTheme } from '../../theme/ThemeContext';
import Input from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import GlobalIcon from '../../components/common/GlobalIcon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;
const { height } = Dimensions.get('window');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8}$/;
// const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

const LoginScreen: React.FC = () => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<NavProp>();

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

    console.log('Email:', email,"Password" , password);
    navigation.navigate('VerifyOTP' , { email });
    // setEmail(" ")
    // setPassword(" ")
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
                ? require('../../assets/images/light.png')
                : require('../../assets/images/dark.png')
            }
            className="w-36 h-36"
            resizeMode="contain"
          />

          <AppText className="text-sublabel dark:text-sublabel-dark text-2xl font-bold uppercase mt-4 tracking-widest">
            CREATE ACCOUNT
          </AppText>

          <AppText className="text-sublabel dark:text-sublabel-dark text-sm font-normal mt-1 opacity-70">
            Hi, Welcome to evolve vocational
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
            title="GET OTP"
            className={`rounded-md mt-5 ${isDark ? 'bg-[#BDC3C7]' : 'bg-[#578096]'}`}
            textClassName={isDark ? 'text-[#333337]' : 'text-white'}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;