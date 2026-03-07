import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useTheme } from '../../theme/ThemeContext';

function CoachProfile() {
    const { isDark } = useTheme();
    const [menuVisible, setMenuVisible] = useState(false);

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
        // Handle navigation based on menu item
    };

    return (
        <ScreenWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header 
                    userName="Angelina" 
                    onMenuPress={() => setMenuVisible(true)} 
                />

                <View className="px-6 mt-4 mb-6">
                    <Text className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                        COACH PROFILE
                    </Text>
                </View>

                <View className="mx-6 mb-6">
                    <View className="flex-row items-center">
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400' }}
                            className="w-20 h-20 rounded-full"
                        />
                        <View className="flex-1 ml-4">
                            <Text className="text-xl font-bold text-gray-900 dark:text-white">
                                JAMES
                            </Text>
                            <Text className="text-sm text-red-500 font-medium">
                                9 years experience
                            </Text>
                        </View>
                        <View className="flex-row items-center">
                            <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                            <Text className="text-sm text-green-500 font-medium">Active</Text>
                        </View>
                    </View>
                </View>

                {/* Bio Section */}
                <View className="px-6 mb-6">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        BIO
                    </Text>
                    <Text className="text-sm text-gray-600 dark:text-gray-300 leading-6">
                        Sed ut perspiciatis unde omnis iste natus error sit thems voluptatem accusantium doloremque for a laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                    </Text>
                </View>

                {/* Key Expertise Section */}
                <View className="px-6 mb-6">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        KEY EXPERTISE
                    </Text>
                    <View className="space-y-2">
                        {[
                            'Psychology',
                            'Rehabilitation counseling',
                            'Clinical social work',
                            'Applied behavior therapy',
                        ].map((expertise, index) => (
                            <View key={index} className="flex-row items-center mb-2">
                                <View className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3" />
                                <Text className="text-sm text-blue-600 dark:text-blue-400">
                                    {expertise}
                                </Text>
                            </View>
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

export default CoachProfile;
