import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useTheme } from '../../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ServiceItem = {
    id: number;
    title: string;
    image: string;
};

const services: ServiceItem[] = [
    { id: 1, title: 'Executive Coaching Session', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400' },
    { id: 2, title: 'Personal Aid Services', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400' },
    { id: 3, title: 'ADA Accommodations Consultation', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400' },
    { id: 4, title: 'Career Counseling', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400' },
];

function Services() {
    const { isDark } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [menuVisible, setMenuVisible] = useState(false);

    const handleServicePress = (service: ServiceItem) => {
        navigation.navigate('ServiceDetail', { serviceId: service.id });
    };

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

                {/* Title */}
                <View className="px-6 mt-4 mb-6">
                    <Text className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                        OUR SERVICES
                    </Text>
                </View>

                {/* Services Grid */}
                <View className="px-6">
                    <View className="flex-row flex-wrap justify-between gap-y-4">
                        {services.map((service) => (
                            <TouchableOpacity
                                key={service.id}
                                onPress={() => handleServicePress(service)}
                                activeOpacity={0.8}
                                className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm"
                                style={{ width: '48%' }}
                            >
                                <Image
                                    source={{ uri: service.image }}
                                    className="w-full h-32"
                                    resizeMode="cover"
                                />
                                <View className="p-3">
                                    <Text 
                                        className="text-sm font-semibold text-gray-900 dark:text-white" 
                                        numberOfLines={2}
                                    >
                                        {service.title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
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

export default Services;
