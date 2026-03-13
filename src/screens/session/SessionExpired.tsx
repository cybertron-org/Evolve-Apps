import AppText from '../../components/common/AppText';
import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Button } from '../../components/common/Button';
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
                <AppText className="text-2xl font-bold text-center mb-2" style={{ color: '#E74C3C' }}>
                    TIME DURATION EXCEED
                </AppText>
                <AppText className="text-base text-gray-500 dark:text-gray-400 text-center mb-8">
                    Your Session has been closed
                </AppText>

                {/* Pay Now illustration */}
                <View className="mb-3 items-center">
                    <View
                        className="w-28 h-28 rounded-full items-center justify-center"
                        style={{ backgroundColor: '#EBF5FB', borderWidth: 2, borderColor: '#D6EAF8' }}
                    >
                        <GlobalIcon name="credit-card" library="Feather" size={48} color="#2E86C1" />
                    </View>
                </View>

                <AppText className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Pay Now</AppText>
                <AppText className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
                    to re-connect with our Coach
                </AppText>

                {/* Cancel / Pay Buttons */}
                <View className="flex-row mb-6 w-full" style={{ gap: 16 }}>
                    <Button
                        title="CANCEL"
                        onPress={handleCancel}
                        variant="outline"
                        className="border-2 flex-1"
                        style={{ borderColor: '#1E3A5F', minWidth: 120 }}
                        textStyle={{ color: '#1E3A5F' }}
                    />

                    <Button
                        title="PAY"
                        onPress={handlePay}
                        className="flex-1"
                        style={{ backgroundColor: '#578096', minWidth: 120 }}
                    />
                </View>

                {/* Intake Assessment */}
                <Button
                    title="INTAKE ASSESSMENT"
                    onPress={handleIntakeAssessment}
                    className="w-full"
                    style={{ backgroundColor: '#1E3A5F' }}
                />
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
