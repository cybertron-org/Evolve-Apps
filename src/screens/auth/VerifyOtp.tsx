import AppText from '../../components/common/AppText';
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView} from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import { useTheme } from '../../theme/ThemeContext';
import { Button } from '../../components/common/Button';
import GlobalIcon from '../../components/common/GlobalIcon';
import Input from '../../components/common/Input';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useToast } from '../../hooks/useToast';
import AccountCreated from '../../components/specific/AccountCreated';

const { height ,width  } = Dimensions.get('window');
const otpFontSize = width < 360 ? 14 : width < 400 ? 18 : 22;
type NavProp = NativeStackNavigationProp<RootStackParamList>;

type VerifyOTPParams = { 
    email: string
};


const VerifyOTP: React.FC = () => {
    const { isDark } = useTheme();
    const navigation = useNavigation<NavProp>();
    const { showToast } = useToast();
const route = useRoute<RouteProp<{ VerifyOTP: VerifyOTPParams }, 'VerifyOTP'>>();
const { email } = route.params;


useEffect(() => {
  showToast({
    type: 'success',
    title: 'OTP Sent!',
    message: `Check your inbox: ${email}`});
}, []); 


    const [otp, setOtp] = useState(['', '', '', '']);
    const [showAccountCreated, setShowAccountCreated] = useState(false);
    const inputRefs = useRef<Array<any | null>>([]);

    const phoneNumber = '+823478252532';

    useEffect(() => {
        if (showAccountCreated) {
            const timer = setTimeout(() => {
                navigation.navigate('AddProfile');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showAccountCreated, navigation]);

    const handleOtpChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Auto focus next input
        if (text && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOTP = () => {
        const otpString = otp.join('');
        if (otpString.length === 4) {
            console.log('Verifying OTP:', otpString);
            setShowAccountCreated(true);
        } else {
            console.log('Please enter complete OTP');
        }
    };

    const handleResendCode = () => {
        console.log('Resending OTP...');
    };

     const getInputBgColor = (value: string) => {
        if (value) {
            return isDark ? '#374151' : '#E5E7EB'; 
        }
        return isDark ? '#BDC3C7' : '#F3F4F6';
    };

    if (showAccountCreated) {
        return <AccountCreated />;
    }

    return (
        <ScreenWrapper>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1 px-6">

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            className="mt-4 w-10 h-10 items-center justify-center"
                        >
                            <GlobalIcon
                                name="arrow-left"
                                library="Feather"
                                size={24}
                                color={isDark ? '#F1F5F9' : '#1E293B'}
                            />
                        </TouchableOpacity>

                        <View className="items-center" style={{ marginTop: height * 0.05 }}>
                            <Image
                                key={isDark ? 'dark' : 'light'}
                                source={
                                    isDark
                                        ? require('../../assets/images/light.png')
                                        : require('../../assets/images/dark.png')
                                }
                                className="w-28 h-28"
                                resizeMode="contain"
                            />

                            <AppText className="text-sublabel dark:text-sublabel-dark text-xl font-bold uppercase mt-4 tracking-widest">
                                OTP VERIFICATION
                            </AppText>

                            <AppText className="text-sublabel dark:text-sublabel-dark text-sm font-normal mt-2 opacity-70">
                                Code has been sent to {phoneNumber}
                            </AppText>
                        </View>

                        <View className="mt-10 w-full">
                            <View className="flex-row justify-between items-center px-4">
                                {otp.map((digit, index) => (
                                    <React.Fragment key={index}>
                                        <View className="items-center">
                                            <Input
                                                {...{
                                                    ref: (ref: any) => (inputRefs.current[index] = ref)
                                                } as any}
                                                value={digit}
                                                onChangeText={(text) => handleOtpChange(text, index)}
                                                onKeyPress={(e) => handleKeyPress(e, index)}
                                                keyboardType="number-pad"
                                                maxLength={1}
                                                className="w-16 text-center font-bold px-0"
                                                style={[
                                                {
                                                        backgroundColor: getInputBgColor(digit),fontSize: otpFontSize }]
                                            }
                                            />
                                        </View>
                                        {index === 1 && (
                                            <AppText className="text-2xl font-bold text-sublabel dark:text-sublabel-dark mx-2">
                                                -
                                            </AppText>
                                        )}
                                    </React.Fragment>
                                ))}
                            </View>
                        </View>

                       <View className=" justify-center items-center mt-8">
                            <AppText className="text-sublabel dark:text-sublabel-dark text-base not-italic font-normal">
                                Didn't get OTP Code?{' '}
                            </AppText>
                            <TouchableOpacity onPress={handleResendCode}>
                                <AppText className="text-gray-600 text-base not-italic font-normal">
                                    Resend Code
                                </AppText>
                            </TouchableOpacity>
                        </View>

                        {/* Verify Button */}
                        <View className="mt-8">
                            <Button
                                title="Verify OTP"
                                onPress={handleVerifyOTP}
                                variant="primary"
                                style={{
                                    backgroundColor: isDark ? '#BDC3C7' : '#578096',
                                    width: '100%',
                                    borderRadius: 30,
                                    height: 50}}
                                textStyle={{
                                    color: isDark ? '#333337' : '#FFFFFF',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    letterSpacing: 2}}
                            />
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
};

export default VerifyOTP;