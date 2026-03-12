import React from 'react';
import { View, Text } from 'react-native';

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
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Order History
            </Text>

            {/* Table Header */}
            <View className="flex-row pb-3 border-b border-gray-200 dark:border-gray-700">
                <Text className="flex-1 text-sm font-semibold text-gray-900 dark:text-white">
                    Date
                </Text>
                <Text className="flex-1 text-sm font-semibold text-gray-900 dark:text-white text-center">
                    Type
                </Text>
                <Text className="flex-1 text-sm font-semibold text-gray-900 dark:text-white text-right">
                    RECEIPT
                </Text>
            </View>

            {/* Order Items */}
            {orders.map((order) => (
                <View
                    key={order.id}
                    className="flex-row py-4 border-b border-gray-100 dark:border-gray-800"
                >
                    <Text className="flex-1 text-sm text-gray-600 dark:text-gray-400">
                        {order.date}
                    </Text>
                    <Text className="flex-1 text-sm text-gray-600 dark:text-gray-400 text-center">
                        {order.type}
                    </Text>
                    <Text className="flex-1 text-sm text-gray-600 dark:text-gray-400 text-right">
                        {order.receipt}
                    </Text>
                </View>
            ))}
        </View>
    );
};
