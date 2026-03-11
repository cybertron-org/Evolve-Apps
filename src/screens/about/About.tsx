import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';

function About() {
    const [menuVisible, setMenuVisible] = useState(false);

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

                <View className="flex-1 items-center justify-center px-6 mt-20">
                    <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        ABOUT EVOLVE
                    </Text>
                    <Text className="text-base text-gray-600 dark:text-gray-400 text-center">
                        About Evolve content will be added here
                    </Text>
                </View>
            </ScrollView>

            <MenuDrawer
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onMenuItemPress={handleMenuItemPress}
            />
        </ScreenWrapper>
    );
}

export default About;
