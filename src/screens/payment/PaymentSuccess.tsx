import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import GlobalIcon from '../../components/common/GlobalIcon';

type NavProp = NativeStackNavigationProp<RootStackParamList>;
type RouteParams = RouteProp<RootStackParamList, 'PaymentSuccess'>;

function PaymentSuccess() {
    const navigation = useNavigation<NavProp>();
    const route = useRoute<RouteParams>();
    const type = route.params?.type || 'session'; // 'session' or 'rejoin'

    const handleReJoin = () => {
        navigation.navigate('OnlineSession', { consultationId: 1 });
    };

    const handleGoHome = () => {
        navigation.navigate('Main');
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{ height: 50 }} />

            <View className="flex-1 items-center justify-center px-8">
                {/* Success badge with sparkles */}
                <View className="mb-8 items-center">
                    {/* Top sparkles */}
                    <View className="flex-row mb-2">
                        <Text style={{ fontSize: 20, color: '#F59E0B' }}>✦</Text>
                        <View style={{ width: 40 }} />
                        <Text style={{ fontSize: 16, color: '#F97316' }}>✦</Text>
                    </View>
                    {/* Badge */}
                    <View
                        className="w-28 h-28 rounded-full items-center justify-center"
                        style={{ backgroundColor: '#2DB67D' }}
                    >
                        <GlobalIcon name="check" library="Feather" size={56} color="#FFFFFF" />
                    </View>
                    {/* Bottom sparkles */}
                    <View className="flex-row mt-2">
                        <Text style={{ fontSize: 16, color: '#EC4899' }}>✦</Text>
                        <View style={{ width: 50 }} />
                        <Text style={{ fontSize: 16, color: '#8B5CF6' }}>✦</Text>
                    </View>
                </View>

                <Text className="text-2xl font-bold text-gray-900 text-center mb-8">
                    YOUR PAYMENT WAS{'\n'}SUCCESSFULLY
                </Text>

                {type === 'rejoin' ? (
                    <TouchableOpacity
                        onPress={handleReJoin}
                        className="rounded-full py-4 px-10"
                        style={{ backgroundColor: '#578096', minWidth: 200 }}
                        activeOpacity={0.8}
                    >
                        <Text className="text-white text-center text-lg font-bold">REJOIN</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleGoHome}
                        className="rounded-full py-4 px-10"
                        style={{ backgroundColor: '#1E3A5F', minWidth: 200 }}
                        activeOpacity={0.8}
                    >
                        <Text className="text-white text-center text-lg font-bold">GO TO HOME</Text>
                    </TouchableOpacity>
                )}
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

export default PaymentSuccess;
