import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions, Platform } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import SearchBar from '../../components/common/SearchBar';
import ServiceCarousel from '../../components/common/ServiceCarousel';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useTheme } from '../../theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isSmallScreen = SCREEN_WIDTH < 375;
const isLargeScreen = SCREEN_WIDTH > 414;

type NavProp = NativeStackNavigationProp<RootStackParamList>;

function Home() {
    const { isDark } = useTheme();
    const navigation = useNavigation<NavProp>();
    const [searchQuery, setSearchQuery] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);

    const topServices = [
        { id: 1, title: 'Executive Coaching Session', image: require('../../assets/images/homeservice.png') },
        { id: 2, title: 'Personal Aid Services', image: require('../../assets/images/homeservice1.png') },
        { id: 3, title: 'ADA Accommodations Consultation', image: require('../../assets/images/homeservice2.png') },
        { id: 4, title: 'Career Counseling', image: require('../../assets/images/homeservice3.png') },
    ];

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
    };

    return (
        <ScreenWrapper>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ 
                    paddingBottom: Platform.OS === 'ios' ? 20 : 16 
                }}
            >
                <Header 
                    userName="Angelina" 
                    onMenuPress={() => setMenuVisible(true)} 
                />

                <View className="mx-4 mt-4" style={{ position: 'relative', marginBottom: 28 }}>
                    
                    <View
                        className="rounded-2xl overflow-hidden"
                        style={{
                            width: SCREEN_WIDTH - 32,
                            height: SCREEN_HEIGHT * 0.25,
                        }}
                    >
                        <Image
                            source={require('../../assets/images/home.png')}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                        <View className="absolute inset-0 p-4 justify-end pb-12">
                            <Text
                                className="text-white text-lg not-italic font-bold uppercase"
                                style={{ fontSize: isSmallScreen ? 16 : 20 }}
                            >
                                LOREM IPSUM{'\n'}DOLOR SIT
                            </Text>
                        </View>
                    </View>

                    <View
                        className="bg-[#578096] rounded-full items-center justify-center"
                        style={{
                            position: 'absolute',
                            top: -12,
                            right: -12,
                            width: isSmallScreen ? 60 : 70,
                            height: isSmallScreen ? 60 : 70,
                            borderWidth: 2,
                            borderColor: 'white',
                        }}
                    >
                        <Text className="text-white text-xs not-italic font-bold" style={{ fontSize: isSmallScreen ? 10 : 12 }}>Discount</Text>
                        <Text className="text-white text-xs not-italic font-bold" style={{ fontSize: isSmallScreen ? 10 : 12 }}>30% OFF</Text>
                    </View>

                    <View
                        style={{
                            position: 'absolute',
                            bottom: -30,
                            left: 0,
                            right: 0,
                            height: Platform.OS === 'ios' ? 70 : 65,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <SearchBar
                            placeholder="Search Course"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>

                </View>

                <View className="mt-6 flex-1 items-center">
                    <Text
                        className="text-black not-italic font-bold uppercase dark:text-white mb-4 px-6"
                        style={{ fontSize: isSmallScreen ? 18 : 20 }}
                    >
                        TOP SERVICES
                    </Text>
                    <ServiceCarousel
                        services={topServices}
                        onServicePress={(service) => {
                            console.log('Service pressed:', service.title);
                            navigation.navigate('ServiceDetail', { serviceId: service.id });
                        }}
                    />
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

export default Home;