import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Linking, Alert, View } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AppText from '../../components/common/AppText';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useTheme } from '../../theme/ThemeContext';
import { RootStackParamList } from '../../navigation/RootNavigator';

// Custom Components
import SessionCard from '../../components/specific/OnlineSession/SessionCard';
import SessionInfoRow from '../../components/specific/OnlineSession/SessionInfoRow';
import JoinOptionsModal from '../../components/specific/OnlineSession/JoinOptionsModal';

// Data
import { sessionsData, SessionData } from '../../data/sessionData';

type OnlineSessionRouteParams = {
    OnlineSession: {
        consultationId: number;
    };
};

function OnlineSession() {
    const { isDark } = useTheme();
    const route = useRoute<RouteProp<OnlineSessionRouteParams, 'OnlineSession'>>();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    const [menuVisible, setMenuVisible] = useState(false);
    const [showJoinOptions, setShowJoinOptions] = useState(false);

    const consultationId = route.params?.consultationId || 1;
    const session: SessionData = sessionsData[consultationId] || sessionsData[1];

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
    };

    const handleViewDetail = () => {
        navigation.navigate('PurchaseSummary');
    };

    const handleJoinNow = () => {
        if (session.zoomLink) {
            setShowJoinOptions(true);
            return;
        }

        if (session.isLive) {
            navigation.navigate('SessionCompleted', { type: 'invoice' });
        } else {
            navigation.navigate('PurchaseSummary');
        }
    };

    const joinViaBrowser = async () => {
        if (!session.zoomLink) return;
        setShowJoinOptions(false);
        try {
            const browserLink = session.zoomLink.replace('/j/', '/wc/join/');
            await Linking.openURL(browserLink);
        } catch (error) {
            console.error('An error occurred', error);
            Alert.alert('Error', 'Could not open browser');
        }
    };

    const joinViaApp = async () => {
        if (!session.zoomLink) return;
        setShowJoinOptions(false);
        try {
            const supported = await Linking.canOpenURL(session.zoomLink);
            if (supported) {
                await Linking.openURL(session.zoomLink);
            } else {
                Alert.alert('Error', 'Zoom App not found. Please install it or use the Browser option.');
            }
        } catch (error) {
            console.error('An error occurred', error);
            Alert.alert('Error', 'An unexpected error occurred');
        }
    };

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header 
                    userName="Angelina" 
                    onMenuPress={() => setMenuVisible(true)} 
                />

                <SessionCard 
                    title={session.title} 
                    onViewDetail={handleViewDetail} 
                />

                <SessionInfoRow 
                    label="Coach Name"
                    title={session.coachName}
                    subtitle={session.coachExperience}
                    image={session.coachImage}
                />

                <SessionInfoRow 
                    label="Start Time"
                    title={session.startTime}
                    subtitle="Time"
                    icon="clock"
                />

                <SessionInfoRow 
                    label="Duration"
                    title={session.duration}
                    subtitle="Duration"
                    icon="clock"
                />

                {session.isLive && (
                    <View className="px-6 mb-6">
                        <AppText className="text-center text-red-500 font-semibold text-base">
                            Session is Live
                        </AppText>
                    </View>
                )}

                <View className="px-6 mb-6">
                    <TouchableOpacity
                        onPress={handleJoinNow}
                        activeOpacity={0.8}
                        className="rounded-full py-4"
                        style={{ backgroundColor: '#1E3A5F' }}
                    >
                        <AppText className="text-center text-white font-bold text-base">
                            JOIN NOW
                        </AppText>
                    </TouchableOpacity>
                </View>

                <View className="h-6" />
            </ScrollView>

            <MenuDrawer
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onMenuItemPress={handleMenuItemPress}
            />

            <JoinOptionsModal
                visible={showJoinOptions}
                isDark={isDark}
                onClose={() => setShowJoinOptions(false)}
                onJoinViaApp={joinViaApp}
                onJoinViaBrowser={joinViaBrowser}
            />
        </ScreenWrapper>
    );
}

export default OnlineSession;
