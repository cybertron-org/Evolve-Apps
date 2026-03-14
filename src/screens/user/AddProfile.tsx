import AppText from '../../components/common/AppText';
import React, { useState } from "react";
import {
  View,
  Platform} from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScreenWrapper } from "../../components/specific/ScreenWrapper";
import Input from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { useTheme } from "../../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import GlobalIcon from "../../components/common/GlobalIcon";
import AvatarPicker from "../../components/specific/AvatarPicker";
import CountryDropdown, { Country } from "../../components/specific/CountryDropdown";
import StateDropdown, { StateItem } from "../../components/specific/StateDropdown";

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s\-()]{7,15}$/;

function Profile() {
  const { isDark } = useTheme();
  const navigation = useNavigation<NavProp>();

  const [fullName, setFullName]         = useState('');
  const [email, setEmail]               = useState('');
  const [phone, setPhone]               = useState('');
  const [postalCode, setPostalCode]     = useState('');
  const [avatarBase64, setAvatarBase64] = useState('');

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState]     = useState<StateItem | null>(null);

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError]       = useState('');
  const [phoneError, setPhoneError]       = useState('');
  const [countryError, setCountryError]   = useState('');

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setSelectedState(null);
    if (countryError) setCountryError('');
  };

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

    if (!selectedCountry) {
      setCountryError('Please select a country');
      isValid = false;
    } else {
      setCountryError('');
    }

    if (!isValid) return;

    console.log({
      fullName,
      email,
      phone,
      country: selectedCountry?.name,
      countryCode: selectedCountry?.code,
      state: selectedState?.name,
      stateCode: selectedState?.code,
      postalCode});

    navigation.navigate('Main');
  };

  return (
    <ScreenWrapper>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        extraScrollHeight={Platform.OS === 'ios' ? 20 : 80}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 px-6 pb-16">

          {/* ── Avatar ──────────────────────────────────────────────── */}
          <View className="items-center mb-6">
            <AvatarPicker
              size={96}
              onImageSelected={(base64) => setAvatarBase64(base64)}
            />
            <AppText className="text-sublabel dark:text-sublabel-dark text-xl font-bold uppercase mt-4 tracking-widest">
              CHOOSE IMAGE
            </AppText>
            <AppText className="text-sublabel dark:text-sublabel-dark text-sm font-normal mt-1 opacity-70">
              Hi, Welcome to evolve vocational
            </AppText>
          </View>

          {/* ── Form fields ─────────────────────────────────────────── */}
          <View className="w-full gap-1">

            {/* Full Name */}
            <Input
              label="Full Name"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                if (fullNameError) setFullNameError('');
              }}
              placeholder="Enter name"
              error={fullNameError}
              leftIcon={
                <GlobalIcon
                  name="user"
                  library="Feather"
                  size={18}
                  color={isDark ? '#94A3B8' : '#9CA3AF'}
                />
              }
            />

            {/* Email */}
            <Input
              label="Enter Your Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError('');
              }}
              keyboardType="email-address"
              placeholder="Enter your email"
              error={emailError}
              leftIcon={
                <GlobalIcon
                  name="mail"
                  library="Feather"
                  size={18}
                  color={isDark ? '#94A3B8' : '#9CA3AF'}
                />
              }
            />

            {/* Phone */}
            <Input
              label="Enter Your Phone Number"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                if (phoneError) setPhoneError('');
              }}
              keyboardType="phone-pad"
              placeholder="Enter your phone number"
              error={phoneError}
              leftIcon={
                <GlobalIcon
                  name="phone"
                  library="Feather"
                  size={18}
                  color={isDark ? '#94A3B8' : '#9CA3AF'}
                />
              }
            />

            {/* Country Dropdown */}
            <View className="w-full">
              <AppText
                className={`text-sm font-medium mb-1 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Select Country
              </AppText>
              <CountryDropdown
                selectedCountry={selectedCountry}
                onSelect={handleCountrySelect}
              />
              {countryError ? (
                <AppText className="text-red-500 text-xs mt-1 ml-1">
                  {countryError}
                </AppText>
              ) : null}
            </View>

            {/* State Dropdown */}
            <View className="w-full">
              <AppText
                className={`text-sm font-medium mb-1 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Select State
              </AppText>
              <StateDropdown
                countryCode={selectedCountry?.code ?? null}
                selectedState={selectedState}
                onSelect={(s) => setSelectedState(s)}
              />
            </View>

            {/* Postal Code ← ab keyboard ke peeche hide nahi hogi */}
            <Input
              label="Postal Code"
              value={postalCode}
              onChangeText={setPostalCode}
              keyboardType="number-pad"
              placeholder="Postal code"
              leftIcon={
                <GlobalIcon
                  name="lock"
                  library="Feather"
                  size={18}
                  color={isDark ? '#94A3B8' : '#9CA3AF'}
                />
              }
            />

          </View>

          {/* ── Submit ──────────────────────────────────────────────── */}
          <Button
            title="SAVE"
            className={`rounded-full mt-6 h-14 ${
              isDark ? 'bg-[#BDC3C7]' : 'bg-[#578096]'
            }`}
            textClassName={`font-bold tracking-widest text-base ${
              isDark ? 'text-[#333337]' : 'text-white'
            }`}
            onPress={handleSubmit}
          />
        </View>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
}


export default Profile;