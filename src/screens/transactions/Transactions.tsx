import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useTheme } from '../../theme/ThemeContext';
import GlobalIcon from '../../components/common/GlobalIcon';

type Transaction = {
    id: string;
    status: string;
    amount: number;
    transactionId: string;
    date: string;
    time: string;
};

const transactions: Transaction[] = [
    { id: '1', status: 'PAYMENT SUCCESS', amount: 90, transactionId: 'AS#12323546SD', date: '5 May', time: '01:23 pm' },
    { id: '2', status: 'PAYMENT SUCCESS', amount: 90, transactionId: 'AS#12323546SD', date: '5 May', time: '01:23 pm' },
    { id: '3', status: 'PAYMENT SUCCESS', amount: 90, transactionId: 'AS#12323546SD', date: '5 May', time: '01:23 pm' },
    { id: '4', status: 'PAYMENT SUCCESS', amount: 90, transactionId: 'AS#12323546SD', date: '5 May', time: '01:23 pm' },
    { id: '5', status: 'PAYMENT SUCCESS', amount: 90, transactionId: 'AS#12323546SD', date: '5 May', time: '01:23 pm' },
];

function Transactions() {
    const { isDark } = useTheme();
    const [menuVisible, setMenuVisible] = useState(false);

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
    };

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header 
                    userName="Angelina" 
                    onMenuPress={() => setMenuVisible(true)} 
                />

                <View className="px-6 mt-4 mb-6">
                    <Text className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                        TRANSACTIONS
                    </Text>
                </View>

                <View className="px-6">
                    {transactions.map((transaction, index) => (
                        <View
                            key={transaction.id}
                            className={`rounded-2xl p-4 mb-4 flex-row items-center ${
                                index === 1 
                                    ? 'border border-gray-400 bg-gray-50 dark:bg-gray-700' 
                                    : 'bg-gray-50 dark:bg-gray-800'
                            }`}
                        >
                            <View className="w-12 h-12 rounded-full  items-center justify-center mr-4">
                                <Image 
                                    source={require('../../assets/images/payment.png')} 
                                    style={{ width: 40, height: 48}}
                                    resizeMode="contain"
                                />
                            </View>

                            <View className="flex-1">
                                <View className="flex-row items-center justify-between mb-1">
                                    <Text className="text-base font-bold text-gray-900 dark:text-white">
                                        {transaction.status}
                                    </Text>
                                    <Text className="text-xl font-bold text-[#10B981]">
                                        ${transaction.amount}
                                    </Text>
                                </View>
                                <View className="flex-row items-center justify-between">
                                    <Text className="text-sm text-gray-600 dark:text-gray-400">
                                        {transaction.transactionId}
                                    </Text>
                                    <View className="flex-row items-center">
                                        <GlobalIcon name="calendar" library="Feather" size={12} color="#EF4444" />
                                        <Text className="text-xs text-[#EF4444] ml-1">{transaction.date}</Text>
                                        <View className="ml-2">
                                            <GlobalIcon name="clock" library="Feather" size={12} color="#EF4444" />
                                        </View>
                                        <Text className="text-xs text-[#EF4444] ml-1">{transaction.time}</Text>
                                    </View>
                                </View>
                            </View>
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

export default Transactions;
