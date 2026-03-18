import React from 'react';
import { View } from 'react-native';
import AppText from '../common/AppText';
import AvatarPicker from '../specific/AvatarPicker';

interface ProfileAvatarSectionProps {
    initialUri?: string;
    onImageSelected: (file: { uri: string; name: string; type: string } | null) => void;
}

export const ProfileAvatarSection: React.FC<ProfileAvatarSectionProps> = ({
    initialUri,
    onImageSelected,
}) => {
    return (
        <View className="items-center mb-6">
            <AvatarPicker
                size={96}
                initialUri={initialUri}
                onImageSelected={onImageSelected}
            />
            <AppText className="text-sublabel dark:text-sublabel-dark text-xl font-bold uppercase mt-4 tracking-widest">
                CHOOSE IMAGE
            </AppText>
            <AppText className="text-sublabel dark:text-sublabel-dark text-sm font-normal mt-1 opacity-70">
                Hi, Welcome to evolve vocational
            </AppText>
        </View>
    );
};
