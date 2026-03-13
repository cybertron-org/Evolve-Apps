import AppText from '../../components/common/AppText';
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import GlobalIcon from '../../components/common/GlobalIcon';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Assessment = {
    id: string;
    title: string;
    isActive?: boolean;
};

const assessments: Assessment[] = [
    { id: '1', title: 'ASSESSMENT 01' },
    { id: '2', title: 'ASSESSMENT 02', isActive: true },
    { id: '3', title: 'ASSESSMENT 03' },
    { id: '4', title: 'ASSESSMENT 04' },
];

function Assessment() {
    const navigation = useNavigation<NavigationProp>();
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("Today's");

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
    };

    const handleCoachPress = () => {
        navigation.navigate('CoachProfile');
    };

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header 
                    userName="Angelina" 
                    onMenuPress={() => setMenuVisible(true)} 
                />

                <View className="px-6 mt-4 mb-6">
                    <AppText className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                        INTAKE ASSESSMENT
                    </AppText>
                </View>

                <View className="px-6">
                    <AppText className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        LIFE COACHING SESSION
                    </AppText>

                    <View className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mb-6">
                        <View className="flex-row items-center mb-3">
                            <Image
                                source={require('../../assets/images/image.png')}
                                className="w-16 h-16 rounded-full mr-3"
                            />
                            <View className="flex-1">
                                <AppText className="text-sm text-gray-600 dark:text-gray-400">
                                    Coach/Counselor
                                </AppText>
                                <AppText className="text-lg font-bold text-gray-900 dark:text-white">
                                    Robert
                                </AppText>
                            </View>
                            <View className="items-end">
                                <AppText className="text-sm text-gray-600 dark:text-gray-400">
                                    Last Session
                                </AppText>
                                <AppText className="text-sm text-[#578096] font-semibold">
                                    12 | May | 24
                                </AppText>
                            </View>
                        </View>

                        <TouchableOpacity 
                            onPress={handleCoachPress}
                            className="mt-2"
                        >
                            <AppText className="text-sm text-gray-700 dark:text-gray-300">
                                Tap To View Profile
                            </AppText>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row items-center mb-4">
                        <AppText className="text-base text-gray-700 dark:text-gray-300 mr-2">
                            {selectedFilter}
                        </AppText>
                        <GlobalIcon name="chevron-down" library="Feather" size={16} color="#6B7280" />
                    </View>

                    {assessments.map((assessment) => (
                        <TouchableOpacity
                            key={assessment.id}
                            className={`rounded-2xl p-4 mb-4 flex-row items-center justify-between ${
                                assessment.isActive
                                    ? 'border-2 border-[#578096] bg-white dark:bg-gray-800'
                                    : 'bg-gray-50 dark:bg-gray-800'
                            }`}
                        >
                            <AppText className="text-lg font-bold text-gray-900 dark:text-white">
                                {assessment.title}
                            </AppText>
                            <View className="flex-row items-center">
                                <View className="w-10 h-10 rounded-full bg-[#578096] items-center justify-center mr-3">
                                    <GlobalIcon name="download" library="Feather" size={20} color="#FFFFFF" />
                                </View>
                                <View className="w-10 h-10 rounded-full bg-[#578096] items-center justify-center">
                                    <GlobalIcon name="eye" library="Feather" size={20} color="#FFFFFF" />
                                </View>
                            </View>
                        </TouchableOpacity>
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

export default Assessment;
