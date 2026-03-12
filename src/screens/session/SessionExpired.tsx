import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import GlobalIcon from '../../components/common/GlobalIcon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

function SessionExpired() {
    const navigation = useNavigation<NavProp>();
    const [menuVisible, setMenuVisible] = useState(false);

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
    };

    const handleCancel = () => {
        navigation.navigate('Main');
    };

    const handlePay = () => {
        navigation.navigate('DoubleClickToPay');
    };

    const handleIntakeAssessment = () => {
        navigation.navigate('Assessment');
    };

    return (
        <ScreenWrapper>
            <Header userName="Angelina" onMenuPress={() => setMenuVisible(true)} />

            <View className="flex-1 items-center justify-center px-8">
                {/* Time Duration Exceed */}
                <Text className="text-2xl font-bold text-center mb-2" style={{ color: '#E74C3C' }}>
                    TIME DURATION EXCEED
                </Text>
                <Text className="text-base text-gray-500 dark:text-gray-400 text-center mb-8">
                    Your Session has been closed
                </Text>

                {/* Pay Now illustration */}
                <View className="mb-3 items-center">
                    <View
                        className="w-28 h-28 rounded-full items-center justify-center"
                        style={{ backgroundColor: '#EBF5FB', borderWidth: 2, borderColor: '#D6EAF8' }}
                    >
                        <GlobalIcon name="credit-card" library="Feather" size={48} color="#2E86C1" />
                    </View>
                </View>

                <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Pay Now</Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
                    to re-connect with our Coach
                </Text>

                {/* Cancel / Pay Buttons */}
                <View className="flex-row mb-6" style={{ gap: 16 }}>
                    <TouchableOpacity
                        onPress={handleCancel}
                        className="rounded-full py-4 flex-1 items-center border-2"
                        style={{ borderColor: '#1E3A5F', minWidth: 120 }}
                        activeOpacity={0.8}
                    >
                        <Text className="font-bold text-base" style={{ color: '#1E3A5F' }}>CANCEL</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handlePay}
                        className="rounded-full py-4 flex-1 items-center"
                        style={{ backgroundColor: '#578096', minWidth: 120 }}
                        activeOpacity={0.8}
                    >
                        <Text className="text-white font-bold text-base">PAY</Text>
                    </TouchableOpacity>
                </View>

                {/* Intake Assessment */}
                <TouchableOpacity
                    onPress={handleIntakeAssessment}
                    className="rounded-full py-4 w-full items-center"
                    style={{ backgroundColor: '#1E3A5F' }}
                    activeOpacity={0.8}
                >
                    <Text className="text-white font-bold text-base">INTAKE ASSESSMENT</Text>
                </TouchableOpacity>
            </View>

            <MenuDrawer
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onMenuItemPress={handleMenuItemPress}
            />
        </ScreenWrapper>
    );
}

export default SessionExpired;
