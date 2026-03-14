import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import AppText from '../../../components/common/AppText';

interface SessionCardProps {
    title: string;
    onViewDetail: () => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ title, onViewDetail }) => {
    return (
        <View className="mx-6 mt-4 mb-6">
            <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
                <AppText className="text-lg font-bold text-gray-900 dark:text-white text-center mb-4">
                    {title}
                </AppText>
                <TouchableOpacity
                    onPress={onViewDetail}
                    className="rounded-full py-3 mb-4"
                    style={{ backgroundColor: '#7FA5B8' }}
                    activeOpacity={0.8}
                >
                    <AppText className="text-center text-white font-semibold text-sm">
                        VIEW DETAIL
                    </AppText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SessionCard;
