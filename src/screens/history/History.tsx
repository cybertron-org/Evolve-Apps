import AppText from '../../components/common/AppText';
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useTheme } from '../../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GlobalIcon from '../../components/common/GlobalIcon';
import { OldConsultationCard } from '../../components/consultation/OldConsultationCard';
import { NewConsultationCard } from '../../components/consultation/NewConsultationCard';
import { ConsultationSection } from '../../components/consultation/ConsultationSection';
import { oldConsultations, newConsultations } from '../../data/consultationData';

function History() {
    const { isDark } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [menuVisible, setMenuVisible] = useState(false);
    const [sortOrder, setSortOrder] = useState<'older' | 'newer'>('newer');

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
    };

    const handleViewIntake = (consultationId: number) => {
        navigation.navigate('OnlineSession', { consultationId });
    };

    const handleViewDetail = (consultationId: number) => {
        navigation.navigate('OnlineSession', { consultationId });
    };

    const handleJoinNow = (consultationId: number) => {
        navigation.navigate('OnlineSession', { consultationId });
    };

    const newCategoryConsultations = newConsultations.filter(c => c.category === 'new');
    const todayCategoryConsultations = newConsultations.filter(c => c.category === 'today');

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header userName="Angelina" onMenuPress={() => setMenuVisible(true)} />

                <View className="px-6 mt-4 mb-4">
                    <AppText className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                        CONSULTATION HISTORY
                    </AppText>
                </View>

                <View className="px-6 mb-4">
                    <TouchableOpacity
                        onPress={() => setSortOrder(sortOrder === 'older' ? 'newer' : 'older')}
                        className="flex-row items-center"
                    >
                        <AppText className="text-sm font-normal text-gray-600 dark:text-gray-400 capitalize">
                            {sortOrder}
                        </AppText>
                        <GlobalIcon name="chevron-down" library="Feather" size={16} color={isDark ? '#9CA3AF' : '#6B7280'} />
                    </TouchableOpacity>
                </View>

                <View className="px-6">
                    {sortOrder === 'older' ? (
                        oldConsultations.map((consultation, index) => (
                            <OldConsultationCard
                                key={consultation.id}
                                title={consultation.title}
                                price={consultation.price}
                                status={consultation.status}
                                startTime={consultation.startTime}
                                isHighlighted={index === 1}
                                onPress={() => handleViewIntake(consultation.id)}
                            />
                        ))
                    ) : (
                        <>
                            {newCategoryConsultations.map((consultation) => (
                                <NewConsultationCard
                                    key={consultation.id}
                                    title={consultation.title}
                                    time={consultation.time}
                                    status={consultation.status}
                                    statusText={consultation.statusText}
                                    onViewDetail={() => handleViewDetail(consultation.id)}
                                />
                            ))}

                            <ConsultationSection title="Today's">
                                {todayCategoryConsultations.map((consultation) => (
                                    <NewConsultationCard
                                        key={consultation.id}
                                        title={consultation.title}
                                        time={consultation.time}
                                        status={consultation.status}
                                        statusText={consultation.statusText}
                                        onViewDetail={() => handleViewDetail(consultation.id)}
                                        onJoinNow={
                                            consultation.status === 'live'
                                                ? () => handleJoinNow(consultation.id)
                                                : undefined
                                        }
                                    />
                                ))}
                            </ConsultationSection>
                        </>
                    )}
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

export default History;
