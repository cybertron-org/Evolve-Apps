import React from 'react';
import { View } from 'react-native';
import { ProfileAvatarSection } from './ProfileAvatarSection';
import { ProfileFormFields } from './ProfileFormFields';
import { Button } from '../common/Button';
import { Country } from '../specific/CountryDropdown';
import { StateItem } from '../specific/StateDropdown';

interface ProfileEditSectionProps {
    displayUser: any;
    form: any;
    errors: any;
    isUpdating: boolean;
    isDark: boolean;
    handleChange: (key: string, value: any) => void;
    handleCountrySelect: (country: Country) => void;
    handleCancel: () => void;
    handleSaveProfile: () => void;
}

export const ProfileEditSection: React.FC<ProfileEditSectionProps> = ({
    displayUser,
    form,
    errors,
    isUpdating,
    isDark,
    handleChange,
    handleCountrySelect,
    handleCancel,
    handleSaveProfile,
}) => {
    return (
        <View className="px-6 mb-6">
            <ProfileAvatarSection
                initialUri={displayUser?.profile_image}
                onImageSelected={(file) => handleChange('avatarFile', file)}
            />
            <ProfileFormFields
                form={form}
                errors={errors}
                userEmail={displayUser?.email || ''}
                isDark={isDark}
                handleChange={handleChange}
                handleCountrySelect={handleCountrySelect}
            />

            <View className="flex-row gap-4 mt-6">
                <Button
                    title="CANCEL"
                    onPress={handleCancel}
                    className="flex-1 rounded-full h-12 bg-gray-200 dark:bg-gray-700"
                    textClassName="text-gray-700 dark:text-gray-300 font-bold"
                />
                <Button
                    title={isUpdating ? "SAVING..." : "SAVE"}
                    onPress={handleSaveProfile}
                    disabled={isUpdating}
                    className="flex-1 rounded-full h-12 bg-[#578096]"
                    textClassName="text-white font-bold"
                />
            </View>
        </View>
    );
};
