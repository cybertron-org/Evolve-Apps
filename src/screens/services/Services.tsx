import AppText from '../../components/common/AppText';
import React, { useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useTheme } from '../../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getAllServices } from '../../data/servicesData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallScreen = SCREEN_WIDTH < 375;

type ServiceItem = {
    id: number;
    title: string;
    image: string | any;
};

function Services() {
    const services: ServiceItem[] = getAllServices().map(service => ({
        id: service.id,
        title: service.title,
        image: service.thumbnail}));
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
                    <AppText className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                        OUR SERVICES
                    </AppText>
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
                                    source={typeof service.image === 'string' ? { uri: service.image } : service.image}
                                    className="w-full h-32"
                                    resizeMode="cover"
                                />
                                <View className="p-3">
                                    <AppText 
                                        className="text-sm font-semibold text-gray-900 dark:text-white" 
                                        numberOfLines={2}
                                    >
                                        {service.title}
                                    </AppText>
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
