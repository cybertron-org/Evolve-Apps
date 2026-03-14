import AppText from '../../components/common/AppText';
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../../components/specific/ScreenWrapper';
import Header from '../../components/common/Header';
import MenuDrawer from '../../components/specific/MenuDrawer';
import SearchBar from '../../components/common/SearchBar';
import { useTheme } from '../../theme/ThemeContext';
import GlobalIcon from '../../components/common/GlobalIcon';

type Message = {
    id: number;
    name: string;
    role: string;
    message: string;
    time: string;
    unread: number;
    avatar: string;
    status: 'sent' | 'delivered' | 'read' | 'voice' | 'photo';
};

const messages: Message[] = [
    {
        id: 1,
        name: 'Andrew Parker',
        role: 'Psychiatrist',
        message: 'What kind of strategy is better?',
        time: '9:30',
        unread: 2,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        status: 'delivered'
    },
    {
        id: 2,
        name: 'Karen Castillo',
        role: 'Psychologist',
        message: '0:14',
        time: '9:30',
        unread: 1,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        status: 'voice'
    },
    {
        id: 3,
        name: 'Maximillian Jacobson',
        role: 'Psychologist',
        message: 'Bro, I have a good idea!',
        time: 'Today',
        unread: 0,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        status: 'read'
    },
    {
        id: 4,
        name: 'Martha Craig',
        role: 'Psychiatrist',
        message: 'What kind of strategy is better?',
        time: 'Today',
        unread: 0,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        status: 'read'
    },
    {
        id: 5,
        name: 'Tabitha Potter',
        role: 'Psychologist',
        message: 'What kind of strategy is better?',
        time: 'Today',
        unread: 0,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
        status: 'read'
    },
    {
        id: 6,
        name: 'Maisy Humphrey',
        role: 'Neuropsychologist',
        message: 'Photo',
        time: 'Today',
        unread: 0,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
        status: 'photo'
    },
    {
        id: 7,
        name: 'Kieron Dotson',
        role: 'Psychiatrist',
        message: 'What kind of strategy is better?',
        time: 'Yesterday',
        unread: 0,
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        status: 'read'
    },
];

function Messages() {
    const { isDark } = useTheme();
    const navigation = useNavigation<any>();
    const [menuVisible, setMenuVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    const filteredMessages = messages.filter(msg => 
        msg.name.toLowerCase().includes(searchText.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchText.toLowerCase()) ||
        msg.role.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleMenuItemPress = (item: string) => {
        console.log('Menu item pressed:', item);
    };

    return (
        <ScreenWrapper scroll={true}>
            {/* Custom Header */}
            <View className="flex-row items-center justify-between px-6 py-4">
                <TouchableOpacity>
                    <AppText className="text-[#578096] text-lg font-medium">Edit</AppText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setMenuVisible(true)}>
                    <GlobalIcon name="edit" library="Feather" size={24} color={isDark ? '#F1F5F9' : '#1E293B'} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View className="mb-2">
                <SearchBar
                    placeholder="Search messages..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            {/* Messages List */}
            <View className="px-6">
                {filteredMessages.map((msg) => (
                    <TouchableOpacity
                        key={msg.id}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('ChatDetail', { 
                            id: msg.id, 
                            name: msg.name, 
                            role: msg.role, 
                            avatar: msg.avatar 
                        })}
                        className="flex-row items-center py-5 border-b border-gray-100 dark:border-gray-800"
                    >
                        <Image
                            source={{ uri: msg.avatar }}
                            className="w-16 h-16 rounded-full"
                        />
                        <View className="flex-1 ml-4">
                            <View className="flex-row items-center justify-between mb-1">
                                <AppText className="text-base font-bold text-gray-900 dark:text-white">
                                    {msg.name} <AppText className="text-red-500 font-normal text-xs">({msg.role})</AppText>
                                </AppText>
                                <AppText className="text-sm text-gray-400 dark:text-gray-500">
                                    {msg.time}
                                </AppText>
                            </View>
                            <View className="flex-row items-center">
                                {msg.status === 'delivered' && (
                                    <View className="flex-row items-center mr-1">
                                        <GlobalIcon name="check" library="Feather" size={14} color="#94A3B8" />
                                        <GlobalIcon name="check" library="Feather" size={14} color="#94A3B8" style={{ marginLeft: -8 }} />
                                    </View>
                                )}
                                {msg.status === 'read' && (
                                    <View className="flex-row items-center mr-1">
                                        <GlobalIcon name="check" library="Feather" size={14} color="#3B82F6" />
                                        <GlobalIcon name="check" library="Feather" size={14} color="#3B82F6" style={{ marginLeft: -8 }} />
                                    </View>
                                )}
                                {msg.status === 'voice' && (
                                    <View className="flex-row items-center mr-1">
                                        <GlobalIcon name="check" library="Feather" size={14} color="#94A3B8" />
                                        <GlobalIcon name="check" library="Feather" size={14} color="#94A3B8" style={{ marginLeft: -8 }} />
                                        <View className="ml-1">
                                            <GlobalIcon name="mic" library="Feather" size={14} color="#22C55E" />
                                        </View>
                                    </View>
                                )}
                                {msg.status === 'photo' && (
                                    <View className="flex-row items-center mr-1">
                                        <GlobalIcon name="check" library="Feather" size={14} color="#3B82F6" />
                                        <GlobalIcon name="check" library="Feather" size={14} color="#3B82F6" style={{ marginLeft: -8 }} />
                                        <View className="ml-1">
                                            <GlobalIcon name="camera" library="Feather" size={14} color="#94A3B8" />
                                        </View>
                                    </View>
                                )}
                                <AppText 
                                    className={`text-sm flex-1 ${
                                        msg.unread > 0 
                                            ? 'text-gray-900 dark:text-white font-medium' 
                                            : 'text-gray-500 dark:text-gray-400'
                                    }`}
                                    numberOfLines={1}
                                >
                                    {msg.message}
                                </AppText>
                                {msg.unread > 0 && (
                                    <View className="w-6 h-6 rounded-full bg-[#34C759] items-center justify-center ml-2">
                                        <AppText className="text-white text-xs font-bold">{msg.unread}</AppText>
                                    </View>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <View className="h-6" />

            <MenuDrawer
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onMenuItemPress={handleMenuItemPress}
            />
        </ScreenWrapper>
    );
}

export default Messages;
