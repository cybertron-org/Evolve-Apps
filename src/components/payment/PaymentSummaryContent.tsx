import AppText from '../common/AppText';
import React from 'react';
import { View, Platform } from 'react-native';

const PaymentSummaryContent = () => {
    return (
        <View className="flex-1 items-center justify-center px-6">
            <AppText className="text-white text-3xl font-bold mb-2 text-center">EXECUTIVE COACHING</AppText>
            <AppText className="text-gray-400 text-lg mb-8 text-center">SESSION</AppText>

            <AppText className="text-white text-2xl font-bold mb-1 text-center">PURCHASE SUMMARY</AppText>

            <View className="mt-6 mb-8" style={{ alignItems: 'center' }}>
                {Platform.OS === 'ios' ? (
                    /* iOS Double Click Text */
                    <View className="bg-white bg-opacity-20 rounded-2xl px-8 py-4"
                        style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                        <AppText className="text-white text-xl font-bold text-center">Double Click</AppText>
                        <AppText className="text-white text-xl font-bold text-center">To Pay</AppText>
                    </View>
                ) : (
                    /* Android Tap to Pay Text */
                    <View className="bg-white bg-opacity-20 rounded-2xl px-8 py-4"
                        style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                        <AppText className="text-white text-xl font-bold text-center">Tap icon below</AppText>
                        <AppText className="text-white text-xl font-bold text-center">To Pay using Google Pay</AppText>
                    </View>
                )}
            </View>
        </View>
    );
};

export default PaymentSummaryContent;
