import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useTheme } from '../../theme/ThemeContext';
import { useRoute, RouteProp } from '@react-navigation/native';
import GlobalIcon from '../../components/common/GlobalIcon';

type OnlineSessionRouteParams = {
    OnlineSession: {
        consultationId: number;
    };
};

type SessionData = {
    id: number;
    title: string;
    coachName: string;
    coachExperience: string;
    coachImage: string;
    startTime: string;
    duration: string;
    isLive: boolean;
};

const sessionsData: Record<number, SessionData> = {
    1: {
        id: 1,
        title: 'Executive Coaching Session',
        coachName: 'Gilbert',
        coachExperience: '8 year of experience',
        coachImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
        startTime: '8:00 PM',
        duration: '45 Minutes',
        isLive: true,
    },
    2: {
        id: 2,
        title: 'Executive Coaching Session',
        coachName: 'Sarah',
        coachExperience: '5 year of experience',
        coachImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
        startTime: '10:00 AM',
        duration: '60 Minutes',
        isLive: false,
    },
    3: {
        id: 3,
        title: 'ADA Accommodations Consultation',
        coachName: 'Michael',
        coachExperience: '10 year of experience',
        coachImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        startTime: '2:00 PM',
        duration: '30 Minutes',
        isLive: true,
    },
};

function OnlineSession() {
    const { isDark } = useTheme();
    const route = useRoute<RouteProp<OnlineSessionRouteParams, 'OnlineSession'>>();
    const [menuVisible, setMenuVisible] = useState(false);

    const consultationId = route.params?.consultationId || 1;
    const session = sessionsData[consultationId] || sessionsData[1];

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
    };

    const handleJoinNow = () => {
        console.log('Joining session:', session.id);
    };

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header 
                    userName="Angelina" 
                    onMenuPress={() => setMenuVisible(true)} 
                />

                {/* Session Card */}
                <View className="mx-6 mt-4 mb-6">
                    <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
                        <Text className="text-lg font-bold text-gray-900 dark:text-white text-center mb-4">
                            {session.title}
                        </Text>
                        <TouchableOpacity
                            className="rounded-full py-3 mb-4"
                            style={{ backgroundColor: '#7FA5B8' }}
                        >
                            <Text className="text-center text-white font-semibold text-sm">
                                VIEW DETAIL
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Coach Info */}
                <View className="px-6 mb-6">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        Coach Name
                    </Text>
                    <View className="flex-row items-center">
                        <Image
                            source={{ uri: session.coachImage }}
                            className="w-16 h-16 rounded-full"
                        />
                        <View className="ml-4">
                            <Text className="text-base font-bold text-gray-900 dark:text-white">
                                {session.coachName}
                            </Text>
                            <Text className="text-sm text-gray-500 dark:text-gray-400">
                                {session.coachExperience}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Start Time */}
                <View className="px-6 mb-6">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        Start Time
                    </Text>
                    <View className="flex-row items-center">
                        <View 
                            className="w-12 h-12 rounded-full items-center justify-center"
                            style={{ backgroundColor: '#7FA5B8' }}
                        >
                            <GlobalIcon name="clock" library="Feather" size={24} color="#FFFFFF" />
                        </View>
                        <View className="ml-4">
                            <Text className="text-base font-bold text-gray-900 dark:text-white">
                                {session.startTime}
                            </Text>
                            <Text className="text-sm text-gray-500 dark:text-gray-400">
                                Time
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Duration */}
                <View className="px-6 mb-6">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        Duration
                    </Text>
                    <View className="flex-row items-center">
                        <View 
                            className="w-12 h-12 rounded-full items-center justify-center"
                            style={{ backgroundColor: '#7FA5B8' }}
                        >
                            <GlobalIcon name="clock" library="Feather" size={24} color="#FFFFFF" />
                        </View>
                        <View className="ml-4">
                            <Text className="text-base font-bold text-gray-900 dark:text-white">
                                {session.duration}
                            </Text>
                            <Text className="text-sm text-gray-500 dark:text-gray-400">
                                Duration
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Live Status */}
                {session.isLive && (
                    <View className="px-6 mb-6">
                        <Text className="text-center text-red-500 font-semibold text-base">
                            Session is Live
                        </Text>
                    </View>
                )}

                {/* Join Button */}
                <View className="px-6 mb-6">
                    <TouchableOpacity
                        onPress={handleJoinNow}
                        activeOpacity={0.8}
                        className="rounded-full py-4"
                        style={{ backgroundColor: '#1E3A5F' }}
                    >
                        <Text className="text-center text-white font-bold text-base">
                            JOIN NOW
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="h-6" />
            </ScrollView>

            <MenuDrawer
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onMenuItemPress={handleMenuItemPress}
            />
        </ScreenWrapper>
    );
}

export default OnlineSession;
