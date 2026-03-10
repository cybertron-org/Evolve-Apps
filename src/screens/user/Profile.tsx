import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useTheme } from '../../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GlobalIcon from '../../components/common/GlobalIcon';

type OrderItem = {
    id: number;
    date: string;
    type: string;
    receipt: string;
};

const orders: OrderItem[] = [
    { id: 1, date: '19 June 2024', type: 'Pro Monthly', receipt: 'PDF' },
    { id: 2, date: '19 June 2024', type: 'Pro Monthly', receipt: 'PDF' },
    { id: 3, date: '19 June 2024', type: 'Pro Monthly', receipt: 'PDF' },
];

const userProfile = {
    name: 'Angelina',
    email: 'Info@angelina.com',
    phone: '479-785-6200',
    bio: 'Lorem ipsum dolor sit amet, from us in consectetur a adipiscing elit, sed do us eisusmod tempor for incididunt ut more enim ad minim veniam.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
};

function Profile() {
    const { isDark } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [menuVisible, setMenuVisible] = useState(false);
    const [isRestoring, setIsRestoring] = useState(true);

    // Prevent automatic navigation during app restore
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsRestoring(false);
        }, 1000); // Wait 1 second after component mounts

        return () => clearTimeout(timer);
    }, []);

    const handleMenuItemPress = (item: string) => {
        if (item === 'profile' && !isRestoring) {
            navigation.navigate('AddProfile');
        }
        console.log('Menu item pressed:', item);
    };

    const handleEditProfile = () => {
        if (!isRestoring) {
            navigation.navigate('AddProfile');
        }
    };

    const handleOrderPress = (order: OrderItem) => {
        if (!isRestoring) {
            navigation.navigate('OrderDetail', { orderId: order.id });
        }
    };

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-6 py-4">
                    <View className="flex-row items-center gap-3">
                        <Image
                            source={{ uri: userProfile.avatar }}
                            className="w-12 h-12 rounded-full"
                        />
                        <View>
                            <Text className="text-sm text-gray-600 dark:text-gray-400">Hi,</Text>
                            <Text className="text-base font-semibold text-gray-900 dark:text-white">
                                {userProfile.name}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => setMenuVisible(true)} className="p-2">
                        <GlobalIcon name="menu" library="Feather" size={24} color={isDark ? '#F1F5F9' : '#1E293B'} />
                    </TouchableOpacity>
                </View>

                {/* Profile Avatar */}
                <View className="items-center mb-6">
                    <View className="relative">
                        <Image
                            source={{ uri: userProfile.avatar }}
                            className="w-32 h-32 rounded-full"
                        />
                        <TouchableOpacity
                            onPress={handleEditProfile}
                            className="absolute bottom-0 right-0 w-10 h-10 rounded-full items-center justify-center"
                            style={{ backgroundColor: '#1E3A5F' }}
                        >
                            <GlobalIcon name="edit-2" library="Feather" size={18} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Profile Info */}
                <View className="px-6 mb-6">
                    {/* Full Name */}
                    <View className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <View className="flex-row items-center justify-between">
                            <View className="flex-1">
                                <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    Full Name
                                </Text>
                                <Text className="text-base text-gray-900 dark:text-white">
                                    {userProfile.name}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={handleEditProfile}
                                className="w-10 h-10 rounded-full items-center justify-center"
                                style={{ backgroundColor: isDark ? '#374151' : '#E5E7EB' }}
                            >
                                <GlobalIcon name="edit-2" library="Feather" size={16} color={isDark ? '#F1F5F9' : '#1E293B'} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Email */}
                    <View className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <View className="flex-row items-center justify-between">
                            <View className="flex-1">
                                <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    Email Address
                                </Text>
                                <Text className="text-base text-gray-900 dark:text-white">
                                    {userProfile.email}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={handleEditProfile}
                                className="w-10 h-10 rounded-full items-center justify-center"
                                style={{ backgroundColor: isDark ? '#374151' : '#E5E7EB' }}
                            >
                                <GlobalIcon name="edit-2" library="Feather" size={16} color={isDark ? '#F1F5F9' : '#1E293B'} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Phone */}
                    <View className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <View className="flex-row items-center justify-between">
                            <View className="flex-1">
                                <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    Phone Number
                                </Text>
                                <Text className="text-base text-gray-900 dark:text-white">
                                    {userProfile.phone}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={handleEditProfile}
                                className="w-10 h-10 rounded-full items-center justify-center"
                                style={{ backgroundColor: isDark ? '#374151' : '#E5E7EB' }}
                            >
                                <GlobalIcon name="edit-2" library="Feather" size={16} color={isDark ? '#F1F5F9' : '#1E293B'} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Bio */}
                    <View className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <View className="flex-row items-start justify-between">
                            <View className="flex-1">
                                <Text className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    Bio
                                </Text>
                                <Text className="text-sm text-gray-600 dark:text-gray-300 leading-5">
                                    {userProfile.bio}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={handleEditProfile}
                                className="w-10 h-10 rounded-full items-center justify-center ml-2"
                                style={{ backgroundColor: isDark ? '#374151' : '#E5E7EB' }}
                            >
                                <GlobalIcon name="edit-2" library="Feather" size={16} color={isDark ? '#F1F5F9' : '#1E293B'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Order History */}
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
                        <TouchableOpacity
                            key={order.id}
                            onPress={() => handleOrderPress(order)}
                            activeOpacity={0.7}
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
                        </TouchableOpacity>
                    ))}
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

export default Profile;
