import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import GlobalIcon from './GlobalIcon';

interface HeaderProps {
    userName?: string;
    userImage?: string;
    onMenuPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName = 'Angelina', userImage, onMenuPress }) => {
    const { isDark } = useTheme();

    return (
        <View className="flex-row items-center justify-between px-6 py-4">
            <View className="flex-row items-center gap-3">
                <View className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    {userImage ? (
                        <Image source={{ uri: userImage || require('../../assets/images/image.png')}} className="w-full h-full" />
                    ) : (
                        <View className="w-full h-full items-center justify-center">
                            <GlobalIcon name="user" library="Feather" size={24} color={isDark ? '#94A3B8' : '#9CA3AF'} />
                        </View>
                    )}
                </View>
                <View>
                    <Text className="text-sm text-gray-600 dark:text-gray-400">Hi,</Text>
                    <Text className="text-base font-semibold text-gray-900 dark:text-white">{userName}</Text>
                </View>
            </View>

            <TouchableOpacity onPress={onMenuPress} className="p-2">
                <GlobalIcon name="menu" library="Feather" size={24} color={isDark ? '#F1F5F9' : '#1E293B'} />
            </TouchableOpacity>
        </View>
    );
};

export default Header;
