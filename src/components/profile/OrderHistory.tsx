import AppText from '../common/AppText';
import React from 'react';
import { View} from 'react-native';

type OrderItem = {
    id: number;
    date: string;
    type: string;
    receipt: string;
};

type OrderHistoryProps = {
    orders: OrderItem[];
};

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
    return (
        <View className="px-6 mb-6">
            <AppText className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Order History
            </AppText>

            {/* Table Header */}
            <View className="flex-row pb-3 border-b border-gray-200 dark:border-gray-700">
                <AppText className="flex-1 text-sm font-semibold text-gray-900 dark:text-white">
                    Date
                </AppText>
                <AppText className="flex-1 text-sm font-semibold text-gray-900 dark:text-white text-center">
                    Type
                </AppText>
                <AppText className="flex-1 text-sm font-semibold text-gray-900 dark:text-white text-right">
                    RECEIPT
                </AppText>
            </View>

            {/* Order Items */}
            {orders.map((order) => (
                <View
                    key={order.id}
                    className="flex-row py-4 border-b border-gray-100 dark:border-gray-800"
                >
                    <AppText className="flex-1 text-sm text-gray-600 dark:text-gray-400">
                        {order.date}
                    </AppText>
                    <AppText className="flex-1 text-sm text-gray-600 dark:text-gray-400 text-center">
                        {order.type}
                    </AppText>
                    <AppText className="flex-1 text-sm text-gray-600 dark:text-gray-400 text-right">
                        {order.receipt}
                    </AppText>
                </View>
            ))}
        </View>
    );
};
