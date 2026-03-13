import AppText from '../../components/common/AppText';
import React from 'react';
import { View } from 'react-native';
import { Button } from '../../components/common/Button';
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
                        <AppText style={{ fontSize: 20, color: '#F59E0B' }}>✦</AppText>
                        <View style={{ width: 40 }} />
                        <AppText style={{ fontSize: 16, color: '#F97316' }}>✦</AppText>
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
                        <AppText style={{ fontSize: 16, color: '#EC4899' }}>✦</AppText>
                        <View style={{ width: 50 }} />
                        <AppText style={{ fontSize: 16, color: '#8B5CF6' }}>✦</AppText>
                    </View>
                </View>

                <AppText className="text-2xl font-bold text-gray-900 text-center mb-8">
                    YOUR PAYMENT WAS{'\n'}SUCCESSFULLY
                </AppText>

                {type === 'rejoin' ? (
                    <Button
                        title="REJOIN"
                        onPress={handleReJoin}
                        className="rounded-full px-10"
                        style={{ backgroundColor: '#578096', minWidth: 200 }}
                        textClassName="text-white text-center text-lg font-bold"
                    />
                ) : (
                    <Button
                        title="GO TO HOME"
                        onPress={handleGoHome}
                        className="rounded-full px-10"
                        style={{ backgroundColor: '#1E3A5F', minWidth: 200 }}
                        textClassName="text-white text-center text-lg font-bold"
                    />
                )}
            </View>

           
        </View>
    );
}

export default PaymentSuccess;
