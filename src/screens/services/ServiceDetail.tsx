import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import { useTheme } from '../../theme/ThemeContext';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import GlobalIcon from '../../components/common/GlobalIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getServiceById } from '../../data/servicesData';

type ServiceDetailRouteParams = {
    ServiceDetail: {
        serviceId: number;
    };
};

const COLLAPSED_CHAR_LIMIT = 580;

function ServiceDetail() {
    const { isDark } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<RouteProp<ServiceDetailRouteParams, 'ServiceDetail'>>();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const serviceId = route.params?.serviceId || 1;
    const serviceData = getServiceById(serviceId);
    
    if (!serviceData) {
        return null;
    }

    const service = {
        title: serviceData.title.toUpperCase(),
        description: serviceData.description,
        fee: serviceData.fee,
        images: serviceData.images,
    };

    const isLongText = service.description.length > COLLAPSED_CHAR_LIMIT;
    const displayedText =
        isExpanded || !isLongText
            ? service.description
            : service.description.slice(0, COLLAPSED_CHAR_LIMIT) + '...';

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? service.images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev === service.images.length - 1 ? 0 : prev + 1));
    };

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header userName="Angelina" onMenuPress={() => console.log('Menu pressed')} />

                <View className="mx-6 mt-4 mb-6 rounded-2xl overflow-hidden relative">
                    <Image
                        source={typeof service.images[currentImageIndex] === 'string' 
                            ? { uri: service.images[currentImageIndex] as string } 
                            : service.images[currentImageIndex]}
                        className="w-full h-56"
                        resizeMode="cover"
                    />

                    <TouchableOpacity
                        onPress={handlePrevImage}
                        className="absolute left-4 top-1/2 -mt-5 w-10 h-10 rounded-full bg-white/80 items-center justify-center"
                    >
                        <GlobalIcon name="chevron-left" library="Feather" size={20} color="#1E293B" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleNextImage}
                        className="absolute right-4 top-1/2 -mt-5 w-10 h-10 rounded-full bg-white/80 items-center justify-center"
                    >
                        <GlobalIcon name="chevron-right" library="Feather" size={20} color="#1E293B" />
                    </TouchableOpacity>

                    <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
                        {service.images.map((_, index) => (
                            <View
                                key={index}
                                className={`w-2 h-2 rounded-full ${
                                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                }`}
                            />
                        ))}
                    </View>
                </View>

                <View className="px-6">
                    <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {service.title}
                    </Text>

                    <Text className="text-sm text-gray-600 dark:text-gray-300 leading-6 mb-1">
                        {displayedText}
                    </Text>

                    <View className="flex-row items-center justify-between mb-6">
                        
                        {isLongText && (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setIsExpanded((prev) => !prev)}
                            >
                                <Text className="text-[#578096] text-base not-italic font-bold leading-4 font-outfit">
                                    {isExpanded ? 'Read Less' : 'Read More'}
                                </Text>
                            </TouchableOpacity>
                        )}

                        <View className="flex-row items-center gap-2">
                            <GlobalIcon name="credit-card" library="Feather" size={32} color="#E07070" />
                            <View>
                                <Text className="text-xl font-extrabold text-[#E07070]">FEE</Text>
                                <Text className="text-base font-bold text-[#E07070]">
                                    {service.fee}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="px-6 mb-6">
                  <TouchableOpacity
    activeOpacity={0.85}
    onPress={() => navigation.navigate('BookingCalendar', { serviceId })}
    style={{ backgroundColor: isDark ? '#0C213F' : '#1ABC9C' }}
    className="rounded-full py-6 items-center justify-center"
>
    <Text
        style={{ color: isDark ? '#FFFFFF' : '#0C213F' }}
        className="text-base font-extrabold tracking-widest"
    >
        30 MINUTES FREE CONSULTATION
    </Text>
</TouchableOpacity>
                </View>

                <View className="h-6" />
            </ScrollView>
        </ScreenWrapper>
    );
}

export default ServiceDetail;