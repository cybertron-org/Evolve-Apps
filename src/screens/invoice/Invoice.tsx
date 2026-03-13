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
import { TxtSvg } from '../../assets/svg';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Payslip = {
    id: string;
    month: string;
    year: string;
    dateRange: string;
    isActive?: boolean;
};

const allPayslips: Payslip[] = [
    { id: '1', month: 'January Payslip', year: '2024', dateRange: 'From 01-01-2024 To 31-01-2024' },
    { id: '2', month: 'February Payslip', year: '2024', dateRange: 'From 01-02-2024 To 29-02-2024', isActive: true },
    { id: '3', month: 'March Payslip', year: '2024', dateRange: 'From 01-03-2024 To 31-03-2024' },
    { id: '4', month: 'April Payslip', year: '2024', dateRange: 'From 01-04-2024 To 30-04-2024' },
    { id: '5', month: 'May Payslip', year: '2020', dateRange: 'From 01-05-2024 To 31-05-2024' },
    { id: '6', month: 'June Payslip', year: '2024', dateRange: 'From 01-06-2024 To 30-06-2024' },
    { id: '7', month: 'January Payslip', year: '2023', dateRange: 'From 01-01-2023 To 31-01-2023' },
    { id: '8', month: 'February Payslip', year: '2023', dateRange: 'From 01-02-2023 To 28-02-2023' },
    { id: '9', month: 'March Payslip', year: '2021', dateRange: 'From 01-03-2023 To 31-03-2023' },
    { id: '10', month: 'April Payslip', year: '2021', dateRange: 'From 01-04-2023 To 30-04-2023' },
    { id: '11', month: 'May Payslip', year: '2023', dateRange: 'From 01-05-2023 To 31-05-2023' },
    { id: '12', month: 'June Payslip', year: '2023', dateRange: 'From 01-06-2023 To 30-06-2023' },
];

function Invoice() {
    const navigation = useNavigation<NavigationProp>();
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedYear, setSelectedYear] = useState('All');
    const [showYearDropdown, setShowYearDropdown] = useState(false);

    const years = ['All', '2024', '2023', '2022', '2021', '2020'];

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
    };

    const handleYearSelect = (year: string) => {
        setSelectedYear(year);
        setShowYearDropdown(false);
    };

    const handlePayslipPress = (payslip: Payslip) => {
        navigation.navigate('PayslipDetail', { 
            month: payslip.month.replace(' Payslip', ''), 
            year: payslip.year 
        });
    };

    const filteredPayslips = selectedYear === 'All' 
        ? allPayslips 
        : allPayslips.filter(payslip => payslip.year === selectedYear);

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header 
                    userName="Angelina" 
                    onMenuPress={() => setMenuVisible(true)} 
                />

                <View className="px-6 mt-4">
                    <View className="flex-row items-center justify-between mb-6">
                        <View>
                            <TouchableOpacity 
                                onPress={() => setShowYearDropdown(!showYearDropdown)}
                                className="bg-gray-100 dark:bg-gray-800 rounded-xl px-6 py-3 flex-row items-center"
                            >
                                <AppText className="text-lg text-gray-700 dark:text-gray-300 mr-2">
                                    {selectedYear}
                                </AppText>
                                <GlobalIcon name="chevron-down" library="Feather" size={20} color="#6B7280" />
                            </TouchableOpacity>

                            {showYearDropdown && (
                                <View className="absolute top-14 left-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-10 w-32">
                                    {years.map((year) => (
                                        <TouchableOpacity
                                            key={year}
                                            onPress={() => handleYearSelect(year)}
                                            className="px-6 py-3 border-b border-gray-200 dark:border-gray-700"
                                        >
                                            <AppText className={`text-base ${
                                                year === selectedYear 
                                                    ? 'text-[#578096] font-bold' 
                                                    : 'text-gray-700 dark:text-gray-300'
                                            }`}>
                                                {year}
                                            </AppText>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        <AppText className="text-lg text-gray-600 dark:text-gray-400">
                            Payslips Per month
                        </AppText>
                    </View>

                    {filteredPayslips.map((payslip) => (
                        <TouchableOpacity
                            key={payslip.id}
                            onPress={() => handlePayslipPress(payslip)}
                            className={`rounded-2xl p-4 mb-4 flex-row items-center ${
                                payslip.isActive
                                    ? 'border-2 border-[#578096] bg-white dark:bg-gray-800'
                                    : 'bg-gray-50 dark:bg-gray-800'
                            }`}
                        >
                            <View className="mr-4">
                                <GlobalIcon 
                                    name="file-text" 
                                    library="Feather" 
                                    size={40} 
                                    color="#578096" 
                                />
                            </View>
                            <View className="flex-1">
                                <AppText className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                    {payslip.month}
                                </AppText>
                                <AppText className="text-sm text-gray-600 dark:text-gray-400">
                                    {payslip.dateRange}
                                </AppText>
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

export default Invoice;
