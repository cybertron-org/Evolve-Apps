import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useTheme } from '../../theme/ThemeContext';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import GlobalIcon from '../../components/common/GlobalIcon';

type OrderDetailRouteParams = {
    OrderDetail: {
        orderId: number;
    };
};

const orderDetails = {
    1: {
        company: 'Evolve Vocational',
        logo: 'https://via.placeholder.com/150',
        reference: 'PS - Anthony - January 2024',
        payDate: '01/12/2023',
        payPeriod: '01/12/2023 - 01/01/2024',
        courseName: 'Executive Coaching Session',
        address: '1000 Simpson Road Rockford, Illinois 61102',
        phone: '123-456-7890',
        country: 'U.S./MEXICO',
    },
};

function OrderDetail() {
    const { isDark } = useTheme();
    const navigation = useNavigation();
    const route = useRoute<RouteProp<OrderDetailRouteParams, 'OrderDetail'>>();
    const [menuVisible, setMenuVisible] = useState(false);

    const orderId = route.params?.orderId || 1;
    const order = orderDetails[orderId as keyof typeof orderDetails] || orderDetails[1];

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
    };

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-6 py-4">
                    <View className="flex-row items-center gap-3">
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' }}
                            className="w-12 h-12 rounded-full"
                        />
                        <View>
                            <Text className="text-sm text-gray-600 dark:text-gray-400">Hi,</Text>
                            <Text className="text-base font-semibold text-gray-900 dark:text-white">
                                Angelina
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => setMenuVisible(true)} className="p-2">
                        <GlobalIcon name="menu" library="Feather" size={24} color={isDark ? '#F1F5F9' : '#1E293B'} />
                    </TouchableOpacity>
                </View>

                {/* Back Button and Month */}
                <View className="flex-row items-center justify-between px-6 mb-6">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                        <GlobalIcon name="chevron-left" library="Feather" size={24} color={isDark ? '#F1F5F9' : '#1E293B'} />
                    </TouchableOpacity>

                    <Text className="text-xl font-bold text-gray-900 dark:text-white">
                        JANUARY
                    </Text>

                    <TouchableOpacity className="p-2">
                        <GlobalIcon name="download" library="Feather" size={24} color={isDark ? '#F1F5F9' : '#1E293B'} />
                    </TouchableOpacity>
                </View>

                {/* Company Logo */}
                <View className="items-center mb-6">
                    <View className="w-32 h-32 rounded-full items-center justify-center border-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <View className="items-center">
                            <View className="w-16 h-16 bg-[#1E3A5F] items-center justify-center rounded-lg">
                                <Text className="text-white text-3xl font-bold">E</Text>
                            </View>
                        </View>
                    </View>
                    <Text className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center" style={{ letterSpacing: 2 }}>
                        • EVOLVE VOCATIONAL •{'\n'}• SERVICES LLC •
                    </Text>
                </View>

                {/* Company Name */}
                <View className="px-6 mb-6">
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                        {order.company}
                    </Text>
                </View>

                {/* Order Details */}
                <View className="px-6 mb-6">
                    <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {order.reference}
                    </Text>
                    <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Pay Date : {order.payDate}
                    </Text>
                    <Text className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                        Pay Period : {order.payPeriod}
                    </Text>
                </View>

                {/* Service Detail */}
                <View className="px-6 mb-6">
                    <Text className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        Service Detail
                    </Text>
                    <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Course Name
                    </Text>
                    <Text className="text-base text-gray-900 dark:text-white mb-6">
                        {order.courseName}
                    </Text>
                </View>

                {/* Insurance Detail */}
                <View className="px-6 mb-6">
                    <Text className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        Insurance Detail
                    </Text>
                    <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {order.address}
                    </Text>
                    <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {order.phone}
                    </Text>
                    <Text className="text-sm text-gray-600 dark:text-gray-400">
                        {order.country}
                    </Text>
                </View>

                <View className="h-24" />
            </ScrollView>

            <MenuDrawer
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onMenuItemPress={handleMenuItemPress}
            />
        </ScreenWrapper>
    );
}

export default OrderDetail;
