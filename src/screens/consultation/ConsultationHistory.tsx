import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useTheme } from '../../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GlobalIcon from '../../components/common/GlobalIcon';

type ConsultationItem = {
    id: number;
    title: string;
    price: number;
    status: 'free' | 'paid';
    startTime: string;
};

const consultations: ConsultationItem[] = [
    {
        id: 1,
        title: 'Executive Coaching Session',
        price: 0,
        status: 'free',
        startTime: '30 minutes',
    },
    {
        id: 2,
        title: 'Executive Coaching Session',
        price: 30,
        status: 'paid',
        startTime: '30 minutes',
    },
    {
        id: 3,
        title: 'ADA Accommodations Consultation',
        price: 60,
        status: 'paid',
        startTime: '30 minutes',
    },
];

function ConsultationHistory() {
    const { isDark } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [menuVisible, setMenuVisible] = useState(false);
    const [sortOrder, setSortOrder] = useState<'older' | 'newer'>('newer');

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
    };

    const handleViewIntake = (consultation: ConsultationItem) => {
        navigation.navigate('OnlineSession', { consultationId: consultation.id });
    };

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header 
                    userName="Angelina" 
                    onMenuPress={() => setMenuVisible(true)} 
                />

                <View className="px-6 mt-4 mb-4">
                    <Text className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                        CONSULTATION HISTORY
                    </Text>
                </View>

                <View className="px-6 mb-4">
                    <TouchableOpacity
                        onPress={() => setSortOrder(sortOrder === 'older' ? 'newer' : 'older')}
                        className="flex-row items-center"
                    >
                        <Text className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {sortOrder}
                        </Text>
                        <GlobalIcon 
                            name="chevron-down" 
                            library="Feather" 
                            size={16} 
                            color={isDark ? '#9CA3AF' : '#6B7280'} 
                        />
                    </TouchableOpacity>
                </View>

                <View className="px-6">
                    {consultations.map((consultation) => (
                        <View
                            key={consultation.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4 border border-gray-200 dark:border-gray-700"
                        >
                            <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                {consultation.title}
                            </Text>

                            <View className="flex-row items-center mb-4">
                                <GlobalIcon 
                                    name={consultation.status === 'free' ? 'tag' : 'dollar-sign'} 
                                    library="Feather" 
                                    size={16} 
                                    color={consultation.status === 'free' ? '#10B981' : '#6B7280'} 
                                />
                                <Text 
                                    className={`ml-2 text-sm font-semibold ${
                                        consultation.status === 'free' 
                                            ? 'text-green-500' 
                                            : 'text-gray-600 dark:text-gray-400'
                                    }`}
                                >
                                    {consultation.status === 'free' ? 'Free' : `$${consultation.price}`}
                                </Text>
                                <Text className="ml-2 text-xs text-red-500">
                                    Start in {consultation.startTime}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => handleViewIntake(consultation)}
                                activeOpacity={0.8}
                                className="rounded-full py-3"
                                style={{ backgroundColor: isDark ? '#94A3B8' : '#7FA5B8' }}
                            >
                                <Text className="text-center text-white font-semibold text-sm">
                                    VIEW INTAKE ASSESSMENT
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
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

export default ConsultationHistory;
