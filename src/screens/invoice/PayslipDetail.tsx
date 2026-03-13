import AppText from '../../components/common/AppText';
import React from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import GlobalIcon from '../../components/common/GlobalIcon';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/RootNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type PayslipDetailRouteProp = RouteProp<RootStackParamList, 'PayslipDetail'>;

function PayslipDetail() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<PayslipDetailRouteProp>();
    const { month, year } = route.params;

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-6 pt-4 pb-6">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <GlobalIcon name="chevron-left" library="Feather" size={24} color="#28282A" />
                    </TouchableOpacity>
                    <AppText className="text-xl font-bold text-gray-900 dark:text-white uppercase">
                        {month}
                    </AppText>
                    <TouchableOpacity>
                        <GlobalIcon name="download" library="Feather" size={24} color="#28282A" />
                    </TouchableOpacity>
                </View>

                <View className="px-6">
                    {/* Logo */}
                    <View className="items-center mb-8">
                        <View className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center mb-4">
                            <AppText className="text-4xl font-bold text-[#1E3A5F]">E</AppText>
                        </View>
                        <AppText className="text-sm text-gray-500 dark:text-gray-400 text-center">
                            • EVOLVE VOCATIONAL •{'\n'}• SERVICES LLC •
                        </AppText>
                    </View>

                    {/* Company Info */}
                    <View className="mb-6">
                        <AppText className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Evolve Vocational
                        </AppText>
                        <AppText className="text-base text-gray-600 dark:text-gray-400 mb-1">
                            PS - Anthony - {month} {year}
                        </AppText>
                        <AppText className="text-base text-gray-600 dark:text-gray-400 mb-1">
                            Pay Date : 01/12/2023
                        </AppText>
                        <AppText className="text-base text-gray-600 dark:text-gray-400">
                            Pay Period : 01/12/2023 - 01/01/2024
                        </AppText>
                    </View>

                    {/* Service Detail */}
                    <View className="mb-6">
                        <AppText className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            Service Detail
                        </AppText>
                        <AppText className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Course Name
                        </AppText>
                        <AppText className="text-base text-gray-700 dark:text-gray-300">
                            Executive Coaching Session
                        </AppText>
                    </View>

                    {/* Insurance Detail */}
                    <View className="mb-6">
                        <AppText className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            Insurance Detail
                        </AppText>
                        <AppText className="text-base text-gray-700 dark:text-gray-300 mb-1">
                            1000 Simpson Road Rockford, Illinois 61102
                        </AppText>
                        <AppText className="text-base text-gray-700 dark:text-gray-300 mb-1">
                            123-456-7890
                        </AppText>
                        <AppText className="text-base text-gray-700 dark:text-gray-300">
                            U.S./MEXICO
                        </AppText>
                    </View>

                    {/* Divider */}
                    <View className="h-px bg-gray-300 dark:bg-gray-700 my-6" />

                    {/* Earning Table */}
                    <View className="mb-6">
                        <View className="flex-row justify-between mb-4">
                            <AppText className="text-xl font-bold text-gray-900 dark:text-white">
                                Earning
                            </AppText>
                            <AppText className="text-xl font-bold text-gray-900 dark:text-white">
                                Amount
                            </AppText>
                        </View>

                        <View className="h-px bg-gray-300 dark:bg-gray-700 mb-4" />

                        <View className="flex-row justify-between mb-4">
                            <AppText className="text-base text-gray-600 dark:text-gray-400">
                                Service Fee (Per hours)
                            </AppText>
                            <AppText className="text-base text-gray-900 dark:text-white">
                                $80.00
                            </AppText>
                        </View>

                        <View className="h-px bg-gray-300 dark:bg-gray-700 mb-4" />

                        <View className="flex-row justify-between mb-4">
                            <AppText className="text-base text-gray-600 dark:text-gray-400">
                                Tax (6%)
                            </AppText>
                            <AppText className="text-base text-gray-900 dark:text-white">
                                $4.8
                            </AppText>
                        </View>

                        {/* Total Pay */}
                        <View className="bg-[#578096] rounded-lg p-4 flex-row justify-between items-center">
                            <AppText className="text-xl font-bold text-white">
                                Total Pay
                            </AppText>
                            <AppText className="text-xl font-bold text-white">
                                $84.8
                            </AppText>
                        </View>
                    </View>
                </View>

                <View className="h-6" />
            </ScrollView>
        </ScreenWrapper>
    );
}

export default PayslipDetail;
