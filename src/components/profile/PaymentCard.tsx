import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GlobalIcon from '../common/GlobalIcon';

type PaymentCardProps = {
    cardType: string;
    lastFourDigits: string;
    expiryDate: string;
    isDefault?: boolean;
    onMakeDefault?: () => void;
    onRemove: () => void;
};

export const PaymentCard: React.FC<PaymentCardProps> = ({
    cardType,
    lastFourDigits,
    expiryDate,
    isDefault = false,
    onMakeDefault,
    onRemove,
}) => {
    return (
        <View className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <View className="flex-row items-center mb-3">
                <View className="w-12 h-8 rounded bg-gray-200 dark:bg-gray-700 mr-3 items-center justify-center">
                    <GlobalIcon name="credit-card" library="Feather" size={20} color="#578096" />
                </View>
                <Text className="flex-1 text-base text-gray-900 dark:text-white">
                    {cardType} ending in {lastFourDigits} expiring {expiryDate}
                </Text>
            </View>
            
            {isDefault ? (
                <Text className="text-sm text-[#578096] mb-2">
                    Default payment method
                </Text>
            ) : (
                <TouchableOpacity onPress={onMakeDefault}>
                    <Text className="text-sm text-[#578096] mb-2">
                        Make Default
                    </Text>
                </TouchableOpacity>
            )}
            
            <TouchableOpacity onPress={onRemove} className="self-end">
                <View className="border border-red-400 rounded-full px-6 py-2">
                    <Text className="text-red-400 text-sm">
                        Remove
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};
