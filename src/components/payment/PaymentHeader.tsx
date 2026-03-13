import AppText from '../common/AppText';
import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import GlobalIcon from '../common/GlobalIcon';

interface PaymentHeaderProps {
    onBackPress: () => void;
    userName?: string;
    userImageUri?: string;
}

const PaymentHeader: React.FC<PaymentHeaderProps> = ({ 
    onBackPress, 
    userName = 'Angelina',
    userImageUri = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
}) => {
    return (
        <View className="flex-row items-center justify-between px-6 pt-14 pb-4">
            <TouchableOpacity onPress={onBackPress}>
                <GlobalIcon name="arrow-left" library="Feather" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View className="flex-row items-center">
                <Image
                    source={{ uri: userImageUri }}
                    className="w-8 h-8 rounded-full mr-2"
                />
                <AppText className="text-white font-semibold">Hi,{'\n'}{userName}</AppText>
            </View>
            <GlobalIcon name="menu" library="Feather" size={24} color="#FFFFFF" />
        </View>
    );
};

export default PaymentHeader;
