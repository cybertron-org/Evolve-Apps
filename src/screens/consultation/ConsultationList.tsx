import AppText from '../../components/common/AppText';
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import GlobalIcon from '../../components/common/GlobalIcon';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Consultation = {
    id: number;
    title: string;
    time: string;
    status: 'upcoming' | 'live' | 'scheduled';
    statusText: string;
    category: 'new' | 'today';
};

const consultations: Consultation[] = [
    {
        id: 1,
        title: 'PERSONAL AID SERVICES',
        time: '9:00 AM',
        status: 'upcoming',
        statusText: 'Start in 30 minutes',
        category: 'new'},
    {
        id: 2,
        title: 'EXECUTIVE COACHING SESSION',
        time: '9:00 AM',
        status: 'live',
        statusText: 'Live Now',
        category: 'today'},
    {
        id: 3,
        title: 'ADA ACCOMMODATIONS CONSULT...',
        time: '9:00 AM',
        status: 'scheduled',
        statusText: 'Start in 30 minutes',
        category: 'today'},
];

function ConsultationList() {
    const navigation = useNavigation<NavigationProp>();
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<'new' | 'today'>('new');

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
    };

    const handleViewDetail = (consultationId: number) => {
        navigation.navigate('OnlineSession', { consultationId });
    };

    const handleJoinNow = (consultationId: number) => {
        navigation.navigate('OnlineSession', { consultationId });
    };

    const filteredConsultations = consultations.filter(c => c.category === selectedFilter);

    return (
        <ScreenWrapper scroll={true}>
                <Header 
                    userName="Angelina" 
                    onMenuPress={() => setMenuVisible(true)} 
                />

                <View className="px-6 mt-4">
                    {/* Filter Dropdown */}
                    <TouchableOpacity 
                        className="flex-row items-center mb-6"
                        onPress={() => setSelectedFilter(selectedFilter === 'new' ? 'today' : 'new')}
                    >
                        <AppText className="text-lg text-gray-700 dark:text-gray-300 mr-2">
                            {selectedFilter === 'new' ? 'New' : "Today's"}
                        </AppText>
                        <GlobalIcon name="chevron-down" library="Feather" size={20} color="#6B7280" />
                    </TouchableOpacity>

                    {/* Consultations List */}
                    {filteredConsultations.map((consultation) => (
                        <View
                            key={consultation.id}
                            className={`rounded-2xl p-6 mb-4 ${
                                consultation.status === 'live'
                                    ? 'border-2 border-[#578096] bg-white dark:bg-gray-800'
                                    : 'bg-[#E8F5E9] dark:bg-gray-800'
                            }`}
                        >
                            <AppText className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                {consultation.title}
                            </AppText>

                            <View className="flex-row items-center mb-4">
                                <GlobalIcon 
                                    name="clock" 
                                    library="Feather" 
                                    size={20} 
                                    color={consultation.status === 'live' ? '#EF4444' : '#6B7280'} 
                                />
                                <AppText 
                                    className={`text-base ml-2 ${
                                        consultation.status === 'live' 
                                            ? 'text-red-500' 
                                            : 'text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    {consultation.time}
                                </AppText>
                            </View>

                            <AppText 
                                className={`text-sm mb-4 ${
                                    consultation.status === 'live' 
                                        ? 'text-red-500' 
                                        : 'text-gray-600 dark:text-gray-400'
                                }`}
                            >
                                {consultation.statusText}
                            </AppText>

                            {consultation.status === 'live' ? (
                                <TouchableOpacity
                                    onPress={() => handleJoinNow(consultation.id)}
                                    className="rounded-full py-4"
                                    style={{ backgroundColor: '#F87171' }}
                                >
                                    <AppText className="text-white text-center text-lg font-bold">
                                        JOIN NOW
                                    </AppText>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => handleViewDetail(consultation.id)}
                                    className="rounded-full py-4"
                                    style={{ backgroundColor: '#578096' }}
                                >
                                    <AppText className="text-white text-center text-lg font-bold">
                                        VIEW DETAIL
                                    </AppText>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </View>

                <View className="h-6" />

            <MenuDrawer
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onMenuItemPress={handleMenuItemPress}
            />
        </ScreenWrapper>
    );
}

export default ConsultationList;
