import AppText from '../../components/common/AppText';
import React, { useState } from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import { useTheme } from '../../theme/ThemeContext';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import GlobalIcon from '../../components/common/GlobalIcon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCourseDetail } from '../../hooks/queries/useCourseDetail';
import { useAuthStore } from '../../store/authStore';
import Skeleton from '../../components/common/Skeleton';

type ServiceDetailRouteParams = {
    ServiceDetail: {
        serviceId: number;
        image?: string;
    };
};

const COLLAPSED_CHAR_LIMIT = 580;

function ServiceDetail() {
    const { isDark } = useTheme();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute<RouteProp<ServiceDetailRouteParams, 'ServiceDetail'>>();
    const { user } = useAuthStore();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
 
    const serviceId = route.params?.serviceId;
    const { data: course, isLoading, error } = useCourseDetail(serviceId);
    
    if (isLoading) {
        return (
            <ScreenWrapper>
                <Header 
                    userName={user?.name || 'Angelina'} 
                    userImage={user?.profile_image}
                    onMenuPress={() => {}} 
                />
                <View className="mx-6 mt-4 mb-6 rounded-2xl overflow-hidden">
                    <Skeleton width="100%" height={224} variant="rect" />
                </View>

                <View className="px-6 mb-6">
                    <Skeleton width="70%" height={28} variant="text" />
                    <View className="h-4" />
                    <Skeleton width="100%" height={16} variant="text" />
                    <View className="h-2" />
                    <Skeleton width="90%" height={16} variant="text" />
                    <View className="h-2" />
                    <Skeleton width="95%" height={16} variant="text" />
                    <View className="h-2" />
                    <Skeleton width="80%" height={16} variant="text" />
                    
                    <View className="h-8" />
                    <View className="flex-row items-center justify-between">
                        <Skeleton width={80} height={20} variant="text" />
                        <View className="flex-row items-center gap-2">
                            <Skeleton width={32} height={32} variant="circle" />
                            <View>
                                <Skeleton width={40} height={16} variant="text" />
                                <View className="h-1" />
                                <Skeleton width={60} height={20} variant="text" />
                            </View>
                        </View>
                    </View>
                </View>

                <View className="px-6">
                    <Skeleton width="100%" height={56} variant="rect" />
                </View>
            </ScreenWrapper>
        );
    }

    if (!course || error) {
        return (
            <ScreenWrapper>
                <Header 
                    userName={user?.name || 'Angelina'} 
                    userImage={user?.profile_image}
                    onMenuPress={() => {}} 
                />
                <View className="flex-1 items-center justify-center p-6">
                    <AppText className="text-gray-500 text-center">Course details not found.</AppText>
                </View>
            </ScreenWrapper>
        );
    }
 
    const service = {
        title: course.title.toUpperCase(),
        description: course.description || 'No description available.',
        fee: `${course.currency || 'USD'} ${course.rate_per_hour}`,
        images: [course.banner]};
 
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
        <ScreenWrapper scroll={true}>
            <Header 
                userName={user?.name || 'Angelina'} 
                userImage={user?.profile_image}
                onMenuPress={() => console.log('Menu pressed')} 
            />

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
                    {service.images.map((_: any, index: number) => (
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
                <AppText className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                </AppText>

                <AppText className="text-sm text-gray-600 dark:text-gray-300 leading-6 mb-1">
                    {displayedText}
                </AppText>

                <View className="flex-row items-center justify-between mb-6">
                    
                    {isLongText && (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setIsExpanded((prev) => !prev)}
                        >
                            <AppText className="text-[#578096] text-base not-italic font-bold leading-4 font-outfit">
                                {isExpanded ? 'Read Less' : 'Read More'}
                            </AppText>
                        </TouchableOpacity>
                    )}

                    <View style={{ marginLeft: 'auto' }} className="flex-row items-center gap-2">
                        <GlobalIcon name="credit-card" library="FontAwesome" size={32} color="#E07070" />
                        <View>
                            <AppText className="text-xl font-extrabold text-[#E07070]">FEE</AppText>
                            <AppText className="text-base font-bold text-[#E07070]">
                                {service.fee}
                            </AppText>
                        </View>
                    </View>
                </View>
            </View>

            <View className="px-6 mb-6">
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate('BookingCalendar', { serviceId, image: service.images[0] as string })}
                    style={{ backgroundColor: isDark ? '#0C213F' : '#1ABC9C' }}
                    className="rounded-full py-6 items-center justify-center"
                >
                    <AppText
                        style={{ color: isDark ? '#FFFFFF' : '#0C213F' }}
                        className="text-base font-extrabold tracking-widest"
                    >
                        30 MINUTES FREE CONSULTATION
                    </AppText>
                </TouchableOpacity>
            </View>

            <View className="h-6" />
        </ScreenWrapper>
    );
}

export default ServiceDetail;