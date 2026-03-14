import React from 'react';
import { View, Image } from 'react-native';
import AppText from '../../../components/common/AppText';
import GlobalIcon from '../../../components/common/GlobalIcon';

interface SessionInfoRowProps {
    label: string;
    title: string;
    subtitle: string;
    image?: string;
    icon?: string;
    iconLibrary?: any;
}

const SessionInfoRow: React.FC<SessionInfoRowProps> = ({ 
    label, 
    title, 
    subtitle, 
    image, 
    icon, 
    iconLibrary = 'Feather' 
}) => {
    return (
        <View className="px-6 mb-6">
            <AppText className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {label}
            </AppText>
            <View className="flex-row items-center">
                {image ? (
                    <Image
                        source={{ uri: image }}
                        className="w-14 h-14 rounded-full"
                    />
                ) : (
                    <View 
                        className="w-12 h-12 rounded-full items-center justify-center"
                        style={{ backgroundColor: '#7FA5B8' }}
                    >
                        <GlobalIcon name={icon || 'help-circle'} library={iconLibrary} size={24} color="#FFFFFF" />
                    </View>
                )}
                <View className="ml-4">
                    <AppText className="text-base font-bold text-gray-900 dark:text-white">
                        {title}
                    </AppText>
                    <AppText className="text-sm text-gray-500 dark:text-gray-400">
                        {subtitle}
                    </AppText>
                </View>
            </View>
        </View>
    );
};

export default SessionInfoRow;
