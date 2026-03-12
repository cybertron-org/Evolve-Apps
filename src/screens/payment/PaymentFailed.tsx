import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

function PaymentFailed() {
    const navigation = useNavigation<NavProp>();

    const handleTryAgain = () => {
        navigation.navigate('DoubleClickToPay');
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{ height: 50 }} />

            <View className="flex-1 items-center justify-center px-8">
                {/* Failed credit card illustration */}
                <View className="mb-8 items-center">
                    {/* Top sparkles */}
                    <View className="flex-row mb-2">
                        <Text style={{ fontSize: 18, color: '#60A5FA' }}>✦</Text>
                        <View style={{ width: 30 }} />
                        <Text style={{ fontSize: 14, color: '#A78BFA' }}>✦</Text>
                    </View>

                    {/* Card stack illustration */}
                    <View style={{ width: 140, height: 100 }}>
                        {/* Back card */}
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 10,
                                width: 110,
                                height: 75,
                                borderRadius: 10,
                                backgroundColor: '#1A5276',
                                transform: [{ rotate: '-8deg' }],
                            }}
                        >
                            <View style={{ position: 'absolute', top: 12, left: 10 }}>
                                <View style={{ width: 30, height: 20, borderRadius: 4, backgroundColor: '#F5C518' }} />
                            </View>
                        </View>
                        {/* Front card */}
                        <View
                            style={{
                                position: 'absolute',
                                top: 20,
                                left: 20,
                                width: 110,
                                height: 75,
                                borderRadius: 10,
                                backgroundColor: '#E74C3C',
                                transform: [{ rotate: '5deg' }],
                            }}
                        >
                            <View style={{ position: 'absolute', top: 12, left: 10 }}>
                                <View style={{ width: 30, height: 20, borderRadius: 4, backgroundColor: '#F5C518' }} />
                            </View>
                            <Text style={{ position: 'absolute', bottom: 10, left: 10, color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                                •••• 4242
                            </Text>
                        </View>
                    </View>

                    {/* Bottom sparkles */}
                    <View className="flex-row mt-2">
                        <Text style={{ fontSize: 14, color: '#F472B6' }}>✦</Text>
                        <View style={{ width: 40 }} />
                        <Text style={{ fontSize: 14, color: '#34D399' }}>✦</Text>
                    </View>
                </View>

                <Text className="text-2xl font-bold text-gray-900 text-center mb-8">
                    YOUR PAYMENT HAS BEEN{'\n'}FAILED
                </Text>

                <TouchableOpacity
                    onPress={handleTryAgain}
                    className="rounded-full py-4 px-10"
                    style={{ backgroundColor: '#F87171', minWidth: 200 }}
                    activeOpacity={0.8}
                >
                    <Text className="text-white text-center text-lg font-bold">TRY AGAIN</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Tab Bar */}
            <View className="flex-row justify-around items-center py-3 border-t border-gray-100 bg-white"
                style={{ paddingBottom: 20 }}>
                {['Home', 'Messages', 'Services', 'History', 'Profile'].map((tab) => (
                    <View key={tab} className="items-center">
                        <Text style={{ fontSize: 10, color: '#9CA3AF' }}>{tab}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

export default PaymentFailed;
