import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import { useTheme } from '../../theme/ThemeContext';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import GlobalIcon from '../../components/common/GlobalIcon';
import { Button } from '../../components/common/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ServiceDetailRouteParams = {
    ServiceDetail: {
        serviceId: number;
    };
};

const serviceDetails = {
    1: {
        title: 'EXECUTIVE COACHING SESSION',
        description: 'Our coaches are passionate about connecting with their customers to understand their needs and their unique strengths. Our coaches empower and develop their customers in a sustainable and measurable way. Often closing the gap between where one is and their goals, is the motivation. With a coach\'s support one can develop a wholesome emotional intelligence, cultivate resilience and improve their interpersonal skills to influence professional growth. Our coaches have backgrounds in counseling psychology, clinical social work, rehabilitation counseling, applied behavior analysis, etc and help their customers to manage stress and reduce anxiety from feeling overwhelmed.',
        fee: '$70/hrs',
        images: [
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800',
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
        ],
    },
};

function ServiceDetail() {
    const { isDark } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<RouteProp<ServiceDetailRouteParams, 'ServiceDetail'>>();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const serviceId = route.params?.serviceId || 1;
    const service = serviceDetails[serviceId as keyof typeof serviceDetails] || serviceDetails[1];

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

                {/* Image Carousel */}
                <View className="mx-6 mt-4 mb-6 rounded-2xl overflow-hidden relative">
                    <Image
                        source={{ uri: service.images[currentImageIndex] }}
                        className="w-full h-56"
                        resizeMode="cover"
                    />
                    
                    {/* Navigation Arrows */}
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

                    {/* Dots Indicator */}
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

                {/* Content */}
                <View className="px-6">
                    <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {service.title}
                    </Text>

                    <Text className="text-sm text-gray-600 dark:text-gray-300 leading-6 mb-6">
                        {service.description}
                    </Text>

                    <TouchableOpacity 
                        activeOpacity={0.8}
                        className="mb-4"
                    >
                        <Text className="text-blue-600 dark:text-blue-400 text-sm font-semibold">
                            Read More
                        </Text>
                    </TouchableOpacity>

                    {/* Fee Card */}
                    <View className="flex-row items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
                        <View className="flex-row items-center gap-3">
                            <GlobalIcon name="credit-card" library="Feather" size={24} color="#578096" />
                            <Text className="text-lg font-bold text-gray-900 dark:text-white">FEE</Text>
                        </View>
                        <Text className="text-lg font-bold text-gray-900 dark:text-white">
                            {service.fee}
                        </Text>
                    </View>
                </View>

                <View className="px-6 mb-6">
                      <Button
                      title='30 MINUTES FREE CONSULTATION' 
                      className='bg-[#0C213F] rounded-full'
                      onPress={()=>{
                        navigation.navigate('BookingCalendar', { serviceId: serviceId })
                      }}
                      
                      />
                </View>

                <View className="h-6" />
            </ScrollView>
        </ScreenWrapper>
    );
}

export default ServiceDetail;
