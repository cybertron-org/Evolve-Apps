import AppText from '../../components/common/AppText';
import React, { useState } from "react";
import {
  View,
  Platform
} from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScreenWrapper } from "../../components/specific/ScreenWrapper";
import { Button } from "../../components/common/Button";
import { useTheme } from "../../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import { ProfileAvatarSection } from "../../components/profile/ProfileAvatarSection";
import { ProfileFormFields } from "../../components/profile/ProfileFormFields";
import { useAuthStore } from "../../store/authStore";
import { useUpdateProfile } from "../../hooks/mutations/useUpdateProfile";
import { useToast } from "../../hooks/useToast";
import { Country } from "../../components/specific/CountryDropdown";
import { StateItem } from "../../components/specific/StateDropdown";

import { useProfile } from "../../hooks/queries/useProfile";


type NavProp = NativeStackNavigationProp<RootStackParamList>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s\-()]{7,15}$/;

function Profile() {
  const { isDark } = useTheme();
  const navigation = useNavigation<NavProp>();

  const { user } = useAuthStore();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const { showToast } = useToast();
  
  // Fetch latest profile data from API for prepopulation
  const { profile: profileData } = useProfile(user?.id);

  console.log('--- AddProfile Debug: Email ---');
  console.log('Store User Email:', user?.email);
  console.log('API Profile Email:', profileData?.email);
  console.log('-------------------------------');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    postalCode: '',
    avatarFile: null as { uri: string; name: string; type: string } | null,
    bio: '',
    selectedCountry: null as Country | null,
    selectedState: null as StateItem | null,
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
  });

  const handleChange = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleCountrySelect = (country: Country) => {
    setForm(prev => ({
      ...prev,
      selectedCountry: country,
      selectedState: null,
    }));
    if (errors.country) {
      setErrors(prev => ({ ...prev, country: '' }));
    }
  };

  // Sync with API data or user data from store
  React.useEffect(() => {
    if (profileData) {
      setForm(prev => ({
        ...prev,
        firstName: profileData.first_name || '',
        lastName: profileData.last_name || '',
        phone: profileData.phone_no || '',
        postalCode: profileData.postal_code || '',
        bio: profileData.bio || '',
        selectedCountry: profileData.country ? { name: profileData.country } as any : prev.selectedCountry,
        selectedState: profileData.state ? { name: profileData.state } as any : prev.selectedState,
      }));
    } else if (user) {
      const parts = (user.name || '').split(' ');
      setForm(prev => ({
        ...prev,
        firstName: prev.firstName || parts[0] || '',
        lastName: prev.lastName || parts.slice(1).join(' ') || '',
        bio: prev.bio || user.bio || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [profileData, user]);

  const handleSubmit = () => {
    const newErrors = {
      firstName: !form.firstName.trim() ? 'First name is required' : '',
      lastName: !form.lastName.trim() ? 'Last name is required' : '',
      phone: !form.phone ? 'Phone number is required' : !PHONE_REGEX.test(form.phone) ? 'Please enter a valid phone number' : '',
      country: !form.selectedCountry ? 'Please select a country' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      showToast({
        type: 'error',
        title: 'Form Error',
        message: 'Please fill all required fields correctly'
      });
      return;
    }

     const formData = new FormData();
    formData.append('id', user?.id || '');
    formData.append('first_name', form.firstName);
    formData.append('last_name', form.lastName);
    formData.append('phone_no', form.phone);
    if (form.selectedCountry?.name) formData.append('country', form.selectedCountry.name);
    if (form.selectedCountry?.code) formData.append('countryCode', form.selectedCountry.code);
    if (form.selectedState?.name) formData.append('state', form.selectedState.name);
    if (form.selectedState?.code) formData.append('stateCode', form.selectedState.code);
    formData.append('postal_code', form.postalCode);
    formData.append('bio', form.bio);

    if (form.avatarFile) {
      console.log('Appending image to FormData:', form.avatarFile.name);
      
      // Handle platform specific URI normalization for robust file upload
      const imageUri = Platform.OS === 'ios' 
        ? form.avatarFile.uri.replace('file://', '') 
        : form.avatarFile.uri;

      formData.append('profile_image', {
        uri: imageUri,
        name: form.avatarFile.name,
        type: form.avatarFile.type,
      } as any);
    }

    console.log('Submitting profile update...', {
        firstName: form.firstName,
        lastName: form.lastName,
        phone_no: form.phone,
        hasImage: !!form.avatarFile
    });

    updateProfile(formData, {
      onSuccess: () => {
        showToast({
          type: 'success',
          title: 'Success',
          message: 'Profile updated successfully'
        });
        
        // If we can go back, go back to Profile screen. 
        // If not (e.g. mandatory registration flow), go to Main app.
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate('Main');
        }
      },
      onError: (error: any) => {
        console.error('Update Profile Error:', error.response?.data || error.message);
        showToast({
          type: 'error',
          title: 'Error',
          message: error.response?.data?.message || 'Something went wrong'
        });
      }
    });
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

          <ProfileAvatarSection 
            initialUri={user?.profile_image}
            onImageSelected={(file) => handleChange('avatarFile', file)}
          />

          <ProfileFormFields 
            form={form}
            errors={errors}
            userEmail={user?.email || ''}
            isDark={isDark}
            handleChange={handleChange}
            handleCountrySelect={handleCountrySelect}
          />

          {/* ── Submit ──────────────────────────────────────────────── */}
          <Button
            title={isPending ? "SAVING..." : "SAVE"}
            disabled={isPending}
            className={`rounded-full mt-6 h-14 ${isDark ? 'bg-[#BDC3C7]' : 'bg-[#578096]'
              }`}
            textClassName={`font-bold tracking-widest text-base ${isDark ? 'text-[#333337]' : 'text-white'
              }`}
            onPress={handleSubmit}
          />
        </View>
      </KeyboardAwareScrollView>
    </ScreenWrapper>
  );
}


export default Profile;