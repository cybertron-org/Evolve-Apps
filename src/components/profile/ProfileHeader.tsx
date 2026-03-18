import AppText from '../common/AppText';
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
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
                <View className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {avatar ? (
                        <Image 
                            source={{ 
                                uri: avatar.startsWith('http') || avatar.startsWith('data:') 
                                    ? avatar 
                                    : `data:image/jpeg;base64,${avatar}` 
                            }} 
                            className="w-full h-full" 
                        />
                    ) : (
                        <View className="w-full h-full items-center justify-center">
                            <GlobalIcon name="user" library="Feather" size={24} color={isDark ? '#94A3B8' : '#9CA3AF'} />
                        </View>
                    )}
                </View>
                <View>
                    <AppText className="text-sm text-gray-600 dark:text-gray-400">Hi,</AppText>
                    <AppText className="text-base font-semibold text-gray-900 dark:text-white">
                        {name}
                    </AppText>
                </View>
            </View>
            <TouchableOpacity onPress={onMenuPress} className="p-2">
                <GlobalIcon name="menu" library="Feather" size={24} color={isDark ? '#F1F5F9' : '#1E293B'} />
            </TouchableOpacity>
        </View>
    );
};
