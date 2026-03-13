import AppText from '../../components/common/AppText';
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import { useTheme } from '../../theme/ThemeContext';
import GlobalIcon from '../../components/common/GlobalIcon';

type Message = {
    id: number;
    name: string;
    message: string;
    time: string;
    unread: boolean;
    avatar: string;
};

const messages: Message[] = [
    {
        id: 1,
        name: 'James Coach',
        message: 'Hi, how are you doing today?',
        time: '10:30 AM',
        unread: true,
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'},
    {
        id: 2,
        name: 'Sarah Counselor',
        message: 'Your session is scheduled for tomorrow',
        time: 'Yesterday',
        unread: false,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'},
];

function Messages() {
    const { isDark } = useTheme();
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

                {/* Title */}
                <View className="px-6 mt-4 mb-6">
                    <AppText className="text-2xl font-bold text-gray-900 dark:text-white">
                        Messages
                    </AppText>
                </View>

                {/* Messages List */}
                <View className="px-6">
                    {messages.map((msg) => (
                        <TouchableOpacity
                            key={msg.id}
                            activeOpacity={0.7}
                            className="flex-row items-center py-4 border-b border-gray-200 dark:border-gray-700"
                        >
                            <Image
                                source={{ uri: msg.avatar }}
                                className="w-14 h-14 rounded-full"
                            />
                            <View className="flex-1 ml-4">
                                <View className="flex-row items-center justify-between mb-1">
                                    <AppText className="text-base font-semibold text-gray-900 dark:text-white">
                                        {msg.name}
                                    </AppText>
                                    <AppText className="text-xs text-gray-500 dark:text-gray-400">
                                        {msg.time}
                                    </AppText>
                                </View>
                                <AppText 
                                    className={`text-sm ${
                                        msg.unread 
                                            ? 'text-gray-900 dark:text-white font-medium' 
                                            : 'text-gray-500 dark:text-gray-400'
                                    }`}
                                    numberOfLines={1}
                                >
                                    {msg.message}
                                </AppText>
                            </View>
                            {msg.unread && (
                                <View className="w-2 h-2 rounded-full bg-blue-500 ml-2" />
                            )}
                        </TouchableOpacity>
                    ))}
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

export default Messages;
