import AppText from './AppText';
import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Dimensions, NativeScrollEvent, NativeSyntheticEvent, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

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
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setDimensions(window);
        });

        return () => subscription?.remove();
    }, []);

    const SCREEN_WIDTH = dimensions.width;
    const isSmallScreen = SCREEN_WIDTH < 375;
    const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;
    const CARD_SPACING = isSmallScreen ? 8 : 12;

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
                    paddingHorizontal: 16}}
            >
                {services?.map((service, index) => (
                    <TouchableOpacity
                        key={service.id}
                        onPress={() => onServicePress?.(service)}
                        activeOpacity={0.8}
                        style={{
                            width: CARD_WIDTH,
                            marginRight: index === services.length - 1 ? 0 : CARD_SPACING}}
                    >
                        <View 
                            className="rounded-2xl overflow-hidden "
                            style={{ 
                                width: '100%', 
                                height: isSmallScreen ? 150 : 180 
                            }}
                        >
                            <Image
                                source={typeof service.image === 'string' ? { uri: service.image } : service.image}
                                style={{ 
                                    width: '100%', 
                                    height: '100%' 
                                }}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={{ 
                            flex: 1, 
                            paddingHorizontal: isSmallScreen ? 4 : 8, 
                            paddingTop: isSmallScreen ? 6 : 8,
                            alignItems: 'center' 
                        }}>
                            <AppText 
                                className="text-gray-900 dark:text-white"
                                numberOfLines={2}
                                style={{ 
                                    fontSize: isSmallScreen ? 12 : 14,
                                    lineHeight: isSmallScreen ? 14 : 16,
                                    fontWeight: '400',
                                    textAlign: 'center'
                                }}
                            >
                                {service.title}
                            </AppText>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View 
                className="flex-row justify-center items-center" 
                style={{ 
                    gap: isSmallScreen ? 6 : 8,
                    marginTop: isSmallScreen ? 8 : 12 
                }}
            >
                {services.map((_, index) => (
                    <View
                        key={index}
                        className="rounded-full"
                        style={{
                            width: index === activeIndex ? (isSmallScreen ? 20 : 24) : (isSmallScreen ? 6 : 8),
                            height: isSmallScreen ? 6 : 8,
                            backgroundColor: index === activeIndex 
                                ? '#578096' 
                                : isDark ? '#4B5563' : '#D1D5DB'}}
                    />
                ))}
            </View>
        </View>
    );
};

export default ServiceCarousel;
