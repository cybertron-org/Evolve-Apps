import React, { useState, useRef } from 'react';
import { View, ScrollView, Dimensions, NativeScrollEvent, NativeSyntheticEvent, Image, Text, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2; // Show 2 cards with padding
const CARD_SPACING = 2;

type Service = {
    id: number;
    title: string;
    image: string | ImageSourcePropType;
};

interface ServiceCarouselProps {
    services: Service[];
    onServicePress?: (service: Service) => void;
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ services, onServicePress }) => {
    const { isDark } = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / (CARD_WIDTH + CARD_SPACING));
        if (index !== activeIndex && index >= 0 && index < services.length) {
            setActiveIndex(index);
        }
    };

    return (
        <View>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled={false}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScroll}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={CARD_WIDTH + CARD_SPACING}
                snapToAlignment="start"
                contentContainerStyle={{
                    paddingHorizontal: 16,
                }}
            >
                {services?.map((service, index) => (
                    <TouchableOpacity
                        key={service.id}
                        onPress={() => onServicePress?.(service)}
                        activeOpacity={0.8}
                        style={{
                            width: CARD_WIDTH,
                            marginRight: index === services.length - 1 ? 0 : CARD_SPACING,
                        }}
                    >
                                           <View 
                            className="rounded-2xl overflow-hidden  shadow-lg"
                            style={{ width: '100%', height: 180 }}
                        >
                            <Image
                                source={typeof service.image === 'string' ? { uri: service.image } : service.image}
                                className='w-56 h-48'
                                resizeMode="contain"
                            />
                        </View>
                            <View style={{ flex: 1, paddingHorizontal: 8, alignItems: 'center' }}>
                                <Text 
                                    className="text-sm not-italic font-normal text-gray-900 dark:text-white "
                                    numberOfLines={2}
                                    style={{ lineHeight: 16 }}
                                >
                                    {service.title}
                                </Text>
                            </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View className="flex-row justify-center items-center gap-2">
                {services.map((_, index) => (
                    <View
                        key={index}
                        className="rounded-full"
                        style={{
                            width: index === activeIndex ? 24 : 8,
                            height: 8,
                            backgroundColor: index === activeIndex 
                                ? '#578096' 
                                : isDark ? '#4B5563' : '#D1D5DB',
                        }}
                    />
                ))}
            </View>
        </View>
    );
};

export default ServiceCarousel;
