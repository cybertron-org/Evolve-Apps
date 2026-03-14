import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

import PaymentHeader from '../../components/payment/PaymentHeader';
import PaymentSummaryContent from '../../components/payment/PaymentSummaryContent';
import PaymentConfirmationCard from '../../components/payment/PaymentConfirmationCard';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

function DoubleClickToPay() {
    const navigation = useNavigation<NavProp>();
    const [clickCount, setClickCount] = useState(0);

    const handleSideButtonPress = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        if (newCount >= 2) {
            // Navigate to payment in process
            navigation.navigate('Services', { screen: 'PaymentInProcess' });
        }
    };

    const handleGooglePayPress = () => {
        // Mock Google Pay Tap Action
        navigation.navigate('Services', { screen: 'PaymentInProcess' });
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#111827' }}>
            {/* Background image - dark blurred */}
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800' }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.3 }}
                resizeMode="cover"
            />

            <PaymentHeader onBackPress={() => navigation.goBack()} />

            <PaymentSummaryContent />

            <PaymentConfirmationCard 
                amount="$300"
                onApplePayPress={handleSideButtonPress}
                onGooglePayPress={handleGooglePayPress}
            />
        </View>
    );
}

export default DoubleClickToPay;
