import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
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
                        <GlobalIcon name="chevron-left" library="Feather" size={24} color="#1F2937" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-gray-900 dark:text-white uppercase">
                        {month}
                    </Text>
                    <TouchableOpacity>
                        <GlobalIcon name="download" library="Feather" size={24} color="#1F2937" />
                    </TouchableOpacity>
                </View>

                <View className="px-6">
                    {/* Logo */}
                    <View className="items-center mb-8">
                        <View className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center mb-4">
                            <Text className="text-4xl font-bold text-[#1E3A5F]">E</Text>
                        </View>
                        <Text className="text-sm text-gray-500 dark:text-gray-400 text-center">
                            • EVOLVE VOCATIONAL •{'\n'}• SERVICES LLC •
                        </Text>
                    </View>

                    {/* Company Info */}
                    <View className="mb-6">
                        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Evolve Vocational
                        </Text>
                        <Text className="text-base text-gray-600 dark:text-gray-400 mb-1">
                            PS - Anthony - {month} {year}
                        </Text>
                        <Text className="text-base text-gray-600 dark:text-gray-400 mb-1">
                            Pay Date : 01/12/2023
                        </Text>
                        <Text className="text-base text-gray-600 dark:text-gray-400">
                            Pay Period : 01/12/2023 - 01/01/2024
                        </Text>
                    </View>

                    {/* Service Detail */}
                    <View className="mb-6">
                        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            Service Detail
                        </Text>
                        <Text className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Course Name
                        </Text>
                        <Text className="text-base text-gray-700 dark:text-gray-300">
                            Executive Coaching Session
                        </Text>
                    </View>

                    {/* Insurance Detail */}
                    <View className="mb-6">
                        <Text className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            Insurance Detail
                        </Text>
                        <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">
                            1000 Simpson Road Rockford, Illinois 61102
                        </Text>
                        <Text className="text-base text-gray-700 dark:text-gray-300 mb-1">
                            123-456-7890
                        </Text>
                        <Text className="text-base text-gray-700 dark:text-gray-300">
                            U.S./MEXICO
                        </Text>
                    </View>

                    {/* Divider */}
                    <View className="h-px bg-gray-300 dark:bg-gray-700 my-6" />

                    {/* Earning Table */}
                    <View className="mb-6">
                        <View className="flex-row justify-between mb-4">
                            <Text className="text-xl font-bold text-gray-900 dark:text-white">
                                Earning
                            </Text>
                            <Text className="text-xl font-bold text-gray-900 dark:text-white">
                                Amount
                            </Text>
                        </View>

                        <View className="h-px bg-gray-300 dark:bg-gray-700 mb-4" />

                        <View className="flex-row justify-between mb-4">
                            <Text className="text-base text-gray-600 dark:text-gray-400">
                                Service Fee (Per hours)
                            </Text>
                            <Text className="text-base text-gray-900 dark:text-white">
                                $80.00
                            </Text>
                        </View>

                        <View className="h-px bg-gray-300 dark:bg-gray-700 mb-4" />

                        <View className="flex-row justify-between mb-4">
                            <Text className="text-base text-gray-600 dark:text-gray-400">
                                Tax (6%)
                            </Text>
                            <Text className="text-base text-gray-900 dark:text-white">
                                $4.8
                            </Text>
                        </View>

                        {/* Total Pay */}
                        <View className="bg-[#578096] rounded-lg p-4 flex-row justify-between items-center">
                            <Text className="text-xl font-bold text-white">
                                Total Pay
                            </Text>
                            <Text className="text-xl font-bold text-white">
                                $84.8
                            </Text>
                        </View>
                    </View>
                </View>

                <View className="h-6" />
            </ScrollView>
        </ScreenWrapper>
    );
}

export default PayslipDetail;
