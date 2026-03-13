import AppText from './AppText';
import React from 'react';
import { View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface ServiceCardProps {
    title: string;
    image: ImageSourcePropType | string;
    onPress?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, image, onPress }) => {
    const { isDark } = useTheme();

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm"
            style={{ width: '48%' }}
        >
            <Image
                source={typeof image === 'string' ? { uri: image } : image}
                className="w-full h-32"
                resizeMode="cover"
            />
            <View className="p-3">
                <AppText className="text-sm font-semibold text-gray-900 dark:text-white" numberOfLines={2}>
                    {title}
                </AppText>
            </View>
        </TouchableOpacity>
    );
};

export default ServiceCard;
