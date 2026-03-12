import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import GlobalIcon from '../../components/common/GlobalIcon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

function DoubleClickToPay() {
    const navigation = useNavigation<NavProp>();
    const [clickCount, setClickCount] = useState(0);

    const handleSideButtonPress = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        if (newCount >= 2) {
            // Navigate to payment in process
            navigation.navigate('PaymentInProcess');
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#111827' }}>
            {/* Background image - dark blurred */}
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800' }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.3 }}
                resizeMode="cover"
            />

            {/* Header */}
            <View className="flex-row items-center justify-between px-6 pt-14 pb-4">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <GlobalIcon name="arrow-left" library="Feather" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <View className="flex-row items-center">
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' }}
                        className="w-8 h-8 rounded-full mr-2"
                    />
                    <Text className="text-white font-semibold">Hi,{'\n'}Angelina</Text>
                </View>
                <GlobalIcon name="menu" library="Feather" size={24} color="#FFFFFF" />
            </View>

            {/* Content */}
            <View className="flex-1 items-center justify-center px-6">
                <Text className="text-white text-3xl font-bold mb-2 text-center">EXECUTIVE COACHING</Text>
                <Text className="text-gray-400 text-lg mb-8 text-center">SESSION</Text>

                <Text className="text-white text-2xl font-bold mb-1 text-center">PURCHASE SUMMARY</Text>

                <View className="mt-6 mb-8" style={{ alignItems: 'center' }}>
                    {/* Double Click Text with animation indicator */}
                    <View className="bg-white bg-opacity-20 rounded-2xl px-8 py-4"
                        style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                        <Text className="text-white text-xl font-bold text-center">Double Click</Text>
                        <Text className="text-white text-xl font-bold text-center">To Pay</Text>
                    </View>
                </View>
            </View>

            {/* Apple Pay Style Card */}
            <View className="mx-6 mb-8 rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#1F2937' }}>
                {/* App Info */}
                <View className="p-5 border-b border-gray-700">
                    <Text className="text-gray-400 text-sm mb-3">APP STORE</Text>
                    <View className="flex-row items-center mb-4">
                        <View className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                            style={{ backgroundColor: '#1E3A5F' }}>
                            <Text className="text-white font-bold text-xl">E</Text>
                        </View>
                        <View>
                            <Text className="text-white font-bold text-base">Evolve Vocational</Text>
                            <Text className="text-gray-400 text-sm">Cultured code GmbH & Co. KG</Text>
                            <Text className="text-gray-400 text-sm">App Purchase</Text>
                        </View>
                    </View>

                    <Text className="text-white text-2xl font-bold mb-1">$300</Text>
                    <Text className="text-gray-400 text-sm mb-3">One-time charge</Text>
                    <Text className="text-gray-400 text-sm">Account: example@icloud.com</Text>
                </View>

                {/* Confirm Button */}
                <TouchableOpacity
                    onPress={handleSideButtonPress}
                    className="flex-row items-center justify-center p-4"
                    activeOpacity={0.7}
                >
                    <View className="w-8 h-8 rounded-full border-2 border-gray-400 items-center justify-center mr-3">
                        <View className="w-4 h-4 rounded-full" style={{ backgroundColor: '#578096' }} />
                    </View>
                    <Text className="text-white font-semibold text-base">Confirm with side button</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default DoubleClickToPay;
