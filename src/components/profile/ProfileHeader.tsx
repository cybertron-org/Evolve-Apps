import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import GlobalIcon from '../common/GlobalIcon';

type ProfileHeaderProps = {
    name: string;
    avatar: string;
    onMenuPress: () => void;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, avatar, onMenuPress }) => {
    const { isDark } = useTheme();

    return (
        <View className="flex-row items-center justify-between px-6 py-4">
            <View className="flex-row items-center gap-3">
                <Image source={{ uri: avatar }} className="w-12 h-12 rounded-full" />
                <View>
                    <Text className="text-sm text-gray-600 dark:text-gray-400">Hi,</Text>
                    <Text className="text-base font-semibold text-gray-900 dark:text-white">
                        {name}
                    </Text>
                </View>
            </View>
            <TouchableOpacity onPress={onMenuPress} className="p-2">
                <GlobalIcon name="menu" library="Feather" size={24} color={isDark ? '#F1F5F9' : '#1E293B'} />
            </TouchableOpacity>
        </View>
    );
};
