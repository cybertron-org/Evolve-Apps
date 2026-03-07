import React, { useState } from "react";
import {
    Dimensions, Text, View,
    ScrollView, KeyboardAvoidingView, Platform
} from "react-native";
import { ScreenWrapper } from "../../components/specific/ScreenWrapper";
import Input from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { useTheme } from "../../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import GlobalIcon from "../../components/common/GlobalIcon";
import AvatarPicker from "../../components/specific/AvatarPicker";

type NavProp = NativeStackNavigationProp<RootStackParamList>;
const { height } = Dimensions.get('window');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s\-()]{7,15}$/;

function Profile() {
    const { isDark } = useTheme();
    const navigation = useNavigation<NavProp>();

    const [fullName, setFullName]       = useState('');
    const [email, setEmail]             = useState('');
    const [phone, setPhone]             = useState('');
    const [country, setCountry]         = useState('');
    const [state, setState]             = useState('');
    const [postalCode, setPostalCode]   = useState('');

    const [fullNameError, setFullNameError]   = useState('');
    const [emailError, setEmailError]         = useState('');
    const [phoneError, setPhoneError]         = useState('');
    const [ avatarBase64, setAvatarBase64]    = useState('')

    const handleSubmit = () => {
        let isValid = true;

        if (!fullName.trim()) {
            setFullNameError('Full name is required');
            isValid = false;
        } else {
            setFullNameError('');
        }

        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!EMAIL_REGEX.test(email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!phone) {
            setPhoneError('Phone number is required');
            isValid = false;
        } else if (!PHONE_REGEX.test(phone)) {
            setPhoneError('Please enter a valid phone number');
            isValid = false;
        } else {
            setPhoneError('');
        }

        if (!isValid) return;

        console.log({ fullName, email, phone, country, state, postalCode });
        navigation.navigate('Main');
    };

    return (
        <ScreenWrapper>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="flex-1 px-6 pb-10">

                      

                        {/* Avatar */}
                        <View className="items-center mb-6">
                            <AvatarPicker
                                size={96}
                                onImageSelected={(base64, uri) => {
                                    setAvatarBase64(base64); 
                                }}
                            />

                            <Text className="text-sublabel dark:text-sublabel-dark text-xl font-bold uppercase mt-4 tracking-widest">
                                CHOOSE IMAGE
                            </Text>
                            <Text className="text-sublabel dark:text-sublabel-dark text-sm font-normal mt-1 opacity-70">
                                Hi, Welcome to evolve vocational
                            </Text>
                        </View>

                        {/* Form */}
                        <View className="w-full gap-1">

                            {/* Full Name */}
                            <Input
                                label="Full Name"
                                value={fullName}
                                onChangeText={(text) => { setFullName(text); if (fullNameError) setFullNameError(''); }}
                                placeholder="Enter name"
                                error={fullNameError}
                                leftIcon={<GlobalIcon name="user" library="Feather" size={18} color={isDark ? '#94A3B8' : '#9CA3AF'} />}
                            />

                            {/* Email */}
                            <Input
                                label="Enter Your Email"
                                value={email}
                                onChangeText={(text) => { setEmail(text); if (emailError) setEmailError(''); }}
                                keyboardType="email-address"
                                placeholder="Enter your email"
                                error={emailError}
                                leftIcon={<GlobalIcon name="mail" library="Feather" size={18} color={isDark ? '#94A3B8' : '#9CA3AF'} />}
                            />

                            {/* Phone */}
                            <Input
                                label="Enter Your Phone Number"
                                value={phone}
                                onChangeText={(text) => { setPhone(text); if (phoneError) setPhoneError(''); }}
                                keyboardType="phone-pad"
                                placeholder="Enter your phone number"
                                error={phoneError}
                                leftIcon={<GlobalIcon name="phone" library="Feather" size={18} color={isDark ? '#94A3B8' : '#9CA3AF'} />}
                            />

                            {/* Country */}
                            <Input
                                label="Select Country"
                                value={country}
                                onChangeText={setCountry}
                                placeholder="Country"
                                leftIcon={<GlobalIcon name="map-pin" library="Feather" size={18} color={isDark ? '#94A3B8' : '#9CA3AF'} />}
                            />

                            {/* State */}
                            <Input
                                label="Select State"
                                value={state}
                                onChangeText={setState}
                                placeholder="State/Region"
                                leftIcon={<GlobalIcon name="map-pin" library="Feather" size={18} color={isDark ? '#94A3B8' : '#9CA3AF'} />}
                            />

                            {/* Postal Code */}
                            <Input
                                label="Select Code"
                                value={postalCode}
                                onChangeText={setPostalCode}
                                keyboardType="number-pad"
                                placeholder="Postal code"
                                leftIcon={<GlobalIcon name="lock" library="Feather" size={18} color={isDark ? '#94A3B8' : '#9CA3AF'} />}
                            />
                        </View>

                        <Button
                            title="SAVE"
                            className={`rounded-full mt-6 h-14 ${isDark ? 'bg-[#BDC3C7]' : 'bg-[#578096]'}`}
                            textClassName={`font-bold tracking-widest text-base ${isDark ? 'text-[#333337]' : 'text-white'}`}
                            onPress={handleSubmit}
                        />

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    );
}

export default Profile;