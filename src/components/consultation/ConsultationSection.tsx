import React from 'react';
import { View, Text } from 'react-native';

type ConsultationSectionProps = {
    title: string;
    children: React.ReactNode;
};

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({
    title,
    children,
}) => {
    return (
        <>
            <View className="mb-4">
                <Text className="text-lg text-gray-700 dark:text-gray-300">
                    {title}
                </Text>
            </View>
            {children}
        </>
    );
};
