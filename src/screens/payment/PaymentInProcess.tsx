import AppText from '../../components/common/AppText';
import React, { useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

function PaymentInProcess() {
    const navigation = useNavigation<NavProp>();

    useEffect(() => {
        // Auto navigate to success after 4 seconds
        const timer = setTimeout(() => {
            navigation.replace('PaymentSuccess', { type: 'session' });
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            {/* Top tab bar area placeholder */}
            <View style={{ height: 50 }} />

            <View className="flex-1 items-center justify-center px-8">
                {/* Timer/Hourglass illustration */}
                <View className="mb-10">
                    <View
                        className="w-36 h-36 rounded-full items-center justify-center"
                        style={{ borderWidth: 6, borderColor: '#CBD5E1', borderStyle: 'dashed' }}
                    >
                        <View
                            className="w-24 h-24 rounded-full items-center justify-center"
                            style={{ backgroundColor: '#F1F5F9' }}
                        >
                            {/* Hourglass shape */}
                            <AppText style={{ fontSize: 48 }}>⏳</AppText>
                        </View>
                    </View>
                </View>

                <AppText className="text-2xl font-bold text-gray-900 text-center mb-3">
                    YOUR PAYMENT IS{'\n'}IN-PROCESS
                </AppText>

                <TouchableOpacity
                    className="rounded-full py-4 px-10 mt-6"
                    style={{ backgroundColor: '#1E3A5F', minWidth: 220 }}
                    onPress={() => {}}
                >
                    <AppText className="text-white text-center text-base font-bold">DON'T PRESS BACK</AppText>
                </TouchableOpacity>

                <ActivityIndicator size="small" color="#578096" style={{ marginTop: 24 }} />
                <AppText className="text-gray-400 text-sm mt-2">Processing your payment...</AppText>
            </View>

            {/* Bottom Tab Bar */}
            <View className="flex-row justify-around items-center py-3 border-t border-gray-100 bg-white"
                style={{ paddingBottom: 20 }}>
                {['Home', 'Messages', 'Services', 'History', 'Profile'].map((tab, i) => (
                    <View key={tab} className="items-center">
                        <AppText style={{ fontSize: 10, color: '#9CA3AF' }}>{tab}</AppText>
                    </View>
                ))}
            </View>
        </View>
    );
}

export default PaymentInProcess;
