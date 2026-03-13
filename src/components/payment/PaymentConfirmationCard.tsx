import AppText from '../common/AppText';
import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import GlobalIcon from '../common/GlobalIcon';

interface PaymentConfirmationCardProps {
    amount: string;
    onApplePayPress: () => void;
    onGooglePayPress: () => void;
}

const PaymentConfirmationCard: React.FC<PaymentConfirmationCardProps> = ({ 
    amount, 
    onApplePayPress, 
    onGooglePayPress 
}) => {
    return (
        <View className="mx-6 mb-8 rounded-2xl overflow-hidden"
            style={{ backgroundColor: '#28282A' }}>
            {/* App Info */}
            <View className="p-5 border-b border-gray-700">
                <AppText className="text-gray-400 text-sm mb-3">
                    {Platform.OS === 'ios' ? 'APP STORE' : 'GOOGLE PLAY'}
                </AppText>
                <View className="flex-row items-center mb-4">
                    <View className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                        style={{ backgroundColor: '#1E3A5F' }}>
                        <AppText className="text-white font-bold text-xl">E</AppText>
                    </View>
                    <View>
                        <AppText className="text-white font-bold text-base">Evolve Vocational</AppText>
                        <AppText className="text-gray-400 text-sm">Cultured code GmbH & Co. KG</AppText>
                        <AppText className="text-gray-400 text-sm">App Purchase</AppText>
                    </View>
                </View>

                <AppText className="text-white text-2xl font-bold mb-1">{amount}</AppText>
                <AppText className="text-gray-400 text-sm mb-3">One-time charge</AppText>
                <AppText className="text-gray-400 text-sm">Account: example@gmail.com</AppText>
            </View>

            {/* Confirm Button */}
            {Platform.OS === 'ios' ? (
                <TouchableOpacity
                    onPress={onApplePayPress}
                    className="flex-row items-center justify-center p-4"
                    activeOpacity={0.7}
                >
                    <View className="w-8 h-8 rounded-full border-2 border-gray-400 items-center justify-center mr-3">
                        <View className="w-4 h-4 rounded-full" style={{ backgroundColor: '#578096' }} />
                    </View>
                    <AppText className="text-white font-semibold text-base">Confirm with side button</AppText>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={onGooglePayPress}
                    className="flex-row items-center justify-center p-4 bg-gray-800"
                    activeOpacity={0.7}
                >
                    <GlobalIcon name="google" library="AntDesign" size={24} color="#FFFFFF" />
                    <AppText className="text-white font-semibold text-base ml-2">Pay</AppText>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default PaymentConfirmationCard;
