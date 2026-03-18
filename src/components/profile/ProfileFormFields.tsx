import React from 'react';
import { View } from 'react-native';
import Input from '../common/Input';
import GlobalIcon from '../common/GlobalIcon';
import AppText from '../common/AppText';
import CountryDropdown, { Country } from '../specific/CountryDropdown';
import StateDropdown, { StateItem } from '../specific/StateDropdown';

interface ProfileFormFieldsProps {
    form: {
        firstName: string;
        lastName: string;
        phone: string;
        postalCode: string;
        bio: string;
        selectedCountry: Country | null;
        selectedState: StateItem | null;
    };
    errors: {
        firstName: string;
        lastName: string;
        phone: string;
        country: string;
    };
    userEmail: string;
    isDark: boolean;
    handleChange: (key: string, value: any) => void;
    handleCountrySelect: (country: Country) => void;
}

export const ProfileFormFields: React.FC<ProfileFormFieldsProps> = ({
    form,
    errors,
    userEmail,
    isDark,
    handleChange,
    handleCountrySelect,
}) => {
    return (
        <View className="w-full gap-1">
            {/* First Name & Last Name */}
            <View className="flex-row gap-2">
                <View className="flex-1">
                    <Input
                        label="First Name"
                        value={form.firstName}
                        onChangeText={(text) => handleChange('firstName', text)}
                        placeholder="First name"
                        error={errors.firstName}
                        leftIcon={
                            <GlobalIcon
                                name="user"
                                library="Feather"
                                size={18}
                                color={isDark ? '#94A3B8' : '#9CA3AF'}
                            />
                        }
                    />
                </View>
                <View className="flex-1">
                    <Input
                        label="Last Name"
                        value={form.lastName}
                        onChangeText={(text) => handleChange('lastName', text)}
                        placeholder="Last name"
                        error={errors.lastName}
                        leftIcon={
                            <GlobalIcon
                                name="user"
                                library="Feather"
                                size={18}
                                color={isDark ? '#94A3B8' : '#9CA3AF'}
                            />
                        }
                    />
                </View>
            </View>

            {/* Email (Read-only) */}
            <Input
                label="Enter Your Email"
                value={userEmail}
                editable={false}
                keyboardType="email-address"
                placeholder="Enter your email"
                leftIcon={
                    <GlobalIcon
                        name="mail"
                        library="Feather"
                        size={18}
                        color={isDark ? '#94A3B8' : '#9CA3AF'}
                    />
                }
            />

            {/* Phone Number */}
            <Input
                label="Enter Your Phone Number"
                value={form.phone}
                onChangeText={(text) => handleChange('phone', text)}
                keyboardType="phone-pad"
                placeholder="Enter your phone number"
                error={errors.phone}
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
                    className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}
                >
                    Select Country
                </AppText>
                <CountryDropdown
                    selectedCountry={form.selectedCountry}
                    onSelect={handleCountrySelect}
                />
                {errors.country ? (
                    <AppText className="text-red-500 text-xs mt-1 ml-1">
                        {errors.country}
                    </AppText>
                ) : null}
            </View>

            {/* State Dropdown */}
            <View className="w-full">
                <AppText
                    className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}
                >
                    Select State
                </AppText>
                <StateDropdown
                    countryCode={form.selectedCountry?.code ?? null}
                    selectedState={form.selectedState}
                    onSelect={(s) => handleChange('selectedState', s)}
                />
            </View>

            {/* Postal Code */}
            <Input
                label="Postal Code"
                value={form.postalCode}
                onChangeText={(text) => handleChange('postalCode', text)}
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

            {/* Bio Field */}
            <Input
                label="Bio"
                value={form.bio}
                onChangeText={(text) => handleChange('bio', text)}
                placeholder="Write a brief bio about yourself..."
                multiline={true}
                numberOfLines={4}
                style={{ minHeight: 120, textAlignVertical: 'top' }}
                leftIcon={
                    <GlobalIcon
                        name="edit-3"
                        library="Feather"
                        size={18}
                        color={isDark ? '#94A3B8' : '#9CA3AF'}
                    />
                }
            />
        </View>
    );
};
