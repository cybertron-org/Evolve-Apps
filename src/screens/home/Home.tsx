import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import SearchBar from '../../components/common/SearchBar';
import ServiceCarousel from '../../components/common/ServiceCarousel';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useTheme } from '../../theme/ThemeContext';

function Home() {
    const { isDark } = useTheme();
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header 
                    userName="Angelina" 
                    onMenuPress={() => setMenuVisible(true)} 
                />

<View className="mx-6 mt-4" style={{ position: 'relative', marginBottom: 28 }}>
    
    <View className="rounded-2xl overflow-hidden"
    style={{width: 390,
height: 243,
}}>
        <Image
            source={require('../../assets/images/home.png')}
            className="w-full h-52"
            resizeMode="stretch"
        />
        <View className="absolute inset-0 bg-black/40 p-6 justify-end pb-10">
            <Text className="text-white text-xl not-italic font-bold uppercase">
                LOREM IPSUM{'\n'}DOLOR SIT
            </Text>
        </View>
    </View>

    <View 
        className="bg-[#578096] rounded-full items-center justify-center w-20 h-20
        border border-2 border-white"
        style={{
            position: 'absolute',
            top: -18,      
            right: -18,   
        }}
    >
        <Text className="text-white text-xs not-italic font-bold">Discount</Text>
        <Text className="text-white text-xs not-italic font-bold">30% OFF</Text>
    </View>

    <View 
        className=" mx-4 py-3 flex-row items-center "
        style={{
            position: 'absolute',
            bottom: -28,    
            left: 0,
            right: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
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
                    <Text className="text-black text-xl not-italic font-bold uppercase dark:text-white mb-4 px-6">
                        TOP SERVICES
                    </Text>
                    <ServiceCarousel 
                        services={topServices}
                        onServicePress={(service) => console.log('Service pressed:', service.title)}
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