import AppText from '../common/AppText';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import GlobalIcon from '../common/GlobalIcon';

type OldConsultationCardProps = {
    title: string;
    price: number;
    status: 'free' | 'paid';
    startTime: string;
    isHighlighted?: boolean;
    onPress: () => void;
};

export const OldConsultationCard: React.FC<OldConsultationCardProps> = ({
    title,
    price,
    status,
    startTime,
    isHighlighted = false,
    onPress}) => {
    const { isDark } = useTheme();

    return (
        <View
            className={`rounded-2xl p-4 mb-4 border ${
                isHighlighted
                    ? 'border-gray-400 bg-gray-50 dark:bg-gray-700'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            }`}
        >
            <AppText className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {title}
            </AppText>
            <View className="flex-row items-center mb-1">
                <GlobalIcon
                    name={status === 'free' ? 'tag' : 'dollar-sign'}
                    library="Feather"
                    size={16}
                    color={status === 'free' ? '#10B981' : '#6B7280'}
                />
                <AppText
                    className={`ml-2 text-sm font-semibold ${
                        status === 'free' ? 'text-green-500' : 'text-gray-600 dark:text-gray-400'
                    }`}
                >
                    {status === 'free' ? 'Free' : `${price}`}
                </AppText>
            </View>
            <View className="flex-row items-center mb-4 ml-4">
                <AppText className="ml-2 text-xs text-[#FA8789]">
                    Start in {startTime}
                </AppText>
            </View>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                className="rounded-full py-3"
                style={{ backgroundColor: isDark ? '#94A3B8' : '#7FA5B8' }}
            >
                <AppText className="text-center text-white font-semibold text-sm">
                    VIEW INTAKE ASSESSMENT
                </AppText>
            </TouchableOpacity>
        </View>
    );
};
