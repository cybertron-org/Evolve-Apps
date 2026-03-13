import AppText from '../common/AppText';
import React from 'react';
import { View} from 'react-native';

type ConsultationSectionProps = {
    title: string;
    children: React.ReactNode;
};

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({
    title,
    children}) => {
    return (
        <>
            <View className="mb-4">
                <AppText className="text-lg text-gray-700 dark:text-gray-300">
                    {title}
                </AppText>
            </View>
            {children}
        </>
    );
};
