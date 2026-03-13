import AppText from '../../components/common/AppText';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import GlobalIcon from '../../components/common/GlobalIcon';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList>;
type RouteParams = RouteProp<RootStackParamList, 'SessionCompleted'>;

function SessionCompleted() {
    const navigation = useNavigation<NavProp>();
    const route = useRoute<RouteParams>();
    const type = route.params?.type || 'invoice'; // 'invoice' or 'assessment'
    const [menuVisible, setMenuVisible] = useState(false);

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
    };

    const handlePayInvoice = () => {
        // Navigate to double click to pay — session rejoin flow
        navigation.navigate('DoubleClickToPay');
    };

    const handleIntakeAssessment = () => {
        navigation.navigate('Assessment');
    };

    return (
        <ScreenWrapper>
            <Header userName="Angelina" onMenuPress={() => setMenuVisible(true)} />

            <View className="flex-1 items-center justify-center px-8">
                {/* Success badge with sparkles */}
                <View className="mb-8 items-center">
                    {/* Top sparkles */}
                    <View className="flex-row mb-2">
                        <AppText style={{ fontSize: 20, color: '#F59E0B' }}>✦</AppText>
                        <View style={{ width: 40 }} />
                        <AppText style={{ fontSize: 16, color: '#F97316' }}>✦</AppText>
                    </View>

                    {/* Green badge */}
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

                <AppText className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
                    CONSULTATION SESSION{'\n'}COMPLETED
                </AppText>

                {type === 'invoice' ? (
                    <>
                        <TouchableOpacity
                            onPress={handlePayInvoice}
                            className="rounded-full py-4 w-full items-center mb-3"
                            style={{ backgroundColor: '#578096' }}
                            activeOpacity={0.8}
                        >
                            <AppText className="text-white font-bold text-lg">PAY INVOICE</AppText>
                        </TouchableOpacity>
                        <AppText className="text-base font-semibold mb-2" style={{ color: '#E74C3C' }}>
                            Generated Invoice $60
                        </AppText>
                    </>
                ) : (
                    <TouchableOpacity
                        onPress={handleIntakeAssessment}
                        className="rounded-full py-4 w-full items-center"
                        style={{ backgroundColor: '#1E3A5F' }}
                        activeOpacity={0.8}
                    >
                        <AppText className="text-white font-bold text-lg">INTAKE ASSESSMENT</AppText>
                    </TouchableOpacity>
                )}
            </View>

            <MenuDrawer
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onMenuItemPress={handleMenuItemPress}
            />
        </ScreenWrapper>
    );
}

export default SessionCompleted;
