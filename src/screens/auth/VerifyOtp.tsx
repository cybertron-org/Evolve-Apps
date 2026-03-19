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

import { useVerifyOtp } from '../../hooks/mutations/useVerifyOtp';
import { useResendOtp } from '../../hooks/mutations/useResendOtp';
import { useAuthStore } from '../../store/authStore';


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
    const { mutate: verifyOtp, isPending } = useVerifyOtp();
    const { mutate: resendOtp, isPending: isResending } = useResendOtp();

    const setToken = useAuthStore((state) => state.setToken);
    const setUser = useAuthStore((state) => state.setUser);
    const [verifiedData, setVerifiedData] = useState<any>(null);

    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);




useEffect(() => {
  showToast({
    type: 'success',
    title: 'OTP Sent!',
    message: `Check your inbox: ${email}`});

  // Start timer on mount
  setTimer(60);
  setCanResend(false);
}, []); 

useEffect(() => {
    let interval: any;

    if (timer > 0) {
        interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
    } else {
        setCanResend(true);
    }
    return () => clearInterval(interval);
}, [timer]);


    const [otp, setOtp] = useState(['', '', '', '']);
    const [showAccountCreated, setShowAccountCreated] = useState(false);
    const inputRefs = useRef<Array<any | null>>([]);


    useEffect(() => {
        if (showAccountCreated && verifiedData) {
            const timer = setTimeout(() => {
                console.log('--- VerifyOTP: Raw API Response ---');
                console.log(JSON.stringify(verifiedData, null, 2));
                console.log('----------------------------------');

                const token = verifiedData.data?.token || verifiedData.token;
                let user = verifiedData.data?.user || verifiedData.user;
                
                // Prioritize ID from user object, then fallback to other fields
                const id = user?.id || verifiedData.data?.id || verifiedData.id || 
                           user?.user_id || verifiedData.data?.user_id || verifiedData.user_id || 
                           user?.userID || verifiedData.data?.userID || verifiedData.userID;

                console.log('--- VerifyOTP: Setting Auth Data ---');
                console.log('Token:', !!token);
                console.log('Found ID:', id);

                if (!user && (id || email)) {
                    console.log('Creating user object from ID/email');
                    user = { id: id?.toString() || '', email: email || '' } as any;
                } else if (user) {
                    // Ensure ID is a string and always present
                    user.id = (user.id || id)?.toString() || '';
                    if (!user.email && email) user.email = email;
                }

                console.log('User Data after merge:', JSON.stringify(user, null, 2));

                if (token) setToken(token);
                if (user) setUser(user);
                // RootNavigator will automatically switch stacks and show AddProfile
                // since profile_completed is 0 for new registrations.
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showAccountCreated, verifiedData, setToken, setUser, email]);

    const handleOtpChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Auto focus next input
        if (text && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto submit if all 4 digits are filled
        if (newOtp.every(digit => digit !== '') && index === 3) {
            handleVerifyOTPInternal(newOtp.join(''));
        }
    };


    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOTP = () => {
        handleVerifyOTPInternal(otp.join(''));
    };

    const handleVerifyOTPInternal = (otpString: string) => {
        if (otpString.length === 4) {
             verifyOtp(
                { email, otp: otpString },
                {
                    onSuccess: (data) => {
                         showToast({
                            type: 'success',
                            title: 'Verification Successful',
                            message: 'Your account has been verified!'
                         });
                         setVerifiedData(data);
                         setShowAccountCreated(true);
                    },
                    onError: (error: any) => {
                        showToast({
                            type: 'error',
                            title: 'Verification Failed',
                            message: error.response?.data?.message || 'Invalid OTP'
                        });
                    }
                }
            );
        } else {
            showToast({
                type: 'error',
                title: 'Invalid OTP',
                message: 'Please enter complete code'
            });
        }
    };


    const handleResendCode = () => {
        if (!canResend) return;
        
        resendOtp(
            { email },
            {
                onSuccess: () => {
                    showToast({
                        type: 'success',
                        title: 'OTP Resent',
                        message: `A new code has been sent to ${email}`
                    });
                    setTimer(60);
                    setCanResend(false);
                },
                onError: (error: any) => {
                    showToast({
                        type: 'error',
                        title: 'Resend Failed',
                        message: error.response?.data?.message || 'Something went wrong'
                    });
                }
            }
        );
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
                                Code has been sent to {email}
                            </AppText>

                            <AppText className="text-sublabel dark:text-sublabel-dark text-sm font-bold mt-2 opacity-80">
                                This code will expire in 10 minutes.
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
                                                textContentType="oneTimeCode"
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
                            <TouchableOpacity 
                                onPress={handleResendCode}
                                disabled={!canResend || isResending}
                                className={(!canResend || isResending) ? 'opacity-40' : 'opacity-100'}
                            >
                                <AppText className={`text-base not-italic font-bold ${canResend ? 'text-[#578096] dark:text-[#BDC3C7]' : 'text-gray-400'}`}>
                                    {isResending ? 'Sending...' : canResend ? 'Resend Code' : `Resend in ${timer}s`}
                                </AppText>
                            </TouchableOpacity>
                        </View>

                        {/* Verify Button */}
                        <View className="mt-8">
                            <Button
                                title={isPending ? "Verifying..." : "Verify OTP"}
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