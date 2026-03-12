import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import GlobalIcon from '../common/GlobalIcon';

type ProfileInfoItemProps = {
    label: string;
    value: string;
    onEditPress: () => void;
    isLast?: boolean;
};

export const ProfileInfoItem: React.FC<ProfileInfoItemProps> = ({ 
    label, 
    value, 
    onEditPress,
    isLast = false 
}) => {
    const { isDark } = useTheme();

    return (
        <View className={`mb-4 pb-4 ${!isLast ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
            <View className="flex-row items-start justify-between">
                <View className="flex-1">
                    <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {label}
                    </Text>
                    <Text className="text-base text-gray-900 dark:text-white">
                        {value}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={onEditPress}
                    className="w-10 h-10 rounded-full items-center justify-center ml-2"
                    style={{ backgroundColor: isDark ? '#374151' : '#E5E7EB' }}
                >
                    <GlobalIcon name="edit-2" library="Feather" size={16} color={isDark ? '#F1F5F9' : '#1E293B'} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
