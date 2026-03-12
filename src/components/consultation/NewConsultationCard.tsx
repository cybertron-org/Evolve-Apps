import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalIcon from '../common/GlobalIcon';

type NewConsultationCardProps = {
    title: string;
    time: string;
    status: 'upcoming' | 'live' | 'scheduled';
    statusText: string;
    onViewDetail: () => void;
    onJoinNow?: () => void;
};

export const NewConsultationCard: React.FC<NewConsultationCardProps> = ({
    title,
    time,
    status,
    statusText,
    onViewDetail,
    onJoinNow,
}) => {
    return (
        <View
            className={`rounded-2xl p-6 mb-4 ${
                status === 'live'
                    ? 'border-2 border-[#578096] bg-white dark:bg-gray-800'
                    : 'bg-[#E8F5E9] dark:bg-gray-800'
            }`}
        >
            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {title}
            </Text>
            <View className="flex-row items-center mb-4">
                <GlobalIcon
                    name="clock"
                    library="Feather"
                    size={20}
                    color={status === 'live' ? '#EF4444' : '#6B7280'}
                />
                <Text
                    className={`text-base ml-2 ${
                        status === 'live' ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'
                    }`}
                >
                    {time}
                </Text>
            </View>
            <Text
                className={`text-sm mb-4 ${
                    status === 'live' ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'
                }`}
            >
                {statusText}
            </Text>
            {status === 'live' && onJoinNow ? (
                <TouchableOpacity
                    onPress={onJoinNow}
                    className="rounded-full py-4"
                    style={{ backgroundColor: '#F87171' }}
                >
                    <Text className="text-white text-center text-lg font-bold">JOIN NOW</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={onViewDetail}
                    className="rounded-full py-4"
                    style={{ backgroundColor: '#578096' }}
                >
                    <Text className="text-white text-center text-lg font-bold">VIEW DETAIL</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
